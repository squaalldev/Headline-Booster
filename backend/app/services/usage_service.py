from datetime import date
from fastapi import HTTPException

DAILY_LIMIT = 50


class UsageService:

    def __init__(self, db):
        self.db = db

    def check_and_increment(self, user_id: str):

        today = str(date.today())

        record = (
            self.db.table("user_usage")
            .select("*")
            .eq("user_id", user_id)
            .eq("date", today)
            .execute()
        )

        data = record.data[0] if record.data else None

        # si no existe, crear
        if not data:
            self.db.table("user_usage").insert({
                "user_id": user_id,
                "date": today,
                "count": 1
            }).execute()

            return True, 1, DAILY_LIMIT

        # si ya llegó al límite
        if data["count"] >= DAILY_LIMIT:
            return False, data["count"], DAILY_LIMIT

        # incrementar
        new_count = data["count"] + 1

        self.db.table("user_usage").update({
            "count": new_count
        }).eq("id", data["id"]).execute()

        return True, new_count, DAILY_LIMIT