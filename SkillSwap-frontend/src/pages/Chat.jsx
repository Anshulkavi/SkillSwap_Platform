// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../hooks/useWebSocket';
import axios from 'axios';

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Only connect WebSocket if user is available
const wsUrl = `ws://127.0.0.1:8000/ws/chat/${user.id}`; // NO trailing slash
  const { sendMessage, lastMessage } = useWebSocket(wsUrl);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('/api/chat/conversations');
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.conversations)
          ? response.data.conversations
          : [];
        setConversations(data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Auto-select user if URL param changes
  useEffect(() => {
    if (userId && parseInt(userId) !== selectedUser?.id) {
      selectUser(parseInt(userId));
    }
  }, [userId]);

  // Append incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const messageData = JSON.parse(lastMessage.data);
        if (messageData.type === 'message') {
          setMessages(prev => Array.isArray(prev) ? [...prev, messageData] : [messageData]);
          scrollToBottom();
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    }
  }, [lastMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Select a conversation/user
  const selectUser = async (userId) => {
    try {
      const userResponse = await axios.get(`/api/users/${userId}`);
      setSelectedUser(userResponse.data);

      const messagesResponse = await axios.get(`/api/chat/${userId}`);
      const msgs = Array.isArray(messagesResponse.data) ? messagesResponse.data : [];
      setMessages(msgs);

      navigate(`/chat/${userId}`);
    } catch (error) {
      console.error('Failed to fetch user or messages:', error);
    }
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      text: newMessage.trim(),
    };

    sendMessage(JSON.stringify(messageData));

    setMessages(prev => Array.isArray(prev) ? [...prev, {
      ...messageData,
      timestamp: new Date().toISOString(),
      sender: user
    }] : [{
      ...messageData,
      timestamp: new Date().toISOString(),
      sender: user
    }]);

    setNewMessage('');
  };

  // Start video call
  const startVideoCall = () => {
    if (!selectedUser) return;
    const roomId = `${Math.min(user.id, selectedUser.id)}-${Math.max(user.id, selectedUser.id)}`;
    navigate(`/video/${roomId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conversations Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Array.isArray(conversations) && conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No conversations yet
            </div>
          ) : (
            Array.isArray(conversations) && conversations.map((conv, index) => (
              <div
                key={index}
                onClick={() => selectUser(conv.user.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === conv.user.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{conv.user.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {conv.last_message?.text || ''}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    {conv.unread_count > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 mb-1">
                        {conv.unread_count}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {conv.last_message?.timestamp ? new Date(conv.last_message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                {selectedUser.location && (
                  <p className="text-sm text-gray-500">{selectedUser.location}</p>
                )}
              </div>
              <button
                onClick={startVideoCall}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Start Video Call
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 chat-scroll">
              <div className="space-y-4">
                {Array.isArray(messages) && messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ''}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-lg">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
