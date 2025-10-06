from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from sqlalchemy.orm import Session
from typing import List
import json

from models.database import get_db
from models.models import ChatMessage, User
from websocket_manager import manager

router = APIRouter()

@router.websocket("/ws/{room_id}")
async def chat_websocket(
    websocket: WebSocket,
    room_id: str,
    token: str = Query(...),
    db: Session = Depends(get_db)
):
    """WebSocket endpoint for real-time chat"""
    await manager.connect(websocket, room_id)
    
    try:
        # Send chat history
        history = db.query(ChatMessage).filter(
            ChatMessage.room_id == room_id
        ).order_by(ChatMessage.created_at.desc()).limit(50).all()
        
        await websocket.send_json({
            "type": "history",
            "messages": [
                {
                    "content": msg.content,
                    "sender_id": msg.sender_id,
                    "timestamp": msg.created_at.isoformat()
                }
                for msg in reversed(history)
            ]
        })
        
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Save message to database
            new_message = ChatMessage(
                room_id=room_id,
                sender_id=message_data.get("sender_id"),
                content=message_data.get("content"),
                message_type=message_data.get("message_type", "text")
            )
            db.add(new_message)
            db.commit()
            
            # Get sender info
            sender = db.query(User).filter(
                User.id == message_data.get("sender_id")
            ).first()
            
            # Broadcast to room
            await manager.broadcast(
                room_id,
                {
                    "type": "message",
                    "content": message_data.get("content"),
                    "sender_id": message_data.get("sender_id"),
                    "sender_name": sender.name if sender else "Unknown",
                    "timestamp": new_message.created_at.isoformat()
                }
            )
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
        await manager.broadcast(
            room_id,
            {"type": "system", "message": "User disconnected"}
        )

@router.get("/history/{room_id}")
async def get_chat_history(
    room_id: str,
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """Get chat history for a room"""
    messages = db.query(ChatMessage).filter(
        ChatMessage.room_id == room_id
    ).order_by(ChatMessage.created_at.desc()).limit(limit).all()
    
    return {
        "room_id": room_id,
        "messages": [
            {
                "id": msg.id,
                "content": msg.content,
                "sender_id": msg.sender_id,
                "message_type": msg.message_type,
                "timestamp": msg.created_at.isoformat()
            }
            for msg in reversed(messages)
        ]
    }