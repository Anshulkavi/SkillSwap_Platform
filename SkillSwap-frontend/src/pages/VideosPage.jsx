// // src/pages/VideosPage.jsx

// import React, { useState, useEffect } from 'react';
// import { Plus, Filter } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import api from '../api/axios';
// import VideoCard from '../components/VideoCard';
// import UploadVideoModal from '../components/UploadVideoModal'; // 👈 1. Import the new modal

// const VideosPage = () => {
//   const { user, loading: authLoading } = useAuth();

//   // States
//   const [videos, setVideos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedLevel, setSelectedLevel] = useState('All');
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // 👈 2. Add state for the modal

//   const categories = ['All', 'Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
//   const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

//   // Data fetching effect (no changes here)
//   useEffect(() => {
//     const fetchVideos = async () => {
//       if (authLoading) return;
//       if (!user) {
//         setError("Please log in to view videos.");
//         setIsLoading(false);
//         return;
//       }
//       setIsLoading(true);
//       setError(null);
//       try {
//         const params = new URLSearchParams();
//         if (selectedCategory !== 'All') params.append('category', selectedCategory);
//         if (selectedLevel !== 'All') params.append('level', selectedLevel);
//         const response = await api.get('/api/videos', { params });
//         setVideos(response.data);
//       } catch (err) {
//         const errorMessage = err.response?.data?.detail || err.message || "Failed to fetch videos.";
//         setError(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchVideos();
//   }, [user, authLoading, selectedCategory, selectedLevel]);

//   // 👇 3. Add a handler to update the UI after a video is uploaded
//   const handleVideoUploaded = (newVideo) => {
//     // Add the new video to the top of the list for instant feedback
//     setVideos(prevVideos => [newVideo, ...prevVideos]);
//   };

//   // Render function (no changes here)
//   const renderContent = () => {
//     if (isLoading || authLoading) {
//       return <p className="text-center p-10 text-gray-500">Loading videos...</p>;
//     }
//     if (error) {
//       return <p className="text-center p-10 text-red-600 bg-red-50 rounded-lg">{error}</p>;
//     }
//     if (videos.length === 0) {
//       return <p className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">No videos found. Be the first to upload one!</p>;
//     }
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {videos.map((video) => (
//           <VideoCard key={video.id} video={video} />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4 lg:mb-0">Skill Videos</h1>
//           {/* 👇 4. Connect the button to open the modal */}
//           <button 
//             onClick={() => setIsUploadModalOpen(true)}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
//           >
//             <Plus className="h-5 w-5" />
//             <span>Upload Video</span>
//           </button>
//         </div>

//         {/* Filters (no changes here) */}
//         <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//           <div className="flex flex-wrap gap-4 items-center">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               >
//                 {categories.map((category) => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
//               <select
//                 value={selectedLevel}
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               >
//                 {levels.map((level) => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//           <p className="text-gray-600">Showing {videos.length} videos</p>
//         </div>

//         {/* Video Grid */}
//         {renderContent()}
//       </div>

//       {/* 👇 5. Render the modal component */}
//       <UploadVideoModal 
//         isOpen={isUploadModalOpen}
//         onClose={() => setIsUploadModalOpen(false)}
//         onVideoUploaded={handleVideoUploaded}
//       />
//     </>
//   );
// };

// export default VideosPage;

// src/pages/VideosPage.jsx

import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, Sparkles, Video as VideoIcon, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import VideoCard from '../components/VideoCard';
import UploadVideoModal from '../components/UploadVideoModal';

const VideosPage = () => {
  const { user, loading: authLoading } = useAuth();

  // States
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Data fetching effect
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

  const handleVideoUploaded = (newVideo) => {
    setVideos(prevVideos => [newVideo, ...prevVideos]);
  };

  // Filter videos by search query
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (isLoading || authLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-600 animate-pulse" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading amazing videos...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center p-12 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <VideoIcon className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      );
    }
    
    if (filteredVideos.length === 0) {
      return (
        <div className="text-center p-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-dashed border-purple-300">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <VideoIcon className="h-10 w-10 text-purple-600" />
          </div>
          <p className="text-gray-600 font-medium text-lg mb-2">No videos found</p>
          <p className="text-gray-500">Be the first to upload and inspire others!</p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Upload Your First Video
          </button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <div
            key={video.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-fadeInUp"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                  Skill Videos
                  <TrendingUp className="h-8 w-8 text-purple-600 animate-pulse" />
                </h1>
                <p className="text-gray-600">Discover and learn from the best creators</p>
              </div>
              
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Upload Video</span>
              </button>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-purple-600" />
                Search Videos
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title or creator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-700">Filters</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 cursor-pointer"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'All' || selectedLevel !== 'All') && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')} className="hover:text-purple-600">×</button>
                  </span>
                )}
                {selectedLevel !== 'All' && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedLevel}
                    <button onClick={() => setSelectedLevel('All')} className="hover:text-purple-600">×</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-purple-600 font-bold">{filteredVideos.length}</span> video{filteredVideos.length !== 1 ? 's' : ''}
            </p>
            {searchQuery && (
              <p className="text-sm text-gray-500">
                Search results for "<span className="font-semibold text-purple-600">{searchQuery}</span>"
              </p>
            )}
          </div>

          {/* Video Grid */}
          {renderContent()}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadVideoModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default VideosPage;