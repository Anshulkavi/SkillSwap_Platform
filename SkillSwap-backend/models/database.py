# # models/database.py
# from sqlmodel import create_engine, Session
# import os
# from dotenv import load_dotenv

# # 👇 yeh add karo
# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL is not set. Please check your .env file.")

# engine = create_engine(DATABASE_URL)

# def get_session():
#     with Session(engine) as session:
#         yield session

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# # 👇 yeh add karo
load_dotenv()


# Database URL - modify for production
DATABASE_URL = os.getenv("DATABASE_URL")

# SQLite for development (comment out for production)
# DATABASE_URL = "sqlite:///./skillswap.db"

engine = create_engine(
    DATABASE_URL,
    # For SQLite only
    # connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()