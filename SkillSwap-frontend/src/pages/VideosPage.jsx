// import React, { useState } from 'react';
// import { Plus, Filter, Play, Eye, Star } from 'lucide-react';

// // Mock videos data
// const mockVideos = [
//   {
//     id: 1,
//     title: 'Advanced React Hooks Tutorial',
//     creator: 'Alex Chen',
//     thumbnail: '/api/placeholder/300/200',
//     duration: '15:32',
//     views: 12500,
//     likes: 890,
//     rating: 4.8,
//     category: 'Programming',
//     level: 'Advanced'
//   },
//   {
//     id: 2,
//     title: 'Watercolor Painting Basics',
//     creator: 'Emma Wilson',
//     thumbnail: '/api/placeholder/300/200',
//     duration: '22:15',
//     views: 8300,
//     likes: 654,
//     rating: 4.9,
//     category: 'Art',
//     level: 'Beginner'
//   },
//   {
//     id: 3,
//     title: 'Guitar Fingerpicking Techniques',
//     creator: 'Marcus Rodriguez',
//     thumbnail: '/api/placeholder/300/200',
//     duration: '18:45',
//     views: 15600,
//     likes: 1200,
//     rating: 4.7,
//     category: 'Music',
//     level: 'Intermediate'
//   },
//   {
//     id: 4,
//     title: 'Python Data Analysis with Pandas',
//     creator: 'Dr. Sarah Kim',
//     thumbnail: '/api/placeholder/300/200',
//     duration: '28:30',
//     views: 9400,
//     likes: 756,
//     rating: 4.6,
//     category: 'Programming',
//     level: 'Intermediate'
//   },
//   {
//     id: 5,
//     title: 'Photography Composition Rules',
//     creator: 'David Park',
//     thumbnail: '/api/placeholder/300/200',
//     duration: '12:20',
//     views: 11200,
//     likes: 980,
//     rating: 4.8,
//     category: 'Photography',
//     level: 'Beginner'
//   },
//   {
//     id: 6,
//     title: 'Advanced Photoshop Techniques',
//     creator: 'Lisa Chen',
//     thumbnail: '/api/placeholder/300/200',
//     duration: '35:45',
//     views: 7800,
//     likes: 620,
//     rating: 4.9,
//     category: 'Design',
//     level: 'Advanced'
//   }
// ];

// const VideosPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedLevel, setSelectedLevel] = useState('All');
  
//   const categories = ['All', 'Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
//   const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

//   const filteredVideos = mockVideos.filter(video => {
//     const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
//     const matchesLevel = selectedLevel === 'All' || video.level === selectedLevel;
//     return matchesCategory && matchesLevel;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4 lg:mb-0">Skill Videos</h1>
//         <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
//           <Plus className="h-5 w-5" />
//           <span>Upload Video</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//         <div className="flex flex-wrap gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
//             <select
//               value={selectedLevel}
//               onChange={(e) => setSelectedLevel(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               {levels.map((level) => (
//                 <option key={level} value={level}>{level}</option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-2">
//               <Filter className="h-4 w-4" />
//               <span>Apply Filters</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Showing {filteredVideos.length} videos
//         </p>
//       </div>

//       {/* Video Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredVideos.map((video) => (
//           <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="relative">
//               <img
//                 src={video.thumbnail}
//                 alt={video.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
//                 {video.duration}
//               </div>
//               <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
//                 <Play className="h-12 w-12 text-white fill-current" />
//               </button>
//             </div>
//             <div className="p-4">
//               <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">by {video.creator}</p>
//               <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                 <span className="flex items-center space-x-1">
//                   <Eye className="h-4 w-4" />
//                   <span>{video.views.toLocaleString()}</span>
//                 </span>
//                 <span className="flex items-center space-x-1">
//                   <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                   <span>{video.rating}</span>
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
//                   {video.category}
//                 </span>
//                 <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
//                   {video.level}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       <div className="text-center mt-8">
//         <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
//           Load More Videos
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideosPage;

// src/pages/VideosPage.jsx

import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import VideoCard from '../components/VideoCard';
import UploadVideoModal from '../components/UploadVideoModal'; // 👈 1. Import the new modal

const VideosPage = () => {
  const { user, loading: authLoading } = useAuth();

  // States
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // 👈 2. Add state for the modal

  const categories = ['All', 'Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Data fetching effect (no changes here)
  useEffect(() => {
    const fetchVideos = async () => {
      if (authLoading) return;
      if (!user) {
        setError("Please log in to view videos.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedLevel !== 'All') params.append('level', selectedLevel);
        const response = await api.get('/api/videos', { params });
        setVideos(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.detail || err.message || "Failed to fetch videos.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [user, authLoading, selectedCategory, selectedLevel]);

  // 👇 3. Add a handler to update the UI after a video is uploaded
  const handleVideoUploaded = (newVideo) => {
    // Add the new video to the top of the list for instant feedback
    setVideos(prevVideos => [newVideo, ...prevVideos]);
  };

  // Render function (no changes here)
  const renderContent = () => {
    if (isLoading || authLoading) {
      return <p className="text-center p-10 text-gray-500">Loading videos...</p>;
    }
    if (error) {
      return <p className="text-center p-10 text-red-600 bg-red-50 rounded-lg">{error}</p>;
    }
    if (videos.length === 0) {
      return <p className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">No videos found. Be the first to upload one!</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 lg:mb-0">Skill Videos</h1>
          {/* 👇 4. Connect the button to open the modal */}
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Upload Video</span>
          </button>
        </div>

        {/* Filters (no changes here) */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Showing {videos.length} videos</p>
        </div>

        {/* Video Grid */}
        {renderContent()}
      </div>

      {/* 👇 5. Render the modal component */}
      <UploadVideoModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />
    </>
  );
};

export default VideosPage;