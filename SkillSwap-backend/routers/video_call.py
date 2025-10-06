from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
import json

from websocket_manager import manager

router = APIRouter()

@router.websocket("/ws/{room_id}")
async def video_call_websocket(
    websocket: WebSocket,
    room_id: str,
    token: str = Query(...)
):
    """WebSocket endpoint for WebRTC video call signaling"""
    await manager.connect(websocket, room_id)
    
    try:
        # Notify others that user joined
        await manager.broadcast(
            room_id,
            {
                "type": "user-joined",
                "message": f"User joined room {room_id}"
            },
            exclude=websocket
        )
        
        while True:
            data = await websocket.receive_text()
            signal_data = json.loads(data)
            
            # Broadcast signaling data to other users in room
            await manager.broadcast(
                room_id,
                signal_data,
                exclude=websocket
            )
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
        await manager.broadcast(
            room_id,
            {
                "type": "user-left",
                "message": f"User left room {room_id}"
            }
        )