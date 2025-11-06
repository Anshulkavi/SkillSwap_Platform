# # models/database.py

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import os
# from dotenv import load_dotenv

# # # 👇 yeh add karo
# load_dotenv()


# # Database URL - modify for production
# DATABASE_URL = os.getenv("DATABASE_URL")

# # SQLite for development (comment out for production)
# # DATABASE_URL = "sqlite:///./skillswap.db"

# engine = create_engine(
#     DATABASE_URL,
#     # For SQLite only
#     # connect_args={"check_same_thread": False}
# )

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# # Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# models/database.py

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# # Get the DATABASE_URL from .env
# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("❌ DATABASE_URL not found in environment variables")

# # Create SQLAlchemy engine
# engine = create_engine(
#     DATABASE_URL,
#     connect_args={"sslmode": "require"} if "neon.tech" in DATABASE_URL else {}
# )

# # Create session
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Base class for models
# Base = declarative_base()

# # Dependency for FastAPI routes
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# models/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# ✅ Load connection URL
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL not found in environment variables")

# ✅ Add sslmode=require if hosted (Neon, Render, Supabase, etc.)
if "sslmode" not in DATABASE_URL:
    if any(host in DATABASE_URL for host in ["neon.tech", "render.com", "supabase.co", "railway.app"]):
        if "?" in DATABASE_URL:
            DATABASE_URL += "&sslmode=require"
        else:
            DATABASE_URL += "?sslmode=require"

# ✅ Create SQLAlchemy engine with safe connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,       # checks if connection is alive before using it
    pool_recycle=1800,        # recycle every 30 mins
    pool_size=5,              # max 5 active connections
    max_overflow=10,          # allow 10 extra temporary connections
    echo=False,               # change to True for SQL logs
)

# ✅ Create SessionLocal factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Declarative base
Base = declarative_base()

# ✅ Dependency for FastAPI routes
def get_db():
    """Provide a transactional database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
