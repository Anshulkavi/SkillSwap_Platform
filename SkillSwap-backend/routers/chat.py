#chat.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
import json
from jose import JWTError, jwt
from typing import List
from models.database import get_db
from models.models import ChatMessage, User
from websocket_manager import manager
from auth.dependencies import SECRET_KEY, ALGORITHM, get_current_user

router = APIRouter()

# -----------------------------
# 🔹 WebSocket Chat Connection
# -----------------------------
@router.websocket("/ws/{room_id}")
async def chat_websocket(
    websocket: WebSocket,
    room_id: str,
    token: str = Query(...),
    db: Session = Depends(get_db),
):
    """Authenticated WebSocket endpoint"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise ValueError("Invalid token")
    except JWTError:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        print("❌ Invalid or expired token")
        return

    await manager.connect(websocket, room_id)
    print(f"✅ User {user_id} connected to {room_id}")

    try:
        # Send last 50 messages
        history = (
            db.query(ChatMessage)
            .filter(ChatMessage.room_id == room_id)
            .order_by(ChatMessage.created_at.asc())
            .limit(50)
            .all()
        )

        await websocket.send_json({
            "type": "history",
            "messages": [
                {
                    "content": msg.content,
                    "sender_id": msg.sender_id,
                    "timestamp": msg.created_at.isoformat(),
                }
                for msg in history
            ]
        })

        # Notify others: user joined / online
        await manager.broadcast(
            room_id,
            {"type": "presence", "user_id": user_id, "status": "online"},
        )

        # Listen for incoming events
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            msg_type = message_data.get("type", "text")

            if msg_type == "typing":
                # Notify partner only — not sender
                await manager.broadcast(
                    room_id,
                    {"type": "typing", "user_id": user_id, "is_typing": True},
                )
                continue

            elif msg_type == "ping":
                # Heartbeat, ignore silently
                continue

            elif msg_type == "text":
                # Save message to DB
                new_message = ChatMessage(
                    room_id=room_id,
                    sender_id=message_data.get("sender_id"),
                    content=message_data.get("content"),
                    message_type="text",
                )
                db.add(new_message)
                db.commit()

                await manager.broadcast(
                    room_id,
                    {
                        "type": "message",
                        "content": new_message.content,
                        "sender_id": new_message.sender_id,
                        "timestamp": new_message.created_at.isoformat(),
                    },
                )

    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
        print(f"❌ User {user_id} disconnected from {room_id}")
        await manager.broadcast(
            room_id,
            {"type": "presence", "user_id": user_id, "status": "offline"},
        )


# -----------------------------
# 🔹 Fetch Chat History
# -----------------------------
@router.get("/history/{room_id}")
async def get_chat_history(room_id: str, db: Session = Depends(get_db)):
    """Get full chat history for a room"""
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.room_id == room_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
    return {
        "room_id": room_id,
        "messages": [
            {
                "content": m.content,
                "sender_id": m.sender_id,
                "timestamp": m.created_at.isoformat(),
            }
            for m in messages
        ],
    }


# -----------------------------
# 🔹 List Conversations
# -----------------------------
@router.get("/conversations")
async def get_conversations(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    rooms = (
        db.query(ChatMessage.room_id)
        .filter(
            or_(
                ChatMessage.room_id.like(f"room_{current_user.id}_%"),
                ChatMessage.room_id.like(f"room_%_{current_user.id}")
            )
        )
        .distinct()
        .all()
    )
    room_ids = [r[0] for r in rooms]

    convos = []
    for room_id in room_ids:
        last_msg = (
            db.query(ChatMessage)
            .filter(ChatMessage.room_id == room_id)
            .order_by(ChatMessage.created_at.desc())
            .first()
        )
        if not last_msg:
            continue

        parts = room_id.split("_")
        try:
            a, b = int(parts[1]), int(parts[2])
            partner_id = a if b == current_user.id else b
        except Exception:
            continue

        partner = db.query(User).filter(User.id == partner_id).first()

        convos.append({
            "room_id": room_id,
            "partner": {
                "id": partner.id if partner else None,
                "name": partner.name if partner else "Unknown",
                "avatar": partner.avatar if partner else None,
            },
            "last_message": last_msg.content,
            "timestamp": last_msg.created_at.isoformat() if last_msg.created_at else None,
        })

    return sorted(convos, key=lambda x: x["timestamp"] or "", reverse=True)


# -----------------------------
# 🔹 Start / Create Chat Room
# -----------------------------
@router.post("/start")
async def start_chat(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create or return an existing chat room between two users."""
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot chat with yourself")

    small, big = sorted([current_user.id, user_id])
    room_id = f"room_{small}_{big}"

    # Create initial message if room empty
    exists = db.query(ChatMessage).filter(ChatMessage.room_id == room_id).first()
    if not exists:
        msg = ChatMessage(
            room_id=room_id,
            sender_id=current_user.id,
            content="👋 Chat started",
            message_type="system"
        )
        db.add(msg)
        db.commit()

    return {"room_id": room_id, "message": "Chat ready"}
