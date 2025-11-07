import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWebSocket } from "../hooks/useWebSocket";
import api from "../api/axios";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [partner, setPartner] = useState(null);
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("skillswap_access_token");
  // const wsUrl = `ws://localhost:8000/api/chat/ws/${roomId}?token=${token}`;

    const wsBase =
  import.meta.env.MODE === "development"
    ? "ws://localhost:8000"
    : "wss://skillswap-backend-rnr8.onrender.com";

const wsUrl = `${wsBase}/api/chat/ws/${roomId}?token=${token}`;

  const { lastMessage, sendMessage } = useWebSocket(wsUrl);

  // Load chat history + peer info
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/api/chat/history/${roomId}`);
        setMessages(res.data.messages);

        // Determine chat partner (id not equal to me)
        const ids = roomId.replace("room_", "").split("_").map(Number);
        const partnerId = ids.find((id) => id !== user.id);
        const userRes = await api.get(`/api/users/${partnerId}`);
        setPartner(userRes.data);
      } catch (err) {
        console.error("Error loading chat:", err);
      }
    };
    fetchHistory();
  }, [roomId, user.id]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle new WebSocket messages
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

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        ⚠️ You must be logged in to chat.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
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
              <p className="text-xs text-gray-200">Online</p>
            </div>
          </div>
        ) : (
          <div className="animate-pulse">Loading chat...</div>
        )}
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, index) => {
          const isMe = msg.sender_id === user.id;
          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-xs md:max-w-md text-sm shadow-sm ${
                  isMe
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                <p className="break-words">{msg.content}</p>
                <span className="block text-[10px] text-gray-300 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </main>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t flex items-center space-x-3"
      >
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
