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
//     setReadyState(ws.readyState);

//     ws.onopen = () => {
//       setSocket(ws);
//       setReadyState(ws.readyState);
//       console.log('WebSocket connected:', url);
//     };

//     ws.onmessage = (event) => {
//       setLastMessage(event);
//     };

//     ws.onclose = () => {
//       setSocket(null);
//       setReadyState(WebSocket.CLOSED);
//       console.warn('WebSocket closed. Reconnecting in', reconnectInterval, 'ms...');
//       reconnectTimeout.current = setTimeout(connect, reconnectInterval);
//     };

//     ws.onerror = (err) => {
//       console.error('WebSocket error:', err);
//       ws.close(); // trigger reconnect
//     };
//   }, [url, reconnectInterval]);

//   useEffect(() => {
//     connect();
//     return () => {
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       socket?.close();
//     };
//   }, [connect]);

//   const sendMessage = useCallback(
//     (message) => {
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(message);
//       } else {
//         console.warn('WebSocket not open. Message not sent.');
//       }
//     },
//     [socket]
//   );

//   return {
//     socket,
//     lastMessage,
//     readyState,
//     sendMessage
//   };
// };


// src/hooks/useWebSocket.js
import { useEffect, useRef, useState, useCallback } from 'react';

export const useWebSocket = (url, reconnectInterval = 2000) => {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(WebSocket.CLOSED);
  const reconnectTimeout = useRef(null);

  const connect = useCallback(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    ws.onopen = () => {
      setSocket(ws);
      setReadyState(ws.readyState);
      console.log("✅ WebSocket connected:", url);
    };

    ws.onmessage = (event) => setLastMessage(event);

    ws.onclose = (event) => {
      console.warn("⚠️ WebSocket closed:", event.code, event.reason);
      setSocket(null);
      setReadyState(WebSocket.CLOSED);

      // Only reconnect if user didn’t manually close it
      if (event.code !== 1000 && event.code !== 1001) {
        reconnectTimeout.current = setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
      ws.close();
    };
  }, [url, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close(1000, "Component unmounted"); // 👈 graceful close
      }
    };
  }, [connect]);

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

  return { socket, lastMessage, readyState, sendMessage };
};
