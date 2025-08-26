// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(0);

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setSocket(ws);
      setReadyState(ws.readyState);
    };
    
    ws.onmessage = (event) => {
      setLastMessage(event);
    };
    
    ws.onclose = () => {
      setSocket(null);
      setReadyState(WebSocket.CLOSED);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return {
    socket,
    lastMessage,
    readyState,
    sendMessage
  };
};
