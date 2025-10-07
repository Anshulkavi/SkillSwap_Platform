from fastapi import WebSocket
from typing import Dict, List
import json

class ConnectionManager:
    """Manages WebSocket connections for chat and video call rooms"""
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket, room_id: str):
        """Accept WebSocket connection and add to room"""
        await websocket.accept()
        
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        
        self.active_connections[room_id].append(websocket)
    
    def disconnect(self, websocket: WebSocket, room_id: str):
        """Remove WebSocket connection from room"""
        if room_id in self.active_connections:
            self.active_connections[room_id].remove(websocket)
            
            if len(self.active_connections[room_id]) == 0:
                del self.active_connections[room_id]
    
    async def send_personal_message(self, message: dict, websocket: WebSocket):
        """Send message to specific WebSocket connection"""
        await websocket.send_json(message)
    
    async def broadcast(self, room_id: str, message: dict, exclude: WebSocket = None):
        """Broadcast message to all connections in a room"""
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                if connection != exclude:
                    try:
                        await connection.send_json(message)
                    except Exception as e:
                        print(f"Error sending message: {e}")
    
    def get_room_size(self, room_id: str) -> int:
        """Get number of active connections in a room"""
        return len(self.active_connections.get(room_id, []))
    
    def get_all_rooms(self) -> List[str]:
        """Get list of all active room IDs"""
        return list(self.active_connections.keys())

# Global connection manager instance
manager = ConnectionManager()