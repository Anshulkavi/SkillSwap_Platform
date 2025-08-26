// src/pages/VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const websocket = useRef(null);
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    initializeCall();
    return () => {
      cleanup();
    };
  }, []);

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStream.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      };
      
      peerConnection.current = new RTCPeerConnection(configuration);
      
      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          setIsCallActive(true);
          setIsConnecting(false);
        }
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate && websocket.current) {
          websocket.current.send(JSON.stringify({
            type: 'ice-candidate',
            candidate: event.candidate,
            room: roomId
          }));
        }
      };

      // Initialize WebSocket for signaling
      websocket.current = new WebSocket(`ws://localhost:8000/ws/video/${roomId}`);
      
      websocket.current.onopen = () => {
        console.log('WebSocket connected for video call');
      };

      websocket.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'offer':
            await handleReceiveOffer(data.offer);
            break;
          case 'answer':
            await handleReceiveAnswer(data.answer);
            break;
          case 'ice-candidate':
            await handleReceiveIceCandidate(data.candidate);
            break;
        }
      };

      // Create offer if we're the initiator
      setTimeout(async () => {
        if (peerConnection.current.signalingState === 'stable') {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          
          websocket.current.send(JSON.stringify({
            type: 'offer',
            offer: offer,
            room: roomId
          }));
        }
      }, 1000);

    } catch (error) {
      console.error('Error initializing call:', error);
      setIsConnecting(false);
    }
  };

  const handleReceiveOffer = async (offer) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      
      websocket.current.send(JSON.stringify({
        type: 'answer',
        answer: answer,
        room: roomId
      }));
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleReceiveAnswer = async (answer) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleReceiveIceCandidate = async (candidate) => {
    try {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  };

  const toggleMute = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVideoOff;
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  const endCall = () => {
    cleanup();
    navigate('/chat');
  };

  const cleanup = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
    }
    
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    
    if (websocket.current) {
      websocket.current.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Local Video */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Connection Status */}
        {isConnecting && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Connecting...</p>
            </div>
          </div>
        )}

        {!isCallActive && !isConnecting && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-lg">Waiting for other participant...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMuted ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <span className="text-white">🎤</span>
          </button>
          
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isVideoOff ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <span className="text-white">📹</span>
          </button>
          
          <button
            onClick={endCall}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
          >
            <span className="text-white">📞</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;