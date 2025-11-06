import React from "react";
import { MessageSquare } from "lucide-react";

/**
 * ConversationCard Component
 * 
 * Props:
 * - partner: { id, name, avatar }
 * - lastMessage: string
 * - timestamp: ISO string or null
 * - unreadCount: number
 * - roomId: string
 * - onClick: function (called when the card is clicked)
 */

const ConversationCard = ({
  partner,
  lastMessage,
  timestamp,
  unreadCount,
  onClick,
}) => {
  const timeString = timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700 transition duration-300 group"
    >
      {/* Avatar + Name + Message */}
      <div className="flex items-center space-x-3 overflow-hidden">
        <img
          src={partner?.avatar || "/api/placeholder/50/50"}
          alt={partner?.name || "User"}
          className="w-12 h-12 rounded-full object-cover border border-slate-600"
        />
        <div className="flex flex-col text-left overflow-hidden">
          <span className="font-semibold text-slate-100 truncate max-w-[180px]">
            {partner?.name || "Unknown User"}
          </span>
          <span className="text-sm text-slate-400 truncate max-w-[200px]">
            {lastMessage ? lastMessage : "Start a new conversation"}
          </span>
        </div>
      </div>

      {/* Right Section — Time + Badge */}
      <div className="flex flex-col items-end ml-3">
        {timestamp && (
          <span className="text-xs text-slate-400 mb-1">{timeString}</span>
        )}

        {unreadCount > 0 ? (
          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        ) : (
          <MessageSquare className="text-slate-500 group-hover:text-slate-300 h-5 w-5" />
        )}
      </div>
    </button>
  );
};

export default ConversationCard;
