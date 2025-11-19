import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatRoom from "./ChatRoom";
import { useAuth } from "../context/AuthContext";

const ChatLayout = () => {
  const { user } = useAuth();
  const { roomId } = useParams();
  const [activeRoomId, setActiveRoomId] = useState(roomId || null);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveRoomId(roomId || null);
  }, [roomId]);

  const handleSelectRoom = (roomId) => {
    setActiveRoomId(roomId);
    navigate(`/app/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-700 bg-slate-800/40">
        <ChatList activeRoomId={activeRoomId} onSelectRoom={handleSelectRoom} />
      </div>

      {/* Chat Area — full height, starts right after sidebar */}
      <div className="flex-1 flex flex-col bg-slate-900">
        {activeRoomId ? (
          <ChatRoom />
        ) : (
          <div className="flex flex-1 items-center justify-center text-slate-400">
            💬 Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
