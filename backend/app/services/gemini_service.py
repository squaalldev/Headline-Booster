import google.generativeai as genai
from app.core.config import settings
from app.services.game_state import GameStateService

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    # REGLA GLOBAL - TUTOR DE IDIOMAS (90% inglés, 10% español como apoyo)
    GLOBAL_RULE = """GLOBAL RULE FOR ENGLISH TUTOR:
- ALWAYS respond MAINLY in ENGLISH (90% of your response).
- You MAY use Spanish ONLY in these situations:
  * When the user asks "como se dice X" or "translate X" (respond with the English word/phrase, max 2 words).
  * When the user says "no entiendo" or seems lost (give a brief Spanish clarification, max 1 sentence).
  * When you need to explain a difficult concept (use Spanish as support, max 1 sentence).
- ENGLISH is the main language for conversation.
- Spanish is support only, not the main language.
- DO NOT switch to Spanish unless necessary for understanding.
- Keep responses short and clear.

Example of GOOD response:
User: "como se dice perro en ingles"
You: "dog 🐶"

Example of GOOD clarification:
User: "no entiendo past simple"
You: "Past simple is for finished past actions. For example: 'I walked to school'. En español: acciones que ya terminaron."

Example of BAD response (DONT do this):
User: "hello"
You: "Hola" (NO, should be "Hello! How are you?")"""

    async def chat(self, messages, personality=None, conversation_id=None, state=None):
        # Obtener estado (única fuente de verdad)
        if state is None and conversation_id:
            state = GameStateService.get_state(conversation_id)
        elif state is None:
            state = {"mode": "chat", "current": None, "target": None, "topic": None, "items": []}
        
        mode = state.get("mode", "chat")
        
        # Construir prompt según el modo
        if mode == "vocab":
            current = state.get("current", 1)
            target = state.get("target", 10)
            topic = state.get("topic", "vocabulario")
            
            if current == 1:
                system_prompt = f"""You are an English vocabulary tutor.

CURRENT STATE:
- Topic: {topic}
- You are on number: {current}
- Target total: {target}

RULES:
1. Give ONLY 3 examples in ENGLISH.
2. Format: "1. word1 2. word2 3. word3"
3. Then ask: "Now number {current + 1}?"
4. NEVER give more than 3 examples.
5. NEVER continue without user response.
6. You can use Spanish ONLY if the user is completely lost.

FINAL RULE: English first, Spanish only when needed."""
            else:
                system_prompt = f"""You are an English vocabulary tutor.

CURRENT STATE:
- Topic: {topic}
- You are on number: {current}
- Target total: {target}

RULES:
1. Wait for user response.
2. When they respond, confirm: "{current}. [word] ✅ Good! Now number {current + 1}?"
3. If the user says "no se" or "no entiendo", give a hint in English (or Spanish if necessary).
4. NEVER give the next number without user response.

FINAL RULE: English first, Spanish only when needed."""
        
        elif mode == "explain":
            system_prompt = """You are an English teacher (Mentor).

RULES:
1. Explain mainly in ENGLISH (90%).
2. Use Spanish ONLY for difficult concepts (max 1 sentence).
3. Max 3 main ideas.
4. Use simple examples in ENGLISH.
5. End with a question.
6. Use emojis: 📚 ✅ 👍

FINAL RULE: English first, Spanish only when needed."""
        
        else:  # chat mode
            system_prompt = """You are a friendly English tutor.

RULES:
1. Speak 90% ENGLISH, 10% Spanish (only for support).
2. If user asks for translation like "como se dice X", respond ONLY with the English word/phrase (max 2 words).
3. If user says "no entiendo", give brief Spanish clarification (max 1 sentence).
4. Correct errors gently (max 1 correction per message).
5. Keep responses short (1-3 sentences).
6. Use emojis moderately 😊

Remember: English first, Spanish only when needed."""
        
        # Construir el prompt completo para Gemini
        full_prompt = self.GLOBAL_RULE + "\n\n" + system_prompt + "\n\n"
        
        # Agregar personalidad SOLO en modo chat
        if personality and mode == "chat":
            personality_prompt = personality.get("system_prompt", "")
            if personality_prompt:
                full_prompt += f"""\nStyle guide only (DO NOT break GLOBAL RULE):
{personality_prompt[:500]}
Remember: English 90%, Spanish 10% support only.\n\n"""
        
        # Agregar historial de conversación
        for msg in messages:
            role = "User" if msg["role"] == "user" else "Assistant"
            full_prompt += f"{role}: {msg['content']}\n"
        
        full_prompt += "Assistant: "
        
        # Llamar a Gemini
        response = self.model.generate_content(full_prompt)
        return response.text

gemini_service = GeminiService()