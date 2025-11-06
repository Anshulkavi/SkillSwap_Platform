from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from typing import List
import json
from jose import JWTError, jwt
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
    db: Session = Depends(get_db)
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

    # ✅ Accept connection only if JWT is valid
    await manager.connect(websocket, room_id)

    try:
        # Fetch and send chat history
        history = (
            db.query(ChatMessage)
            .filter(ChatMessage.room_id == room_id)
            .order_by(ChatMessage.created_at.desc())
            .limit(50)
            .all()
        )

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

        # Listen for new messages
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)

            new_message = ChatMessage(
                room_id=room_id,
                sender_id=message_data.get("sender_id"),
                content=message_data.get("content"),
                message_type=message_data.get("message_type", "text"),
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
        await manager.broadcast(
            room_id, {"type": "system", "message": f"User {user_id} disconnected"}
        )


# -----------------------------
# 🔹 Fetch Chat History
# -----------------------------
@router.get("/history/{room_id}")
async def get_chat_history(
    room_id: str,
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    """Get chat history for a specific room"""
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.room_id == room_id)
        .order_by(ChatMessage.created_at.desc())
        .limit(limit)
        .all()
    )

    return {
        "room_id": room_id,
        "messages": [
            {
                "id": msg.id,
                "content": msg.content,
                "sender_id": msg.sender_id,
                "message_type": msg.message_type,
                "timestamp": msg.created_at.isoformat(),
            }
            for msg in reversed(messages)
        ],
    }


# -----------------------------
# 🔹 List User Conversations
# -----------------------------
@router.get("/conversations")
async def get_conversations(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Return list of conversations for the current user.
    Each conversation: room_id, partner {id, name, avatar},
    last_message, timestamp, unread_count.
    """
    # ✅ Find all room IDs where current user participates
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
        # Last message
        last_msg = (
            db.query(ChatMessage)
            .filter(ChatMessage.room_id == room_id)
            .order_by(ChatMessage.created_at.desc())
            .first()
        )
        if not last_msg:
            continue

        # Infer partner ID from room name
        try:
            parts = room_id.split("_")
            a, b = int(parts[1]), int(parts[2])
            partner_id = a if b == current_user.id else b
        except Exception:
            continue

        partner = db.query(User).filter(User.id == partner_id).first()

        unread_count = (
            db.query(func.count(ChatMessage.id))
            .filter(
                ChatMessage.room_id == room_id,
                ChatMessage.sender_id != current_user.id
            )
            .scalar()
        ) or 0

        convos.append({
            "room_id": room_id,
            "partner": {
                "id": partner.id if partner else None,
                "name": partner.name if partner else "Unknown",
                "avatar": partner.avatar if partner else None,
            },
            "last_message": last_msg.content,
            "timestamp": last_msg.created_at.isoformat()
            if last_msg.created_at else None,
            "unread_count": int(unread_count),
        })

    return sorted(convos, key=lambda x: x["timestamp"] or "", reverse=True)
