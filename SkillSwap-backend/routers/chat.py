# routers/chat.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from models.database import get_session
from models.models import Message, MessageCreate, MessageRead, User
from auth.dependencies import get_current_active_user

router = APIRouter()

@router.post("/", response_model=MessageRead)
async def send_message(
    message: MessageCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check if receiver exists
    receiver = session.get(User, message.receiver_id)
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    
    db_message = Message(**message.dict(), sender_id=current_user.id)
    session.add(db_message)
    session.commit()
    session.refresh(db_message)
    return db_message

@router.get("/conversations", response_model=List[dict])
async def get_conversations(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Get unique conversation partners
    statement = select(Message).where(
        (Message.sender_id == current_user.id) | (Message.receiver_id == current_user.id)
    )
    messages = session.exec(statement).all()
    
    # Group by conversation partner
    conversations = {}
    for message in messages:
        partner_id = message.receiver_id if message.sender_id == current_user.id else message.sender_id
        if partner_id not in conversations:
            partner = session.get(User, partner_id)
            conversations[partner_id] = {
                "user": partner,
                "last_message": message,
                "unread_count": 0
            }
        else:
            if message.timestamp > conversations[partner_id]["last_message"].timestamp:
                conversations[partner_id]["last_message"] = message
    
    # Count unread messages
    for partner_id in conversations:
        unread_statement = select(Message).where(
            Message.sender_id == partner_id,
            Message.receiver_id == current_user.id,
            Message.read_status == False
        )
        unread_messages = session.exec(unread_statement).all()
        conversations[partner_id]["unread_count"] = len(unread_messages)
    
    return list(conversations.values())

@router.get("/{user_id}", response_model=List[MessageRead])
async def get_chat_history(
    user_id: int,
    limit: int = 50,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(Message).where(
        ((Message.sender_id == current_user.id) & (Message.receiver_id == user_id)) |
        ((Message.sender_id == user_id) & (Message.receiver_id == current_user.id))
    ).order_by(Message.timestamp.desc()).limit(limit)
    
    messages = session.exec(statement).all()
    
    # Mark messages as read
    for message in messages:
        if message.receiver_id == current_user.id and not message.read_status:
            message.read_status = True
            session.add(message)
    
    session.commit()
    return list(reversed(messages))  # Return in chronological order

@router.put("/{message_id}/read")
async def mark_message_read(
    message_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    message = session.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if message.receiver_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    message.read_status = True
    session.add(message)
    session.commit()
    return {"message": "Message marked as read"}