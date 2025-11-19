// // src/pages/VideoDetailPage.jsx

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom'; 
// import api from '../api/axios';
// import { ArrowLeft, Eye, Heart, Trash2 } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const VideoDetailPage = () => {
//   const { videoId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchVideo = async () => {
//   //     setLoading(true);
//   //     setError(null);
//   //     try {
//   //       const response = await api.get(`/api/videos/${videoId}`);
//   //       setVideo(response.data);
//   //     } catch (err) {
//   //       const errorMessage = err.response?.data?.detail || "Failed to load video.";
//   //       setError(errorMessage);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchVideo();
//   // }, [videoId]);

//   useEffect(() => {
//   const fetchVideo = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get(`/api/videos/${videoId}`);
//       console.log("Video data:", response.data);   // 👈 Add this
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

//   const handleLike = async () => {
//     if (!user || !video) return;
//     try {
//       setVideo(prevVideo => ({ ...prevVideo, likes: prevVideo.likes + 1 }));
//       await api.post(`/api/videos/${video.id}/like`);
//     } catch (err) {
//       console.error("Failed to like the video", err);
//       setVideo(prevVideo => ({ ...prevVideo, likes: prevVideo.likes - 1 }));
//     }
//   };

//   const isOwner = user && video && user.id === video.user.id;

//   const handleDelete = async () => {
//     if (!isOwner) return;
//     if (window.confirm("Are you sure you want to permanently delete this video?")) {
//       try {
//         await api.delete(`/api/videos/${videoId}`);
//         alert("Video deleted successfully.");
//         navigate('/videos');
//       } catch (err) {
//         console.error("Failed to delete video:", err);
//         alert("Could not delete the video. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//           <p className="mt-4 text-gray-600">Loading Video...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center p-10 text-red-500">{error}</div>;
//   }

//   if (!video) {
//     return <div className="text-center p-10">Video not found.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <Link to="/videos" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 font-medium">
//         <ArrowLeft size={18} className="mr-2" />
//         Back to all videos
//       </Link>

// <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-lg mb-6">
//   <video 
//     src={video.video_url} 
//     controls 
//     width="100%" 
//     height="100%" 
//     style={{ borderRadius: "8px" }}
//   />
// </div>


//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">{video.title}</h1>
//         <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
//           <div className="flex items-center space-x-4 text-sm text-gray-500">
//             <span>by <Link to={`/profile/${video.user.id}`} className="font-medium text-gray-800 hover:text-purple-600">{video.user.name}</Link></span>
//             <span>•</span>
//             <span className="flex items-center"><Eye size={16} className="mr-1.5" /> {video.views.toLocaleString()} views</span>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button 
//               onClick={handleLike} 
//               className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:border-red-400 hover:text-red-500 transition-colors"
//             >
//               <Heart size={16} /> 
//               <span>{video.likes.toLocaleString()}</span>
//             </button>

//             {isOwner && (
//               <button
//                 onClick={handleDelete}
//                 className="flex items-center space-x-2 px-4 py-2 border border-transparent rounded-lg text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
//               >
//                 <Trash2 size={16} />
//                 <span>Delete</span>
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center space-x-2 mt-4">
//           <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">{video.category}</span>
//           <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{video.level}</span>
//         </div>

//         <p className="mt-6 text-gray-700 whitespace-pre-wrap border-t pt-4">{video.description}</p>
//       </div>
//     </div>
//   );
// };

// export default VideoDetailPage;

// src/pages/VideoDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import api from '../api/axios';
import { ArrowLeft, Eye, Heart, Trash2, Share2, Bookmark, Clock, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/videos/${videoId}`);
        console.log("Video data:", response.data);
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
      setLiked(!liked);
      setVideo(prevVideo => ({ 
        ...prevVideo, 
        likes: liked ? prevVideo.likes - 1 : prevVideo.likes + 1 
      }));
      await api.post(`/api/videos/${video.id}/like`);
    } catch (err) {
      console.error("Failed to like the video", err);
      setLiked(!liked);
      setVideo(prevVideo => ({ 
        ...prevVideo, 
        likes: liked ? prevVideo.likes + 1 : prevVideo.likes - 1 
      }));
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-600 animate-pulse" />
          </div>
          <p className="mt-6 text-gray-600 font-medium text-lg">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center p-12 bg-white rounded-2xl shadow-xl border-2 border-red-200">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <Link 
            to="/app/videos"
            className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Back to Videos
          </Link>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">Video not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/app/videos" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 font-medium group transition-all duration-300 hover:translate-x-1"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all videos
        </Link>

        {/* Video Player */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 border-2 border-gray-100 hover:border-purple-300 transition-all duration-300">
          <div className="aspect-video bg-black">
            <video 
              src={video.video_url} 
              controls 
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Video Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-purple-300 transition-all duration-300">
          {/* Title and Stats */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{video.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-xl">
                <Eye size={18} className="text-purple-600" />
                <span className="font-medium">{video.views.toLocaleString()} views</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-xl">
                <Clock size={18} className="text-blue-600" />
                <span className="font-medium">{video.duration || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Creator Info and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b-2 border-gray-100">
            {/* Creator */}
            <Link 
              to={`/profile/${video.user.id}`}
              className="flex items-center space-x-4 group"
            >
              <div className="relative">
                <img 
                  src={video.user.avatar || 'https://i.pravatar.cc/60'} 
                  alt={video.user.name}
                  className="w-14 h-14 rounded-full border-2 border-purple-200 group-hover:border-purple-400 transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-1">
                  <UserIcon className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {video.user.name}
                </p>
                <p className="text-sm text-gray-500">Content Creator</p>
              </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  liked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-current' : ''} /> 
                <span>{video.likes.toLocaleString()}</span>
              </button>

              <button className="flex items-center space-x-2 px-5 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 transition-all duration-300 hover:scale-105">
                <Bookmark size={18} />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button className="flex items-center space-x-2 px-5 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 transition-all duration-300 hover:scale-105">
                <Share2 size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>

              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 px-5 py-3 border-2 border-red-200 rounded-xl text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300 hover:scale-105"
                >
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-3 mt-6 mb-6">
            <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-xl border border-purple-200">
              {video.category}
            </span>
            <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-xl border border-green-200">
              {video.level}
            </span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Description
              </span>
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border border-gray-200">
              {video.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;