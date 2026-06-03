from app.core.config import settings
from app.services.game_state import GameStateService
from groq import Groq
from app.services.prompts import (
    BASE_COMPARTIR_PROMPT,
    PERSONALITY_PROMPTS
)
import json


class AIService:

    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = "llama-3.3-70b-versatile"

    # =========================
    # DETECTAR SI ES INGLÉS
    # =========================

    def _looks_like_english(self, text: str):
        if not text:
            return False
        text = text.lower()
        common_english = {
            "i", "you", "he", "she", "we", "they",
            "am", "is", "are", "was", "were",
            "have", "has", "had",
            "do", "does", "did",
            "the", "a", "an",
            "my", "your", "his", "her",
            "what", "where", "when", "why", "how"
        }
        words = text.lower().split()
        matches = sum(1 for word in words if word in common_english)
        return matches >= 1

    # =========================
    # DETECTAR SI DEBE CORREGIR
    # =========================

    def _should_correct(self, text: str):
        if not text:
            return False
        text = text.strip()
        if len(text.split()) <= 1:
            return False
        informational_patterns = [
            "what is", "what are", "how do", "tell me",
            "write", "show me", "create", "generate",
            "who is", "why is", "where is", "when is"
        ]
        lower = text.lower()
        for pattern in informational_patterns:
            if lower.startswith(pattern):
                return False
        return True

    # =========================
    # SYSTEM PROMPT
    # =========================

    def _get_system_prompt(self, personality=None, mode="chat"):
        base_prompt = BASE_COMPARTIR_PROMPT
        if personality and mode == "chat":
            personality_id = personality.get("id")
            if personality_id in PERSONALITY_PROMPTS:
                personality_prompt = PERSONALITY_PROMPTS[personality_id]
                base_prompt += "\n\n" + personality_prompt
        return base_prompt

    # =========================
    # LIMPIAR VOCABULARIO
    # =========================

    def _sanitize_vocabulary(self, vocabulary, response_text):
        if not isinstance(vocabulary, list):
            return []
        cleaned = []
        response_lower = response_text.lower()
        banned_words = {
            "the", "a", "an", "is", "are", "to", "of", "and", "or", "in"
        }
        for item in vocabulary:
            if not isinstance(item, dict):
                continue
            word = str(item.get("word", "")).strip()
            meaning = str(item.get("meaning", "")).strip()
            if not word or not meaning:
                continue
            if len(word) > 40:
                continue
            if word.lower() in banned_words:
                continue
            if word.lower() not in response_lower:
                continue
            duplicated = any(x["word"].lower() == word.lower() for x in cleaned)
            if duplicated:
                continue
            cleaned.append({"word": word, "meaning": meaning})
        return cleaned[:5]

    # =========================
    # LIMPIAR CORRECCIÓN (AHORA DENTRO DE LA CLASE)
    # =========================

    def _sanitize_correction(self, correction, user_message):
        if not correction:
            return None
        if not isinstance(correction, dict):
            return None
        # Comentado para probar
        # if correction.get("has_error") is False:
        #     return None
        original = str(correction.get("original", "")).strip()
        corrected = str(correction.get("corrected", "")).strip()
        explanation = str(correction.get("explanation", "")).strip()
        if not corrected or corrected == "None" or corrected == "none":
            return None
        if not original or original == "None" or original == "none":
            return None
        # Comentado para probar
        # if corrected.lower() == user_message.lower():
        #     return None
        if explanation == "None" or explanation == "none" or not explanation:
            explanation = "Se ha corregido el error."
        return {
            "original": original,
            "corrected": corrected,
            "explanation": explanation
        }

    # =========================
    # CHAT
    # =========================

    async def chat(self, messages, personality=None, conversation_id=None, state=None):
        if state is None and conversation_id:
            state = GameStateService.get_state(conversation_id)
        elif state is None:
            state = {"mode": "chat", "current": None, "target": None, "topic": None, "items": []}

        mode = state.get("mode", "chat")
        system_prompt = self._get_system_prompt(
            personality if mode == "chat" else None,
            mode
        )

        limited_messages = messages[-20:] if len(messages) > 12 else messages
        formatted_messages = []
        for msg in limited_messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            formatted_messages.append({"role": role, "content": content})

        groq_messages = [
            {"role": "system", "content": system_prompt},
            *formatted_messages
        ]

        response = self.client.chat.completions.create(
            model=self.model,
            messages=groq_messages,
            temperature=0.2,
            top_p=0.9,
            max_tokens=1200,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content

        print("\n" + "=" * 50)
        print("📥 RAW AI RESPONSE:")
        print(repr(content[:1000]))
        print("=" * 50 + "\n")

        try:
            data = json.loads(content)
        except Exception as e:
            print(f"❌ JSON ERROR: {e}")
            fallback = {
                "response": "Sorry, I had trouble generating a response.",
                "translation": "Lo siento, tuve problemas generando una respuesta.",
                "correction": None,
                "vocabulary": []
            }
            return json.dumps(fallback, ensure_ascii=False)

        response_text = str(data.get("response", "")).strip()
        translation = data.get("translation") or ""
        vocabulary = data.get("vocabulary", [])
        correction = data.get("correction", None)

        vocabulary = self._sanitize_vocabulary(vocabulary, response_text)
        user_message = messages[-1].get("content", "") if messages else ""

        print(f" CORRECCIÓN ANTES DE SANITIZE: {correction}")

        if self._should_correct(user_message) and self._looks_like_english(user_message):
            if correction:
                correction = self._sanitize_correction(correction, user_message)
                print(f" CORRECCIÓN DESPUÉS DE SANITIZE: {correction}")
            else:
                correction = None
        else:
            correction = None

        print("📚 Vocabulary limpio:")
        print(vocabulary)
        print("✏️ Correction:")
        print(correction)

        final_data = {
            "response": response_text,
            "translation": translation,
            "correction": correction,
            "vocabulary": vocabulary
        }

        print(f" FINAL DATA A ENVIAR: {final_data}")

        return json.dumps(final_data, ensure_ascii=False)


ai_service = AIService()