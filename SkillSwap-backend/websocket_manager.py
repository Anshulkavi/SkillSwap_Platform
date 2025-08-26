# websocket_manager.py
from fastapi import WebSocket
from typing import Dict, List, Set
import json
from datetime import datetime
from sqlmodel import Session

from models.database import get_session, engine
from models.models import Message

class WebSocketManager:
    def __init__(self):
        # Chat connections: user_id -> websocket
        self.chat_connections: Dict[int, WebSocket] = {}
        # Video call rooms: room_id -> set of websockets
        self.video_rooms: Dict[str, Set[WebSocket]] = {}

    async def connect_chat(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.chat_connections[user_id] = websocket

    def disconnect_chat(self, user_id: int):
        if user_id in self.chat_connections:
            del self.chat_connections[user_id]

    async def send_message(self, message_data: dict):
        # Save message to database
        with Session(engine) as session:
            db_message = Message(
                sender_id=message_data["sender_id"],
                receiver_id=message_data["receiver_id"],
                text=message_data["text"]
            )
            session.add(db_message)
            session.commit()
            session.refresh(db_message)

            # Send to receiver if connected
            receiver_id = message_data["receiver_id"]
            if receiver_id in self.chat_connections:
                await self.chat_connections[receiver_id].send_text(json.dumps({
                    "type": "message",
                    "id": db_message.id,
                    "sender_id": db_message.sender_id,
                    "receiver_id": db_message.receiver_id,
                    "text": db_message.text,
                    "timestamp": db_message.timestamp.isoformat(),
                    "read_status": db_message.read_status
                }))

    async def connect_video(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.video_rooms:
            self.video_rooms[room_id] = set()
        self.video_rooms[room_id].add(websocket)

    def disconnect_video(self, websocket: WebSocket, room_id: str):
        if room_id in self.video_rooms:
            self.video_rooms[room_id].discard(websocket)
            if not self.video_rooms[room_id]:
                del self.video_rooms[room_id]

    async def send_video_signal(self, signal_data: dict, room_id: str):
        if room_id in self.video_rooms:
            # Send signal to all other peers in the room
            sender_ws = signal_data.get("sender_ws")
            for websocket in self.video_rooms[room_id]:
                if websocket != sender_ws:
                    await websocket.send_text(json.dumps(signal_data))