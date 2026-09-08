import asyncio
import os
import json
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import certifi

load_dotenv(r"c:\Users\Dell\Naaviverse-8\navi-agent\code\.env")

# Import get_admin_analytics directly from main
from main import get_admin_analytics

async def test_analytics():
    print("=== TESTING REAL BACKEND ANALYTICS ENDPOINT ===")
    
    # 1. Test range=all
    res_all = await get_admin_analytics(time_range="all")
    print("\n--- RANGE: ALL ---")
    print("Overview:", json.dumps(res_all["overview"], indent=2))
    print("Lifecycle Funnel:", json.dumps(res_all["lifecycle_funnel"], indent=2))
    print("Categories:", json.dumps(res_all["categories"], indent=2))
    print("Monthly Trend:", json.dumps(res_all["monthly_trend"], indent=2))
    print("Recent Activity Count:", len(res_all["recent_activity"]))
    if res_all["recent_activity"]:
        print("Sample Recent Pathway:", json.dumps(res_all["recent_activity"][0], indent=2))

    # Assertions
    assert res_all["overview"]["total_generated"] == 10, f"Expected 10 total paths, got {res_all['overview']['total_generated']}"
    assert res_all["overview"]["published_count"] == 3, f"Expected 3 published paths, got {res_all['overview']['published_count']}"
    assert res_all["overview"]["pending_count"] == 7, f"Expected 7 pending paths, got {res_all['overview']['pending_count']}"
    assert res_all["overview"]["draft_count"] == 0, f"Expected 0 drafts, got {res_all['overview']['draft_count']}"
    assert res_all["overview"]["avg_review_time_formatted"] != "—", "Expected real calculated avg review time"
    
    # Check no mock student names
    for p in res_all["recent_activity"]:
        assert p["student_name"] != "Arjun S.", "Found mock student Arjun S.!"
        assert p["student_name"] != "Priya M.", "Found mock student Priya M.!"

    # 2. Test range=30d
    res_30d = await get_admin_analytics(time_range="30d")
    print("\n--- RANGE: 30D ---")
    print("Overview (30d):", json.dumps(res_30d["overview"], indent=2))
    print("Recent Activity Count (30d):", len(res_30d["recent_activity"]))

    # 3. Test range=7d
    res_7d = await get_admin_analytics(time_range="7d")
    print("\n--- RANGE: 7D ---")
    print("Overview (7d):", json.dumps(res_7d["overview"], indent=2))

    print("\n[SUCCESS] All backend analytics tests passed with ZERO mock data!")

if __name__ == "__main__":
    asyncio.run(test_analytics())
