import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import certifi

load_dotenv()
MONGODB_URI = os.environ.get("MONGODB_URI")

async def inspect():
    client = AsyncIOMotorClient(MONGODB_URI, tlsCAFile=certifi.where())
    db = client.get_database("naaviagent")
    
    gen_count = await db.generation_history.count_documents({})
    pending_count = await db.pending_paths.count_documents({})
    published_count = await db.published_paths.count_documents({})
    profiles_count = await db.profiles.count_documents({})
    feedbacks_count = await db.admin_feedbacks.count_documents({})
    marketplace_feedback_count = await db.marketplace_feedback.count_documents({})
    
    print(f"--- DATABASE RECORD COUNTS ---")
    print(f"generation_history: {gen_count}")
    print(f"pending_paths: {pending_count}")
    print(f"published_paths: {published_count}")
    print(f"profiles: {profiles_count}")
    print(f"admin_feedbacks: {feedbacks_count}")
    print(f"marketplace_feedback: {marketplace_feedback_count}")
    
    print(f"\n--- SAMPLE PENDING PATHS ---")
    async for p in db.pending_paths.find().limit(3):
        profile = p.get("profile") or {}
        print({
            "id": str(p["_id"]),
            "status": p.get("status"),
            "current": p.get("current_position"),
            "goal": p.get("target_goal"),
            "activeSegment": profile.get("activeSegment"),
            "created_at": str(p.get("created_at")),
            "created_by": p.get("created_by")
        })

    print(f"\n--- SAMPLE PUBLISHED PATHS ---")
    async for p in db.published_paths.find().limit(3):
        profile = p.get("profile") or {}
        print({
            "id": str(p["_id"]),
            "status": p.get("status"),
            "current": p.get("current_position"),
            "goal": p.get("target_goal"),
            "activeSegment": profile.get("activeSegment"),
            "created_at": str(p.get("created_at")),
            "published_at": str(p.get("published_at")),
            "created_by": p.get("created_by")
        })

    print(f"\n--- SAMPLE GENERATION HISTORY ---")
    async for p in db.generation_history.find().limit(3):
        profile = p.get("profile") or {}
        print({
            "id": str(p["_id"]),
            "current": p.get("current_position"),
            "goal": p.get("target_goal"),
            "activeSegment": profile.get("activeSegment"),
            "timestamp": str(p.get("timestamp")),
            "session_email": p.get("session_email")
        })

if __name__ == "__main__":
    asyncio.run(inspect())
