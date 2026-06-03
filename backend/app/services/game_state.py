from supabase import create_client
from app.core.config import settings
import json

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


class GameStateService:

    # =========================
    # CORE STATE
    # =========================

    @staticmethod
    def get_state(conversation_id: int):
        """UNICA FUENTE DE VERDAD"""
        try:
            result = supabase.table("conversations") \
                .select("game_state") \
                .eq("id", conversation_id) \
                .execute()

            if result.data and result.data[0].get("game_state"):
                state = result.data[0]["game_state"]

                if isinstance(state, str):
                    return json.loads(state)

                return state

        except Exception as e:
            print(f"Error get_state: {e}")

        return {
            "mode": "chat",
            "current": None,
            "target": None,
            "topic": None,
            "items": []
        }

    @staticmethod
    def update_state(conversation_id: int, updates: dict):
        """UNICA FORMA DE ESCRIBIR ESTADO"""
        try:
            current = GameStateService.get_state(conversation_id)

            # merge seguro
            new_state = {**current, **updates}

            supabase.table("conversations") \
                .update({"game_state": new_state}) \
                .eq("id", conversation_id) \
                .execute()

            return new_state

        except Exception as e:
            print(f"Error update_state: {e}")
            return GameStateService.get_state(conversation_id)

    # =========================
    # VOCAB MODE
    # =========================

    @staticmethod
    def init_vocab(conversation_id: int, topic: str, target: int = 10):
        return GameStateService.update_state(conversation_id, {
            "mode": "vocab",
            "current": 1,
            "target": target,
            "topic": topic,
            "items": []
        })

    @staticmethod
    def advance_vocab(conversation_id: int, answer: str):
        state = GameStateService.get_state(conversation_id)

        if state.get("mode") != "vocab":
            return {"error": "No hay juego activo", "valid": False}

        current = state.get("current") or 1
        target = state.get("target") or 10

        # validar input básico
        if not answer or len(answer.strip()) < 1:
            return {"valid": False, "message": "Invalid answer"}

        items = state.get("items") or []
        items.append(answer.strip())

        new_current = current + 1

        if new_current > target:
            GameStateService.update_state(conversation_id, {
                "mode": "chat",
                "current": None,
                "target": None,
                "topic": None,
                "items": []
            })

            return {
                "valid": True,
                "completed": True,
                "message": f"🎉 Great job! You completed {target} words!"
            }

        GameStateService.update_state(conversation_id, {
            "current": new_current,
            "items": items
        })

        return {
            "valid": True,
            "current": new_current,
            "next": new_current + 1,
            "target": target,
            "completed": False
        }

    # =========================
    # CHAT MODE
    # =========================

    @staticmethod
    def set_chat_mode(conversation_id: int):
        return GameStateService.update_state(conversation_id, {
            "mode": "chat",
            "current": None,
            "target": None,
            "topic": None,
            "items": []
        })