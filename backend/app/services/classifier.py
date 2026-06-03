import re

class ModeClassifier:

    EXPLAIN_PATTERNS = [
        r"\bque es\b",
        r"\bqu[eé] es\b",
        r"\bexplica\b",
        r"\bexpl[ií]came\b",
        r"\bcomo funciona\b",
        r"\bc[oó]mo funciona\b",
        r"\bsignifica\b",
        r"\bdefinicion\b",
        r"\bqu[eé] significa\b"
    ]

    VOCAB_PATTERNS = [
        r"\bdime\b.*\b(animales|colores|verbos|frutas|carros|ropa|comida|paises|ciudades|numeros)\b",
        r"\blista\b",
        r"\blistame\b",
        r"\bdame\b.*\b(animales|colores|verbos|frutas|carros|ropa|comida|paises|ciudades|numeros)\b",
        r"\bens[eé]name\b.*\b(animales|colores|verbos|frutas|carros|ropa|comida|paises|ciudades|numeros)\b"
    ]

    # Extraer número si existe
    NUMBER_PATTERN = r"\b(\d{1,3})\b"

    @classmethod
    def classify(cls, message: str) -> dict:
        msg = message.lower().strip()

        # 1. EXPLAIN (más prioridad)
        for pattern in cls.EXPLAIN_PATTERNS:
            if re.search(pattern, msg):
                # Extraer tema quitando la palabra clave
                topic = re.sub("|".join(cls.EXPLAIN_PATTERNS), "", msg).strip()
                # Limpiar espacios múltiples
                topic = re.sub(r'\s+', ' ', topic).strip()
                return {"mode": "explain", "topic": topic[:50] if topic else "eso"}

        # 2. VOCAB (más controlado)
        for pattern in cls.VOCAB_PATTERNS:
            if re.search(pattern, msg):
                # Extraer tema específico
                topic_match = re.search(
                    r"(animales|colores|verbos|frutas|carros|ropa|comida|paises|ciudades|numeros)",
                    msg
                )
                topic = topic_match.group(1) if topic_match else "vocabulario"
                
                # Extraer número objetivo
                target = 10
                number_match = re.search(cls.NUMBER_PATTERN, msg)
                if number_match:
                    target = int(number_match.group(1))
                    # Limitar target razonable
                    if target > 100:
                        target = 100
                    if target < 3:
                        target = 3
                
                return {"mode": "vocab", "topic": topic, "target": target}

        # 3. DEFAULT
        return {"mode": "chat", "topic": None}