// import React, { useEffect, useState } from "react";
// import { MessageSquare } from "lucide-react";
// import api from "../api/axios";

// const ChatList = ({ activeRoomId, onSelectRoom }) => {
//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchConversations = async () => {
//     try {
//       const res = await api.get("/api/chat/conversations");
//       setConversations(res.data || []);
//     } catch (err) {
//       console.error("❌ Failed to load conversations:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   return (
//     <div className="h-full flex flex-col bg-slate-900 text-white">
//       {/* Header */}
//       <div className="p-4 border-b border-slate-700 bg-slate-800">
//         <h1 className="text-xl font-bold">Chats</h1>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-2">
//         {loading ? (
//           <p className="text-slate-400 text-center mt-10">Loading...</p>
//         ) : conversations.length === 0 ? (
//           <p className="text-slate-500 text-center mt-10">
//             No conversations yet. <br /> Start chatting from Skill Exchange!
//           </p>
//         ) : (
//           conversations.map((chat) => (
//             <button
//               key={chat.room_id}
//               onClick={() => onSelectRoom(chat.room_id)}
//               className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
//                 activeRoomId === chat.room_id
//                   ? "bg-purple-600/30 border-purple-500"
//                   : "bg-slate-800/40 border-slate-700 hover:bg-slate-800/70"
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={chat.partner.avatar || "/api/placeholder/50/50"}
//                   alt={chat.partner.name}
//                   className="w-10 h-10 rounded-full border border-slate-600 object-cover"
//                 />
//                 <div className="text-left">
//                   <p className="font-semibold text-slate-100">
//                     {chat.partner.name}
//                   </p>
//                   <p className="text-sm text-slate-400 truncate max-w-[150px]">
//                     {chat.last_message || "Start chatting..."}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <MessageSquare
//                   size={18}
//                   className={`${
//                     activeRoomId === chat.room_id
//                       ? "text-purple-400"
//                       : "text-slate-500"
//                   }`}
//                 />
//               </div>
//             </button>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatList;


import React, { useEffect, useState } from "react";
import { MessageSquare, Search, Sparkles } from "lucide-react";
import api from "../api/axios";

const ChatList = ({ activeRoomId, onSelectRoom }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filtered = conversations.filter(chat =>
    chat.partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
<div className="h-full flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 border-r-2 border-purple-100 pt-16">

      {/* 🔥 Header */}
      <div className="p-6 border-b-2 border-purple-200 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
          <MessageSquare className="h-6 w-6" />
          Chats
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/90 border-2 border-white rounded-xl text-gray-700 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all shadow"
          />
        </div>
      </div>

      {/* 🔥 Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-purple-50/40 to-blue-50/40">

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fadeInUp">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-purple-600 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading chats...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 animate-fadeInUp">
            <div className="bg-gradient-to-br from-purple-200 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
              <MessageSquare className="h-10 w-10 text-purple-700" />
            </div>
            <p className="text-gray-700 font-semibold">
              {searchQuery ? "No chats found" : "No conversations yet"}
            </p>
            <p className="text-gray-500 text-sm">
              {searchQuery ? "Try a different name" : "Start chatting from SkillExchange!"}
            </p>
          </div>
        ) : (
          filtered.map((chat, index) => (
            <button
              key={chat.room_id}
              onClick={() => onSelectRoom(chat.room_id)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 backdrop-blur-md transition-all 
              duration-300 hover:scale-[1.02] animate-fadeInUp shadow-sm ${
                activeRoomId === chat.room_id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 text-white shadow-xl"
                  : "bg-white/80 border-gray-200 hover:border-purple-300 hover:shadow-lg"
              }`}
            >
              
              {/* Avatar + Online Badge */}
              <div className="relative">
                <img
                  src={chat.partner.avatar || "https://i.pravatar.cc/100"}
                  className="w-12 h-12 rounded-full border-2 border-purple-200 object-cover shadow"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 text-left">
                <p
                  className={`font-semibold truncate ${
                    activeRoomId === chat.room_id ? "text-white" : "text-gray-900"
                  }`}
                >
                  {chat.partner.name}
                </p>
                <p
                  className={`text-sm truncate ${
                    activeRoomId === chat.room_id ? "text-purple-100" : "text-gray-500"
                  }`}
                >
                  {chat.last_message || "Start chatting..."}
                </p>
              </div>

              {/* Icon */}
              <MessageSquare
                size={20}
                className={`${
                  activeRoomId === chat.room_id ? "text-white" : "text-purple-400"
                }`}
              />
            </button>
          ))
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatList;
