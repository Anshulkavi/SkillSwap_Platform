# main.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine, Session
from contextlib import asynccontextmanager
import os
from typing import Dict, Set
import json

from routers import auth, users, listings, requests, chat, reviews
from models.database import engine
from websocket_manager import WebSocketManager

# WebSocket manager for real-time features
ws_manager = WebSocketManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(title="SkillSwap API", version="1.0.0", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(listings.router, prefix="/api/listings", tags=["listings"])
app.include_router(requests.router, prefix="/api/requests", tags=["requests"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])

# WebSocket endpoints
@app.websocket("/ws/chat/{user_id}")
async def websocket_chat(websocket: WebSocket, user_id: int):
    await ws_manager.connect_chat(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            await ws_manager.send_message(message_data)
    except WebSocketDisconnect:
        ws_manager.disconnect_chat(user_id)

@app.websocket("/ws/video/{room_id}")
async def websocket_video(websocket: WebSocket, room_id: str):
    await ws_manager.connect_video(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_text()
            signal_data = json.loads(data)
            await ws_manager.send_video_signal(signal_data, room_id)
    except WebSocketDisconnect:
        ws_manager.disconnect_video(websocket, room_id)

@app.get("/")
async def root():
    return {"message": "SkillSwap API is running!"}