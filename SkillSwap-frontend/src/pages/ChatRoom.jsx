import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useWebSocket } from "../hooks/useWebSocket";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [partner, setPartner] = useState(null);
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("skillswap_access_token");
  const wsUrl = `ws://localhost:8000/api/chat/ws/${roomId}?token=${token}`;
  const { lastMessage, sendMessage, readyState } = useWebSocket(wsUrl);

  // Derive partner ID from roomId
  useEffect(() => {
    const ids = roomId.replace("room_", "").split("_").map(Number);
    const partnerId = ids.find((id) => id !== user.id);
    if (partnerId) {
      api.get(`/api/users/${partnerId}`).then((res) => setPartner(res.data));
    }
  }, [roomId, user.id]);

  // Load message history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/api/chat/history/${roomId}`);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("❌ Failed to load chat history:", err);
      }
    };
    fetchHistory();
  }, [roomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle WebSocket messages
  useEffect(() => {
    if (!lastMessage) return;
    const data = JSON.parse(lastMessage.data);
    if (data.type === "history") {
      setMessages(data.messages);
    } else if (data.type === "message") {
      setMessages((prev) => [...prev, data]);
    }
  }, [lastMessage]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msg = {
      sender_id: user.id,
      content: input.trim(),
      message_type: "text",
    };

    sendMessage(JSON.stringify(msg));
    setInput("");
  };

  if (!token)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-center text-red-500 text-lg font-medium">
          ⚠️ Please log in to use chat.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-2 hover:bg-purple-500/30 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        {partner ? (
          <div className="flex items-center space-x-3">
            <img
              src={partner.avatar || "/api/placeholder/40/40"}
              alt={partner.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-semibold text-lg">{partner.name}</h2>
              <p className="text-xs text-slate-200">Online</p>
            </div>
          </div>
        ) : (
          <div className="text-sm animate-pulse">Loading...</div>
        )}
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender_id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow ${
                msg.sender_id === user.id
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-200 border border-slate-700"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs text-slate-400 block mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 flex items-center border-t border-slate-800 bg-slate-850"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="ml-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
