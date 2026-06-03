from itertools import count
import json
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.ai_service import ai_service
from app.services.grammar_service import grammar_service
from app.services.game_state import GameStateService
from app.services.classifier import ModeClassifier
from app.services.translator import translator
from app.core.config import settings
from supabase import create_client
from fastapi import Depends
from app.middleware.auth import verify_user
from app.services.usage_service import DAILY_LIMIT, UsageService


supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

print("URL:", settings.SUPABASE_URL)

try:
    test = (
        supabase.table("conversations")
        .select("*")
        .limit(1)
        .execute()
    )

    print("CONNECTION OK")
    print(test.data)

except Exception as e:
    print("CONNECTION FAILED")
    print(e)



def verify_conversation_owner(
    conversation_id: int,
    user_id: str
):
    conversation = (
        supabase.table("conversations")
        .select("*")
        .eq("id", conversation_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not conversation.data:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return conversation.data[0]

router = APIRouter(prefix="/chat", tags=["chat"])


# =========================
# MODELOS
# =========================

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    personality_id: Optional[int] = 1


class ChatResponse(BaseModel):
    response: str
    translation: Optional[str] = None
    correction: Optional[dict] = None
    vocabulary: Optional[list] = None
    conversation_id: int
    usage: Optional[dict] = None


class VocabAnswerRequest(BaseModel):
    conversation_id: int
    answer: str


# =========================
# HELPERS
# =========================

def extract_json(text: str):
    """Extrae JSON aunque el modelo meta basura."""
    if not text:
        return None

    cleaned = text.strip()
    cleaned = cleaned.replace("```json", "")
    cleaned = cleaned.replace("```", "")
    cleaned = cleaned.strip()

    # intento directo
    try:
        return json.loads(cleaned)
    except:
        pass

    # buscar desde primer { hasta último }
    start = cleaned.find("{")
    end = cleaned.rfind("}")

    if start != -1 and end != -1:
        possible_json = cleaned[start:end + 1]
        try:
            return json.loads(possible_json)
        except Exception as e:
            print(f"❌ Error parseando JSON extraído: {e}")

    return None


def clean_nested_json(parsed: dict):
    """Limpia JSON anidado."""
    if not parsed:
        return parsed

    possible_nested = parsed.get("response")
    if isinstance(possible_nested, str):
        nested_json = extract_json(possible_nested)
        if nested_json:
            return nested_json

    return parsed


def looks_spanish(text: str):
    """Detecta si parece español."""
    spanish_markers = {
        "el", "la", "los", "las", "un", "una", "de", "que",
        "para", "con", "por", "como", "hola", "gracias"
    }
    words = text.lower().split()
    return any(word in spanish_markers for word in words)


def sanitize_vocabulary(vocabulary, response_text):
    """Limpia vocabulario roto o invertido."""
    cleaned = []

    if not isinstance(vocabulary, list):
        return []

    response_lower = response_text.lower()

    for item in vocabulary:
        if not isinstance(item, dict):
            continue

        word = str(item.get("word", "")).strip()
        meaning = str(item.get("meaning", "")).strip()

        if not word or not meaning:
            continue

        if len(word.split()) > 4:
            continue

        # detectar invertido
        word_is_spanish = looks_spanish(word)
        meaning_is_spanish = looks_spanish(meaning)

        if word_is_spanish and not meaning_is_spanish:
            word, meaning = meaning, word

        # evitar duplicados
        already_exists = any(x["word"].lower() == word.lower() for x in cleaned)
        if already_exists:
            continue

        # debe existir en response
        if word.lower() not in response_lower:
            continue

        cleaned.append({"word": word, "meaning": meaning})

    return cleaned[:5]


# =========================
# CHAT
# =========================

@router.post("/send", response_model=ChatResponse)
async def send_message(
    request: ChatRequest,
    user=Depends(verify_user)
):

    usage_service = UsageService(supabase)

    try:
        # =========================
        #  USAGE LIMIT CHECK (CORRECTO)
        # =========================

        allowed, used, limit = usage_service.check_and_increment(user.id)
        print(f"🔥 USAGE TEST -> user={user.id} used={used} limit={limit}")

        if not allowed:
            raise HTTPException(
                status_code=429,
                detail={
                    "message": "Límite diario alcanzado",
                    "used": used,
                    "limit": limit



                }
            )

        # =========================
        # PERSONALIDAD
        # =========================

        personality = None

        if request.personality_id and request.personality_id != 0:
            result = (
                supabase.table("personalities")
                .select("*")
                .eq("id", request.personality_id)
                .execute()
            )

            if result.data:
                personality = result.data[0]

        # =========================
        # CREAR CONVERSACIÓN
        # =========================

        if not request.conversation_id:
            # =========================
            # LÍMITE DE CONVERSACIONES (MÁXIMO 30)
            # =========================
            MAX_CONVERSATIONS = 30
            
            # Contar conversaciones del usuario
            conv_count_result = supabase.table("conversations").select("id", count="exact").eq("user_id", user.id).execute()
            conv_count = conv_count_result.count
            
            # Si supera el límite, eliminar la conversación más antigua
            if conv_count >= MAX_CONVERSATIONS:
                oldest_result = supabase.table("conversations").select("id").eq("user_id", user.id).order("created_at", desc=False).limit(1).execute()
                if oldest_result.data:
                    oldest_id = oldest_result.data[0]["id"]
                    # Eliminar mensajes primero (por la foreign key)
                    supabase.table("messages").delete().eq("conversation_id", oldest_id).execute()
                    # Eliminar la conversación
                    supabase.table("conversations").delete().eq("id", oldest_id).execute()
                    print(f"🗑️ Conversación antigua eliminada (ID: {oldest_id}) por límite de {MAX_CONVERSATIONS}")

            initial_state = {
                "mode": "chat",
                "current": None,
                "target": None,
                "topic": None,
                "items": [],
            }

            conv_result = (
                supabase.table("conversations")
                .insert({
                    "title": request.message[:50],
                    "user_id": user.id,
                    "personality_id": request.personality_id if request.personality_id != 0 else None,
                    "game_state": initial_state,
                })
                .execute()
            )

            if not conv_result.data:
                raise HTTPException(
                    status_code=500,
                    detail="Error creating conversation",
                )

            conversation_id = conv_result.data[0]["id"]
            print(f"✅ Nueva conversación creada: {conversation_id}")

        else:
            conversation_id = request.conversation_id
            verify_conversation_owner(conversation_id, user.id)

        # =========================
        # HISTORIAL
        # =========================

        result = (
            supabase.table("messages")
            .select("*")
            .eq("conversation_id", conversation_id)
            .order("created_at", desc=True)
            .limit(10)
            .execute()
        )

        messages = [
            {
                "role": msg["role"],
                "content": msg["content"],
                "translation": msg.get("translation", ""),
            }
            for msg in reversed(result.data)
        ]

        messages.append({
            "role": "user",
            "content": request.message,
        })

        # =========================
        # GAME STATE
        # =========================

        state = GameStateService.get_state(conversation_id)

        intent = ModeClassifier.classify(request.message)

        if state.get("mode") == "chat":

            if intent["mode"] == "vocab":
                state = GameStateService.init_vocab(
                    conversation_id,
                    intent.get("topic", "vocabulario"),
                    intent.get("target", 10),
                )

            elif intent["mode"] == "explain":
                state = GameStateService.update_state(
                    conversation_id,
                    {"mode": "explain"},
                )

        # =========================
        # IA
        # =========================

        ai_response = await ai_service.chat(
            messages,
            personality,
            conversation_id,
            state,
        )

        print("\n" + "=" * 50)
        print(" RAW AI RESPONSE:")
        print(ai_response[:500])
        print("=" * 50 + "\n")

        # =========================
        # PARSEAR JSON DE AI_SERVICE
        # =========================
        
        response_text = ""
        translation = ""
        correction = None
        vocabulary = []

        try:
            # ai_service ya devuelve un JSON string
            ai_data = json.loads(ai_response)
            
            response_text = ai_data.get("response", "")
            translation = ai_data.get("translation", "")
            correction = ai_data.get("correction", None)
            vocabulary = ai_data.get("vocabulary", [])
            
            # Sanitizar vocabulario
            vocabulary = sanitize_vocabulary(vocabulary, response_text)
            
            print(f" Correction recibida: {correction}")
            
        except json.JSONDecodeError as e:
            print(f"❌ Error parseando JSON: {e}")
            response_text = ai_response  # fallback
            translation = ""
            correction = None
            vocabulary = []

        # =========================
        # TRADUCCIÓN (solo si no vino)
        # =========================

        if not translation and len(response_text) < 500:
            try:
                translation = await translator.translate(response_text)
            except:
                translation = ""
                translation = ""

        # =========================
        # GRAMMAR
        # =========================



        # =========================
        # GUARDAR MENSAJES
        # =========================

        supabase.table("messages").insert({
            "conversation_id": conversation_id,
            "role": "user",
            "content": request.message,
        }).execute()

        supabase.table("messages").insert({
            "conversation_id": conversation_id,
            "role": "assistant",
            "content": response_text,
            "translation": translation,
            "correction": correction,
            "vocabulary": vocabulary,
        }).execute()

        # =========================
        # INCREMENT USAGE (SI TU SERVICIO LO REQUIERE)


        # =========================

        print(f"🔍 CORRECCIÓN FINAL A ENVIAR: {correction}")
        print(f"🔍 TIPO: {type(correction)}")


        return ChatResponse(
            response=response_text,
            translation=translation,
            correction=correction,
            vocabulary=vocabulary,
            conversation_id=conversation_id,
            usage={
                "used": used,
                "limit": limit,
                "remaining": limit - used



            }
        )
    
    except HTTPException:
        raise

    except Exception as e:
        print(f"❌ ERROR GENERAL: {e}")
        raise HTTPException(status_code=500, detail=str(e))
# =========================
# VOCAB ANSWER
# =========================

@router.post("/vocab/answer")
async def vocab_answer(
    request: VocabAnswerRequest,
    user=Depends(verify_user)
):

    verify_conversation_owner(
        request.conversation_id,
        user.id
    )

    result = GameStateService.advance_vocab(
        request.conversation_id,
        request.answer,
    )

    return result


# =========================
# CAMBIAR A MODO VOCAB
# =========================

@router.post("/mode/vocab")
async def set_vocab_mode(
    conversation_id: int,
    topic: str,
    target: int = 10,
    user=Depends(verify_user)
):

    verify_conversation_owner(
        conversation_id,
        user.id
    )

    state = GameStateService.init_vocab(
        conversation_id,
        topic,
        target,
    )

    return {
        "mode": "vocab",
        "state": state,
    }


# =========================
# CAMBIAR A MODO CHAT
# =========================

@router.post("/mode/chat")
async def set_chat_mode(
    conversation_id: int,
    user=Depends(verify_user)
):

    verify_conversation_owner(
        conversation_id,
        user.id
    )

    state = GameStateService.set_chat_mode(
        conversation_id
    )

    return {
        "mode": "chat",
        "state": state,
    }


# =========================
# GAME STATE
# =========================

@router.get("/state/{conversation_id}")
async def get_game_state(
    conversation_id: int,
    user=Depends(verify_user)
):

    verify_conversation_owner(
        conversation_id,
        user.id
    )

    return GameStateService.get_state(
        conversation_id
    )


# =========================
# CONVERSACIONES
# =========================


@router.get("/conversations")
async def get_conversations(
    user=Depends(verify_user)
):
    print("USER ID:", user.id)

    response = (
        supabase.table("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", desc=True)
        .execute()
    )

    return response.data


# =========================
# MENSAJES
# =========================

@router.get("/conversations/{conversation_id}/messages")
async def get_messages(
    conversation_id: int,
    user=Depends(verify_user)
):
    
    verify_conversation_owner(
        conversation_id,
        user.id
    )
    
    result = (
        supabase.table("messages")
        .select("*")
        .eq("conversation_id", conversation_id)
        .order("created_at", desc=False)
        .execute()
    )

    return result.data


@router.delete("/conversations/{conversation_id}")
async def delete_conversation(
    conversation_id: int,
    user=Depends(verify_user)
):
    # Verificar que la conversación pertenece al usuario
    verify_conversation_owner(conversation_id, user.id)
    
    # Eliminar mensajes primero (por la foreign key)
    supabase.table("messages").delete().eq("conversation_id", conversation_id).execute()
    
    # Eliminar la conversación
    result = supabase.table("conversations").delete().eq("id", conversation_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return {"message": "Conversation deleted successfully"}