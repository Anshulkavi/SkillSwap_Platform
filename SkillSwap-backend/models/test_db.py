# models/test_db.py

from models.database import engine
from sqlalchemy import text

print("Testing PostgreSQL connection...")

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        print("✅ Connected successfully!")
        print("PostgreSQL version:", result.scalar())
except Exception as e:
    print("❌ Connection failed:", e)
