// // src/hooks/useWebSocket.js
// import { useEffect, useRef, useState, useCallback } from 'react';

// export const useWebSocket = (url, reconnectInterval = 2000) => {
//   const [socket, setSocket] = useState(null);
//   const [lastMessage, setLastMessage] = useState(null);
//   const [readyState, setReadyState] = useState(WebSocket.CLOSED);
//   const reconnectTimeout = useRef(null);

//   const connect = useCallback(() => {
//     if (!url) return;

//     const ws = new WebSocket(url);
//     ws.onopen = () => {
//       setSocket(ws);
//       setReadyState(ws.readyState);
//       console.log("✅ WebSocket connected:", url);
//     };

//     ws.onmessage = (event) => setLastMessage(event);

//     ws.onclose = (event) => {
//       console.warn("⚠️ WebSocket closed:", event.code, event.reason);
//       setSocket(null);
//       setReadyState(WebSocket.CLOSED);

//       // Only reconnect if user didn’t manually close it
//       if (event.code !== 1000 && event.code !== 1001) {
//         reconnectTimeout.current = setTimeout(connect, reconnectInterval);
//       }
//     };

//     ws.onerror = (err) => {
//       console.error("❌ WebSocket error:", err);
//       ws.close();
//     };
//   }, [url, reconnectInterval]);

//   useEffect(() => {
//     connect();
//     return () => {
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.close(1000, "Component unmounted"); // 👈 graceful close
//       }
//     };
//   }, [connect]);

//   const sendMessage = useCallback(
//     (message) => {
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(message);
//       } else {
//         console.warn("⚠️ WebSocket not open. Message not sent.");
//       }
//     },
//     [socket]
//   );

//   return { socket, lastMessage, readyState, sendMessage };
// };


// src/hooks/useWebSocket.js
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * A robust WebSocket hook for FastAPI real-time chat
 * Features:
 * - Auto reconnect
 * - Heartbeat ping
 * - Graceful close
 * - Connection status tracking
 */
export const useWebSocket = (url, reconnectInterval = 3000) => {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(WebSocket.CLOSED);

  const reconnectTimeout = useRef(null);
  const heartbeatInterval = useRef(null);
  const manualClose = useRef(false);

  // 🧩 Setup connection
  const connect = useCallback(() => {
    if (!url) return;

    console.log("🔄 Connecting WebSocket:", url);
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("✅ WebSocket connected:", url);
      setSocket(ws);
      setReadyState(ws.readyState);

      // 💓 Start heartbeat ping every 25s (Render keeps idle sockets ~30s)
      heartbeatInterval.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "ping" }));
        }
      }, 25000);
    };

    ws.onmessage = (event) => {
      setLastMessage(event);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
      ws.close();
    };

    ws.onclose = (event) => {
      console.warn(
        `⚠️ WebSocket closed (code ${event.code}) reason: ${event.reason}`
      );
      setSocket(null);
      setReadyState(WebSocket.CLOSED);
      clearInterval(heartbeatInterval.current);

      // 👇 Reconnect if it wasn't a manual close or normal shutdown
      if (!manualClose.current && event.code !== 1000 && event.code !== 1001) {
        reconnectTimeout.current = setTimeout(connect, reconnectInterval);
      }
    };
  }, [url, reconnectInterval]);

  // 🧩 Auto-connect on mount / reconnect
  useEffect(() => {
    manualClose.current = false;
    connect();

    return () => {
      manualClose.current = true;
      clearTimeout(reconnectTimeout.current);
      clearInterval(heartbeatInterval.current);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close(1000, "Component unmounted");
      }
    };
  }, [connect]);

  // 🧩 Send message safely
  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        console.warn("⚠️ WebSocket not open. Message not sent.");
      }
    },
    [socket]
  );

  // 🧩 Manual close (optional, for debugging)
  const closeSocket = useCallback(() => {
    manualClose.current = true;
    if (socket) socket.close(1000, "Closed manually");
  }, [socket]);

  return {
    socket,
    lastMessage,
    readyState,
    sendMessage,
    closeSocket,
  };
};
