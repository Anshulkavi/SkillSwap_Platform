// // src/pages/ChatLayout.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ChatList from "../components/ChatList";
// import ChatRoom from "./ChatRoom";
// import { useAuth } from "../context/AuthContext";

// const ChatLayout = () => {
//   const { user } = useAuth();
//   const { roomId } = useParams();
//   const [activeRoomId, setActiveRoomId] = useState(roomId || null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setActiveRoomId(roomId || null);
//   }, [roomId]);

//   const handleSelectRoom = (roomId) => {
//     setActiveRoomId(roomId);
//     navigate(`/chat/${roomId}`);
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-100 flex">
//       {/* Left: Chat List */}
//       <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-700 bg-slate-800/40">
//         <ChatList activeRoomId={activeRoomId} onSelectRoom={handleSelectRoom} />
//       </div>

//       {/* Right: Chat Room */}
//       <div className="hidden md:flex flex-1 bg-slate-800/30 items-center justify-center">
//         {activeRoomId ? (
//           <ChatRoom />
//         ) : (
//           <div className="text-slate-400 text-center">
//             💬 Select a conversation to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatLayout;


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

  // 🛠 Prevent /chat/undefined URLs
  useEffect(() => {
    if (roomId === "undefined") navigate("/chat", { replace: true });
  }, [roomId, navigate]);

  useEffect(() => {
    setActiveRoomId(roomId || null);
  }, [roomId]);

  const handleSelectRoom = (roomId) => {
    setActiveRoomId(roomId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Left: Chat List */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-700 bg-slate-800/40">
        <ChatList activeRoomId={activeRoomId} onSelectRoom={handleSelectRoom} />
      </div>

      {/* Right: Chat Room */}
      <div className="hidden md:flex flex-1 bg-slate-800/30 items-center justify-center">
        {activeRoomId ? (
          <ChatRoom />
        ) : (
          <div className="text-slate-400 text-center">
            💬 Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
