// import React, { useState } from "react";
// import { X, Star, MessageSquare, UserPlus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axios";

// const UserDetailModal = ({ listing, onClose }) => {
//   const { user: currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [friendSent, setFriendSent] = useState(false);

//   if (!listing) return null;

//   const {
//     user,
//     skill_offered,
//     skill_wanted,
//     description,
//     tags,
//     availability,
//     session_type,
//   } = listing;

//   const isOwner = currentUser?.id === user?.id;

//   // 🟣 Start Chat
//   const handleChatNow = async (partnerId) => {
//     try {
//       const res = await api.post("/api/chat/start", { user_id: partnerId });
//       navigate(`/chat/${res.data.room_id}`);
//     } catch (err) {
//       console.error("❌ Failed to start chat:", err);
//     }
//   };

//   // 💌 Add Friend
//   const handleFriendRequest = async () => {
//     if (isOwner) return alert("You cannot add yourself as a friend.");
//     try {
//       setIsSubmitting(true);
//       await new Promise((r) => setTimeout(r, 700)); // Simulate delay
//       setFriendSent(true);
//       alert("✅ Friend request sent!");
//     } catch (err) {
//       console.error("❌ Error sending friend request:", err);
//       alert("Failed to send friend request");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="p-5 border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
//           <h2 className="text-2xl font-semibold">Exchange Details</h2>
//           <button
//             onClick={onClose}
//             className="text-white/80 hover:text-white rounded-full p-1 hover:bg-white/10"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-grow overflow-y-auto p-6 space-y-6">
//           <div className="flex items-center space-x-4 border-b pb-4 border-gray-200">
//             <img
//               src={user.avatar || "/api/placeholder/80/80"}
//               alt={user.name}
//               className="h-16 w-16 rounded-full border-4 border-purple-200"
//             />
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
//               <div className="flex items-center text-sm text-gray-600 mt-1 space-x-3">
//                 <div className="flex items-center">
//                   <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
//                   <span>{user.rating || 4.8}</span>
//                 </div>
//                 <span>•</span>
//                 <div>Level {user.level || 1}</div>
//                 <span>•</span>
//                 <div>{user.location || "Unknown"}</div>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 {user.bio || "No bio provided yet."}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
//                 Offering
//               </h4>
//               <div className="bg-green-100 text-green-800 p-3 rounded-lg text-lg font-semibold">
//                 {skill_offered}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
//                 Looking For
//               </h4>
//               <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-lg font-semibold">
//                 {skill_wanted}
//               </div>
//             </div>
//           </div>

//           <p className="text-gray-700">{description}</p>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
//             <div>
//               <h4 className="font-semibold text-gray-700 mb-1">Tags</h4>
//               <div className="flex flex-wrap gap-2">
//                 {(tags || []).map((tag) => (
//                   <span
//                     key={tag}
//                     className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-700 mb-1">Availability</h4>
//               <p className="text-gray-600">
//                 {(availability || []).join(", ") || "Flexible"}
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-700 mb-1">Session Type</h4>
//               <p className="text-gray-600">
//                 {(session_type || []).join(", ") || "Online / In-person"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 🔥 Footer - always visible at bottom */}
//         {!isOwner && (
//           <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3 sticky bottom-0">
//             <button
//               onClick={handleFriendRequest}
//               disabled={friendSent || isSubmitting}
//               className={`flex items-center px-5 py-2.5 rounded-lg font-medium ${
//                 friendSent
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//               }`}
//             >
//               <UserPlus size={18} className="mr-2" />
//               {friendSent ? "Friend Request Sent" : "Add Friend"}
//             </button>

//             <button
//               onClick={() => handleChatNow(user.id)} // ✅ or selectedUser.id if that's your variable
//               className="w-full mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
//             >
//               💬 Chat Now
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetailModal;


import React, { useState } from "react";
import { X, Star, MessageSquare, UserPlus, MapPin, Calendar, Clock, Sparkles, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const UserDetailModal = ({ listing, onClose }) => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [friendSent, setFriendSent] = useState(false);

  if (!listing) return null;

  const {
    user,
    skill_offered,
    skill_wanted,
    description,
    tags,
    availability,
    session_type,
  } = listing;

  const isOwner = currentUser?.id === user?.id;

  // Start Chat
  const handleChatNow = async (partnerId) => {
    try {
      const res = await api.post("/api/chat/start", { user_id: partnerId });
      navigate(`/chat/${res.data.room_id}`);
    } catch (err) {
      console.error("Failed to start chat:", err);
    }
  };

  // Add Friend
  const handleFriendRequest = async () => {
    if (isOwner) return alert("You cannot add yourself as a friend.");
    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 700));
      setFriendSent(true);
    } catch (err) {
      console.error("Error sending friend request:", err);
      alert("Failed to send friend request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden animate-scaleIn border-2 border-purple-100">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <h2 className="text-2xl font-bold">Exchange Details</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={user.avatar || "https://i.pravatar.cc/80"}
                  alt={user.name}
                  className="h-20 w-20 rounded-full border-4 border-purple-200 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full p-1.5 border-2 border-white shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold">{user.rating || 4.8}</span>
                  </div>
                  <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-semibold">
                    Level {user.level || 1}
                  </div>
                  {user.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {user.bio || "No bio provided yet."}
                </p>
              </div>
            </div>
          </div>

          {/* Skills Exchange Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-br from-green-400 to-emerald-400 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wide">
                  Offering
                </h4>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 p-4 rounded-xl text-lg font-bold border-2 border-green-200">
                {skill_offered}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wide">
                  Looking For
                </h4>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 p-4 rounded-xl text-lg font-bold border-2 border-blue-200">
                {skill_wanted}
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                About This Exchange
              </h4>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tags */}
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {(tags || []).length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium border border-purple-200"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No tags</span>
                )}
              </div>
            </div>
            
            {/* Availability */}
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                Availability
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {(availability || []).length > 0 
                  ? availability.join(", ") 
                  : "Flexible"}
              </p>
            </div>
            
            {/* Session Type */}
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                Session Type
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {(session_type || []).length > 0 
                  ? session_type.join(", ") 
                  : "Online / In-person"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {!isOwner && (
          <div className="p-6 bg-white border-t-2 border-gray-100 sticky bottom-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleFriendRequest}
                disabled={friendSent || isSubmitting}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  friendSent
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:scale-105 hover:shadow-lg"
                }`}
              >
                {friendSent ? (
                  <>
                    <CheckCircle size={20} className="mr-2" />
                    Friend Request Sent
                  </>
                ) : (
                  <>
                    <UserPlus size={20} className="mr-2" />
                    {isSubmitting ? "Sending..." : "Add Friend"}
                  </>
                )}
              </button>

              <button
                onClick={() => handleChatNow(user.id)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                <MessageSquare size={20} className="mr-2 group-hover:rotate-12 transition-transform" />
                Start Chat
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserDetailModal;