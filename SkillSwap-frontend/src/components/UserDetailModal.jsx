import React, { useState } from "react";
import { X, Star, MessageSquare, UserPlus } from "lucide-react";
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

  // 🟣 Start Chat
  const handleChat = () => {
    if (isOwner) return alert("You cannot chat with yourself.");
    const roomId = `room_${[currentUser?.id, user.id].sort().join("_")}`;
    onClose();
    navigate(`/chat/${roomId}`);
  };

  // 💌 Add Friend
  const handleFriendRequest = async () => {
    if (isOwner) return alert("You cannot add yourself as a friend.");
    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 700)); // Simulate delay
      setFriendSent(true);
      alert("✅ Friend request sent!");
    } catch (err) {
      console.error("❌ Error sending friend request:", err);
      alert("Failed to send friend request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Exchange Details</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-full p-1 hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="flex items-center space-x-4 border-b pb-4 border-gray-200">
            <img
              src={user.avatar || "/api/placeholder/80/80"}
              alt={user.name}
              className="h-16 w-16 rounded-full border-4 border-purple-200"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1 space-x-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span>{user.rating || 4.8}</span>
                </div>
                <span>•</span>
                <div>Level {user.level || 1}</div>
                <span>•</span>
                <div>{user.location || "Unknown"}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {user.bio || "No bio provided yet."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                Offering
              </h4>
              <div className="bg-green-100 text-green-800 p-3 rounded-lg text-lg font-semibold">
                {skill_offered}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                Looking For
              </h4>
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-lg font-semibold">
                {skill_wanted}
              </div>
            </div>
          </div>

          <p className="text-gray-700">{description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {(tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Availability</h4>
              <p className="text-gray-600">
                {(availability || []).join(", ") || "Flexible"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Session Type</h4>
              <p className="text-gray-600">
                {(session_type || []).join(", ") || "Online / In-person"}
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 Footer - always visible at bottom */}
        {!isOwner && (
          <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3 sticky bottom-0">
            <button
              onClick={handleFriendRequest}
              disabled={friendSent || isSubmitting}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium ${
                friendSent
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <UserPlus size={18} className="mr-2" />
              {friendSent ? "Friend Request Sent" : "Add Friend"}
            </button>

            <button
              onClick={handleChat}
              className="flex items-center px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
            >
              <MessageSquare size={18} className="mr-2" />
              Chat Now
            </button>
            
          </div>

        )}
      </div>
    </div>
  );
};

export default UserDetailModal;
