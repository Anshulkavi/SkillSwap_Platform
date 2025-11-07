# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from config.cloudinary_config import configure_cloudinary

load_dotenv()

# Import your application modules
from models.database import engine, Base
from routers import (
    login, signup, profile, skill_exchange, 
    community, leaderboard, videos, chat, video_call, user
)

# 👇 CORRECTED: Only one lifespan function
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code that runs on startup
    print("Application startup...")
    configure_cloudinary()
    Base.metadata.create_all(bind=engine)
    yield
    # Code that runs on shutdown
    print("Application shutdown...")

app = FastAPI(
    title="SkillSwap API",
    description="Backend API for SkillSwap platform",
    version="1.0.0",
    lifespan=lifespan
)

# ✅ Add both localhost + deployed frontend
origins = [
    "http://localhost:3000",          # Local React dev
    "https://localhost:3000",         # Secure local dev (optional for future)
    "https://skillswap-platform-17zv.onrender.com",  # ✅ Deployed frontend on Render
]

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(login.router, prefix="/api", tags=["Authentication"])
app.include_router(signup.router, prefix="/api", tags=["Authentication"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(skill_exchange.router, prefix="/api/skill-exchange", tags=["Skill Exchange"])
app.include_router(community.router, prefix="/api/community", tags=["Community"])
app.include_router(leaderboard.router, prefix="/api/leaderboard", tags=["Leaderboard"])
app.include_router(videos.router, prefix="/api/videos", tags=["Videos"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(video_call.router, prefix="/api/video-call", tags=["Video Call"])
app.include_router(user.router, prefix="/api/users", tags=["Users"])

@app.get("/")
async def root():
    return {
        "message": "SkillSwap API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}