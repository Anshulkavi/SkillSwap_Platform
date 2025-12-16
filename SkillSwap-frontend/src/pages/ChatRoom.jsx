// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Send, ArrowLeft, MoreVertical, Smile, Paperclip, Sparkles } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useWebSocket } from "../hooks/useWebSocket";
// import api from "../api/axios";

// const ChatRoom = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [partner, setPartner] = useState(null);
//   const chatEndRef = useRef(null);

//   const token = localStorage.getItem("skillswap_access_token");
//   const wsBase = import.meta.env.MODE === "development"
//     ? "ws://localhost:8000"
//     : "wss://skillswap-backend-rnr8.onrender.com";
//   const wsUrl = `${wsBase}/api/chat/ws/${roomId}?token=${token}`;

//   const { lastMessage, sendMessage } = useWebSocket(wsUrl);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await api.get(`/api/chat/history/${roomId}`);
//         setMessages(res.data.messages);

//         const ids = roomId.replace("room_", "").split("_").map(Number);
//         const partnerId = ids.find((id) => id !== user.id);
//         const userRes = await api.get(`/api/users/${partnerId}`);
//         setPartner(userRes.data);
//       } catch (err) {
//         console.error("Error loading chat:", err);
//       }
//     };
//     fetchHistory();
//   }, [roomId, user.id]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     if (!lastMessage) return;
//     const data = JSON.parse(lastMessage.data);
//     if (data.type === "history") {
//       setMessages(data.messages);
//     } else if (data.type === "message") {
//       setMessages((prev) => [...prev, data]);
//     }
//   }, [lastMessage]);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const msg = {
//       sender_id: user.id,
//       content: input.trim(),
//       message_type: "text",
//     };
//     sendMessage(JSON.stringify(msg));
//     setInput("");
//   };

//   if (!token) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
//         <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-red-200 text-center">
//           <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-3xl">⚠️</span>
//           </div>
//           <p className="text-red-600 font-semibold text-lg">You must be logged in to chat.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
// <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-16">
//       {/* Header */}
//       <header className="flex-shrink-0 bg-white border-b-2 border-purple-100 shadow-sm">
//         <div className="flex items-center justify-between p-4">
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110"
//             >
//               <ArrowLeft size={20} className="text-gray-700" />
//             </button>

//             {partner ? (
//               <div className="flex items-center space-x-3">
//                 <div className="relative">
//                   <img
//                     src={partner.avatar || "https://i.pravatar.cc/40"}
//                     alt={partner.name}
//                     className="w-12 h-12 rounded-full border-2 border-purple-300 shadow-lg"
//                   />
//                   <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-gray-900 text-lg">{partner.name}</h2>
//                   <p className="text-xs text-green-600 flex items-center gap-1">
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                     Online
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
//                 <div>
//                   <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//                   <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <button className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300">
//             <MoreVertical size={20} className="text-gray-600" />
//           </button>
//         </div>
//       </header>

//       {/* Chat Messages */}
//       <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-purple-50/30 to-blue-50/30">
//         {messages.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-center">
//             <div className="bg-white rounded-full p-6 shadow-lg mb-4">
//               <Sparkles className="h-12 w-12 text-purple-600 animate-pulse" />
//             </div>
//             <p className="text-gray-600 font-medium text-lg">Start your conversation!</p>
//             <p className="text-gray-500 text-sm">Send a message to begin</p>
//           </div>
//         ) : (
//           messages.map((msg, index) => {
//             const isMe = msg.sender_id === user.id;
//             const showAvatar = index === 0 || messages[index - 1].sender_id !== msg.sender_id;

//             return (
//               <div
//                 key={index}
//                 className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"} animate-fadeInUp`}
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 {!isMe && showAvatar && (
//                   <img
//                     src={partner?.avatar || "https://i.pravatar.cc/32"}
//                     alt="Partner"
//                     className="w-8 h-8 rounded-full border-2 border-purple-200 flex-shrink-0"
//                   />
//                 )}
//                 {!isMe && !showAvatar && <div className="w-8"></div>}

//                 <div
//                   className={`group relative max-w-xs md:max-w-md ${
//                     isMe
//                       ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl rounded-br-md"
//                       : "bg-white text-gray-800 border-2 border-purple-100 rounded-2xl rounded-bl-md"
//                   } px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300`}
//                 >
//                   <p className="break-words text-sm leading-relaxed">{msg.content}</p>
//                   <span className={`block text-[10px] mt-1.5 ${isMe ? 'text-purple-100' : 'text-gray-400'}`}>
//                     {new Date(msg.timestamp).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                 </div>

//                 {isMe && showAvatar && (
//                   <img
//                     src={user?.avatar || "https://i.pravatar.cc/32"}
//                     alt="You"
//                     className="w-8 h-8 rounded-full border-2 border-purple-300 flex-shrink-0"
//                   />
//                 )}
//                 {isMe && !showAvatar && <div className="w-8"></div>}
//               </div>
//             );
//           })
//         )}
//         <div ref={chatEndRef} />
//       </main>

//       {/* Input Area */}
//       <div className="flex-shrink-0 bg-white border-t-2 border-purple-100 p-4 shadow-lg">
//         <div className="flex items-center gap-3">
//           <button className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110">
//             <Paperclip size={20} className="text-gray-600" />
//           </button>

//           <div className="flex-1 relative">
//             <input
//               type="text"
//               className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
//             />
//             <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-purple-50 rounded-lg transition-all duration-300">
//               <Smile size={20} className="text-gray-400" />
//             </button>
//           </div>

//           <button
//             onClick={handleSend}
//             disabled={!input.trim()}
//             className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.4s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatRoom;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Send,
  ArrowLeft,
  MoreVertical,
  Smile,
  Paperclip,
  Sparkles,
} from "lucide-react";
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
  const [dealDone, setDealDone] = useState(false);

  const chatEndRef = useRef(null);

  const token = localStorage.getItem("skillswap_access_token");

  /* ---------------- DEAL DONE (persisted) ---------------- */
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("accepted_deals") || "[]");
  setDealDone(stored.includes(roomId));
}, [roomId]);

const markDealDone = () => {
  const stored = JSON.parse(localStorage.getItem("accepted_deals") || "[]");
  if (!stored.includes(roomId)) {
    stored.push(roomId);
    localStorage.setItem("accepted_deals", JSON.stringify(stored));
  }
  setDealDone(true);
};

  /* ---------------- WEBSOCKET ---------------- */
  const wsBase =
    import.meta.env.MODE === "development"
      ? "ws://localhost:8000"
      : "wss://skillswap-backend-rnr8.onrender.com";

  const wsUrl =
    roomId && token ? `${wsBase}/api/chat/ws/${roomId}?token=${token}` : null;

  const { lastMessage, sendMessage } = useWebSocket(wsUrl);

  /* ---------------- LOAD CHAT ---------------- */
  useEffect(() => {
    if (!roomId || !user?.id) return;

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/api/chat/history/${roomId}`);
        setMessages(res.data.messages || []);

        const ids = roomId.replace("room_", "").split("_").map(Number);
        const partnerId = ids.find((id) => id !== user.id);

        if (partnerId) {
          const userRes = await api.get(`/api/users/${partnerId}`);
          setPartner(userRes.data);
        }
      } catch (err) {
        console.error("Error loading chat:", err.response?.data || err.message);
      }
    };

    fetchHistory();
  }, [roomId, user]);

  /* ---------------- WS MESSAGE HANDLING ---------------- */
  useEffect(() => {
    if (!lastMessage) return;
    const data = JSON.parse(lastMessage.data);

    if (data.type === "message") {
      setMessages((prev) => [...prev, data]);
    }
  }, [lastMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    sendMessage(
      JSON.stringify({
        sender_id: user.id,
        content: input.trim(),
        message_type: "text",
      })
    );
    setInput("");
  };

  if (!token) return null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-16">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b-2 border-purple-100 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>

            {partner ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={partner.avatar || "https://i.pravatar.cc/40"}
                    alt={partner.name}
                    className="w-12 h-12 rounded-full border-2 border-purple-300 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">
                    {partner.name}
                  </h2>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* DEAL STATUS — NO STYLE CHANGE */}
          {!dealDone ? (
            <button
              onClick={markDealDone}
              className="mr-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow"
            >
              Mark Deal Done
            </button>
          ) : (
            <div className="mr-3 bg-green-100 text-green-800 px-4 py-2 rounded-xl text-sm font-semibold border border-green-300">
              ✅ Deal Completed
            </div>
          )}

          <button className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-purple-50/30 to-blue-50/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-white rounded-full p-6 shadow-lg mb-4">
              <Sparkles className="h-12 w-12 text-purple-600 animate-pulse" />
            </div>
            <p className="text-gray-600 font-medium text-lg">
              Start your conversation!
            </p>
            <p className="text-gray-500 text-sm">Send a message to begin</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender_id === user.id;
            const showAvatar =
              index === 0 || messages[index - 1].sender_id !== msg.sender_id;

            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  isMe ? "justify-end" : "justify-start"
                } animate-fadeInUp`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {!isMe && showAvatar && (
                  <img
                    src={partner?.avatar || "https://i.pravatar.cc/32"}
                    alt="Partner"
                    className="w-8 h-8 rounded-full border-2 border-purple-200 flex-shrink-0"
                  />
                )}

                <div
                  className={`group relative max-w-xs md:max-w-md ${
                    isMe
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl rounded-br-md"
                      : "bg-white text-gray-800 border-2 border-purple-100 rounded-2xl rounded-bl-md"
                  } px-4 py-3 shadow-lg`}
                >
                  <p className="break-words text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input Area */}
      <div className="flex-shrink-0 bg-white border-t-2 border-purple-100 p-4 shadow-lg">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          {/* <button className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110">
            <Paperclip size={20} className="text-gray-600" />
          </button> */}

          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-2xl disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
