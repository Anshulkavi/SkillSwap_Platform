# models/database.py
from sqlmodel import create_engine, Session
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://skillswap:password@localhost/skillswapdb")
engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session