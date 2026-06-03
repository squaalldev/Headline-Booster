import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Supabase
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    
    # JWT
    SECRET_KEY = os.getenv("SECRET_KEY", "mi_super_secret_key_cambia_esto")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
    # Groq (agregar esto)
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

settings = Settings()