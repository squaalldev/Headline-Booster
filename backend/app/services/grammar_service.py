from groq import Groq
from app.core.config import settings
import json


class GrammarService:

    def __init__(self):
        self.client = Groq(
            api_key=settings.GROQ_API_KEY
        )

        self.model = "llama-3.3-70b-versatile"

    async def check(self, text: str):

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": """
You are an English grammar checker for a language learning app.

Return JSON only.

If the sentence contains mistakes, return:

{
  "has_error": true,
  "original": "...",
  "corrected": "...",
  "explanation": "...",
  "translation": "..."
}

If the sentence is correct OR is not English, return:

{
  "has_error": false
}

Rules:

- Only check English.
- Ignore Spanish completely.
- Never correct Spanish.
- Detect grammar mistakes even if the sentence is understandable.
- Detect spelling mistakes.
- Detect verb tense mistakes.
- Detect subject-verb agreement mistakes.
- Detect missing auxiliary verbs.
- Keep explanations short and simple in Spanish.

Examples:

Input:
She don't like pizza

Output:
{
  "has_error": true,
  "original": "She don't like pizza",
  "corrected": "She doesn't like pizza",
  "explanation": "Con she se usa doesn't, no don't.",
  "translation": "A ella no le gusta la pizza"
}

Input:
I goed to school yesterday

Output:
{
  "has_error": true,
  "original": "I goed to school yesterday",
  "corrected": "I went to school yesterday",
  "explanation": "El pasado de go es went.",
  "translation": "Fui a la escuela ayer"
}

Input:
He go to work every day

Output:
{
  "has_error": true,
  "original": "He go to work every day",
  "corrected": "He goes to work every day",
  "explanation": "Con he el verbo lleva s.",
  "translation": "Él va al trabajo todos los días"
}

Input:
hola como estas

Output:
{
  "has_error": false
}
"""
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            response_format={
                "type": "json_object"
            },
            temperature=0
        )

        try:
            return json.loads(
                response.choices[0].message.content
            )

        except Exception:
            return {
                "has_error": False
            }


grammar_service = GrammarService()