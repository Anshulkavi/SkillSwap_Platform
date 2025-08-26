# models/database.py
from sqlmodel import create_engine, Session
import os
from dotenv import load_dotenv

# 👇 yeh add karo
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please check your .env file.")

engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session
