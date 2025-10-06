// src/pages/VideoDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import api from '../api/axios';
import { ArrowLeft, Eye, Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await api.get(`/api/videos/${videoId}`);
  //       setVideo(response.data);
  //     } catch (err) {
  //       const errorMessage = err.response?.data?.detail || "Failed to load video.";
  //       setError(errorMessage);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVideo();
  // }, [videoId]);

  useEffect(() => {
  const fetchVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/videos/${videoId}`);
      console.log("Video data:", response.data);   // 👈 Add this
      setVideo(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Failed to load video.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  fetchVideo();
}, [videoId]);

  const handleLike = async () => {
    if (!user || !video) return;
    try {
      setVideo(prevVideo => ({ ...prevVideo, likes: prevVideo.likes + 1 }));
      await api.post(`/api/videos/${video.id}/like`);
    } catch (err) {
      console.error("Failed to like the video", err);
      setVideo(prevVideo => ({ ...prevVideo, likes: prevVideo.likes - 1 }));
    }
  };

  const isOwner = user && video && user.id === video.user.id;

  const handleDelete = async () => {
    if (!isOwner) return;
    if (window.confirm("Are you sure you want to permanently delete this video?")) {
      try {
        await api.delete(`/api/videos/${videoId}`);
        alert("Video deleted successfully.");
        navigate('/videos');
      } catch (err) {
        console.error("Failed to delete video:", err);
        alert("Could not delete the video. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading Video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!video) {
    return <div className="text-center p-10">Video not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/videos" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 font-medium">
        <ArrowLeft size={18} className="mr-2" />
        Back to all videos
      </Link>

<div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-lg mb-6">
  <video 
    src={video.video_url} 
    controls 
    width="100%" 
    height="100%" 
    style={{ borderRadius: "8px" }}
  />
</div>


      <div>
        <h1 className="text-3xl font-bold text-gray-900">{video.title}</h1>
        <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>by <Link to={`/profile/${video.user.id}`} className="font-medium text-gray-800 hover:text-purple-600">{video.user.name}</Link></span>
            <span>•</span>
            <span className="flex items-center"><Eye size={16} className="mr-1.5" /> {video.views.toLocaleString()} views</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleLike} 
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:border-red-400 hover:text-red-500 transition-colors"
            >
              <Heart size={16} /> 
              <span>{video.likes.toLocaleString()}</span>
            </button>

            {isOwner && (
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 border border-transparent rounded-lg text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">{video.category}</span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{video.level}</span>
        </div>

        <p className="mt-6 text-gray-700 whitespace-pre-wrap border-t pt-4">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoDetailPage;