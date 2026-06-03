from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat
from app.core.config import settings

app = FastAPI(
    title="COMPARTIR API",
    description="Compañero IA para aprender inglés"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://compartir-ai.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(chat.router)

@app.get("/")
def root():
    return {
        "service": "COMPARTIR API",
        "status": "online",
        "groq_configured": bool(settings.GROQ_API_KEY),
    }

@app.get("/health")
def health():
    return {"status": "ok"}