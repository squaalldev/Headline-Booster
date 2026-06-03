import httpx

class Translator:
    @staticmethod
    async def translate(text: str, target: str = "es") -> str:
        """Traducir texto usando Google Translate (gratuito)"""
        if not text or len(text.strip()) < 2:
            return text
        
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                url = "https://translate.googleapis.com/translate_a/single"
                params = {
                    "client": "gtx",
                    "sl": "en",
                    "tl": target,
                    "dt": "t",
                    "q": text
                }
                response = await client.get(url, params=params)
                if response.status_code == 200:
                    data = response.json()
                    if data and data[0]:
                        translation = "".join([item[0] for item in data[0] if item[0]])
                        return translation
        except Exception as e:
            print(f"Error traduciendo: {e}")
        
        return text

translator = Translator()