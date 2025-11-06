import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import api from "../api/axios";

const ChatList = ({ activeRoomId, onSelectRoom }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/api/chat/conversations");
      setConversations(res.data || []);
    } catch (err) {
      console.error("❌ Failed to load conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <h1 className="text-xl font-bold">Chats</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <p className="text-slate-400 text-center mt-10">Loading...</p>
        ) : conversations.length === 0 ? (
          <p className="text-slate-500 text-center mt-10">
            No conversations yet. <br /> Start chatting from Skill Exchange!
          </p>
        ) : (
          conversations.map((chat) => (
            <button
              key={chat.room_id}
              onClick={() => onSelectRoom(chat.room_id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
                activeRoomId === chat.room_id
                  ? "bg-purple-600/30 border-purple-500"
                  : "bg-slate-800/40 border-slate-700 hover:bg-slate-800/70"
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={chat.partner.avatar || "/api/placeholder/50/50"}
                  alt={chat.partner.name}
                  className="w-10 h-10 rounded-full border border-slate-600 object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-slate-100">
                    {chat.partner.name}
                  </p>
                  <p className="text-sm text-slate-400 truncate max-w-[150px]">
                    {chat.last_message || "Start chatting..."}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <MessageSquare
                  size={18}
                  className={`${
                    activeRoomId === chat.room_id
                      ? "text-purple-400"
                      : "text-slate-500"
                  }`}
                />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
