// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './contexts/AuthContext';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import Navbar from './components/Navbar';
// // import LandingPage from './pages/LandingPage'; // Import your landing page
// // import Login from './pages/Login';
// // import Signup from './pages/Signup';
// // import Dashboard from './pages/Dashboard';
// // import Listings from './pages/Listings';
// // import CreateListing from './pages/CreateListing';
// // import Profile from './pages/Profile';
// // import Chat from './pages/Chat';
// // import VideoCall from './pages/VideoCall';

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <div className="min-h-screen bg-gray-50">
// //           {/* Conditional Navbar - Only show on protected routes */}
// //           <Routes>
// //             {/* Public Routes - No Navbar */}
// //             <Route path="/" element={<LandingPage />} />
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/signup" element={<Signup />} />
            
// //             {/* Protected Routes - With Navbar */}
// //             <Route path="/dashboard" element={
// //               <>
// //                 <Navbar />
// //                 <ProtectedRoute>
// //                   <Dashboard />
// //                 </ProtectedRoute>
// //               </>
// //             } />
// //             <Route path="/listings" element={
// //               <>
// //                 <Navbar />
// //                 <ProtectedRoute>
// //                   <Listings />
// //                 </ProtectedRoute>
// //               </>
// //             } />
// //             <Route path="/create-listing" element={
// //               <>
// //                 <Navbar />
// //                 <ProtectedRoute>
// //                   <CreateListing />
// //                 </ProtectedRoute>
// //               </>
// //             } />
// //             <Route path="/profile" element={
// //               <>
// //                 <Navbar />
// //                 <ProtectedRoute>
// //                   <Profile />
// //                 </ProtectedRoute>
// //               </>
// //             } />
// //             <Route path="/chat/:userId?" element={
// //               <>
// //                 <Navbar />
// //                 <ProtectedRoute>
// //                   <Chat />
// //                 </ProtectedRoute>
// //               </>
// //             } />
// //             <Route path="/video/:roomId" element={
// //               <>
// //                 <Navbar />
// //                 <ProtectedRoute>
// //                   <VideoCall />
// //                 </ProtectedRoute>
// //               </>
// //             } />
// //           </Routes>
// //         </div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Listings from './pages/Listings';
// import CreateListing from './pages/CreateListing';
// import Profile from './pages/Profile';
// import Chat from './pages/Chat';
// import VideoCall from './pages/VideoCall';

// // 1. ADD THIS IMPORT
// import AuthSuccess from './pages/AuthSuccess';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Routes>
//             {/* Public Routes - No Navbar */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
            
//             {/* 2. ADD THIS ROUTE */}
//             <Route path="/auth/success" element={<AuthSuccess />} />
            
//             {/* Protected Routes - With Navbar */}
//             <Route path="/dashboard" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/listings" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Listings />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/create-listing" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <CreateListing />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/profile" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/chat/:userId?" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Chat />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/video/:roomId" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <VideoCall />
//                 </ProtectedRoute>
//               </>
//             } />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { 
//   Home, User, Video, MessageCircle, Trophy, Search, Bell, 
//   Play, Heart, MessageSquare, Star, Users, BookOpen, 
//   Calendar, Award, TrendingUp, Filter, Plus, Settings,
//   Camera, Upload, Send, Phone, VideoIcon, ChevronRight,
//   Clock, Eye, ThumbsUp, Share2, Download, Menu, X
// } from 'lucide-react';

// // Mock Data
// const mockUser = {
//   id: 1,
//   name: 'Sarah Johnson',
//   avatar: '/api/placeholder/40/40',
//   level: 12,
//   xp: 2450,
//   xpToNext: 550,
//   badges: ['Video Master', 'Mentor', 'Community Leader'],
//   skillsOffered: ['React Development', 'UI/UX Design'],
//   skillsLearning: ['Machine Learning', 'Photography']
// };

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
//   }
// ];

// const mockCommunityPosts = [
//   {
//     id: 1,
//     author: 'DevMaster',
//     content: 'Just finished my first React Native app! Thanks to all the amazing tutorials here.',
//     timestamp: '2 hours ago',
//     likes: 23,
//     comments: 5
//   },
//   {
//     id: 2,
//     author: 'ArtisticSoul',
//     content: 'Looking for someone to exchange digital art techniques for photography tips!',
//     timestamp: '4 hours ago',
//     likes: 15,
//     comments: 8
//   }
// ];

// const mockSkillListings = [
//   {
//     id: 1,
//     user: {
//       name: 'Alex Chen',
//       avatar: '/api/placeholder/60/60',
//       rating: 4.9,
//       reviewCount: 127,
//       level: 15,
//       verified: true
//     },
//     skillOffered: 'React Development',
//     skillWanted: 'UI/UX Design',
//     description: 'Senior React developer with 5+ years experience. Looking to learn modern design principles and Figma.',
//     availability: ['Evenings', 'Weekends'],
//     sessionType: ['Video Call', 'Screen Share'],
//     hourlyRate: 'Free Exchange',
//     tags: ['JavaScript', 'TypeScript', 'Next.js', 'Node.js'],
//     location: 'San Francisco, CA',
//     responseTime: '< 2 hours',
//     totalSessions: 89
//   },
//   {
//     id: 2,
//     user: {
//       name: 'Sarah Martinez',
//       avatar: '/api/placeholder/60/60',
//       rating: 4.8,
//       reviewCount: 93,
//       level: 12,
//       verified: true
//     },
//     skillOffered: 'Digital Marketing',
//     skillWanted: 'Web Development',
//     description: 'Marketing strategist specializing in social media and content creation. Want to learn HTML/CSS basics.',
//     availability: ['Mornings', 'Afternoons'],
//     sessionType: ['Video Call', 'Chat'],
//     hourlyRate: 'Free Exchange',
//     tags: ['SEO', 'Content Strategy', 'Social Media', 'Analytics'],
//     location: 'Austin, TX',
//     responseTime: '< 4 hours',
//     totalSessions: 67
//   },
//   {
//     id: 3,
//     user: {
//       name: 'David Kim',
//       avatar: '/api/placeholder/60/60',
//       rating: 4.9,
//       reviewCount: 156,
//       level: 18,
//       verified: true
//     },
//     skillOffered: 'Photography',
//     skillWanted: 'Video Editing',
//     description: 'Professional photographer with expertise in portrait and landscape photography. Looking to expand into video content creation.',
//     availability: ['Weekends', 'Evenings'],
//     sessionType: ['Video Call', 'In-Person'],
//     hourlyRate: '$25/hour',
//     tags: ['Portrait Photography', 'Lightroom', 'Camera Basics', 'Composition'],
//     location: 'New York, NY',
//     responseTime: '< 1 hour',
//     totalSessions: 134
//   },
//   {
//     id: 4,
//     user: {
//       name: 'Emma Wilson',
//       avatar: '/api/placeholder/60/60',
//       rating: 4.7,
//       reviewCount: 84,
//       level: 11,
//       verified: false
//     },
//     skillOffered: 'Graphic Design',
//     skillWanted: 'Python Programming',
//     description: 'Creative designer with 3+ years in brand identity and logo design. Interested in learning Python for automation.',
//     availability: ['Afternoons', 'Evenings'],
//     sessionType: ['Video Call', 'Screen Share'],
//     hourlyRate: 'Free Exchange',
//     tags: ['Adobe Creative Suite', 'Brand Identity', 'Logo Design', 'Typography'],
//     location: 'Seattle, WA',
//     responseTime: '< 6 hours',
//     totalSessions: 45
//   },
//   {
//     id: 5,
//     user: {
//       name: 'Marcus Rodriguez',
//       avatar: '/api/placeholder/60/60',
//       rating: 4.8,
//       reviewCount: 112,
//       level: 14,
//       verified: true
//     },
//     skillOffered: 'Guitar Playing',
//     skillWanted: 'Music Production',
//     description: 'Classical and acoustic guitarist with 10+ years experience. Looking to learn digital music production and mixing.',
//     availability: ['Evenings', 'Weekends'],
//     sessionType: ['Video Call', 'In-Person'],
//     hourlyRate: '$20/hour',
//     tags: ['Classical Guitar', 'Fingerpicking', 'Music Theory', 'Songwriting'],
//     location: 'Los Angeles, CA',
//     responseTime: '< 3 hours',
//     totalSessions: 78
//   }
// ];

// // Header Component
// const Header = ({ user, currentPage, setCurrentPage }) => {
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   const navItems = [
//     { id: 'home', label: 'Home', icon: Home },
//     { id: 'videos', label: 'Videos', icon: Video },
//     { id: 'skillswap', label: 'Skill Exchange', icon: Users },
//     { id: 'community', label: 'Community', icon: MessageCircle },
//     { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
//     { id: 'profile', label: 'Profile', icon: User }
//   ];

//   return (
//     <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
//               <BookOpen className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               SkillSwap+
//             </span>
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex flex-1 max-w-xl mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search skills, videos, or creators..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setCurrentPage(item.id)}
//                   className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                     currentPage === item.id
//                       ? 'bg-purple-100 text-purple-700'
//                       : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <IconComponent className="h-5 w-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               );
//             })}
            
//             <button className="relative p-2 text-gray-600 hover:text-purple-600">
//               <Bell className="h-5 w-5" />
//               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
//             </button>
            
//             <div className="flex items-center space-x-3">
//               <img
//                 src={user.avatar}
//                 alt={user.name}
//                 className="h-8 w-8 rounded-full border-2 border-purple-200"
//               />
//               <div className="hidden lg:block">
//                 <p className="text-sm font-medium text-gray-700">{user.name}</p>
//                 <p className="text-xs text-gray-500">Level {user.level}</p>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="md:hidden p-2 text-gray-600"
//           >
//             {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {showMobileMenu && (
//           <div className="md:hidden pb-4">
//             <div className="flex flex-col space-y-2">
//               {navItems.map((item) => {
//                 const IconComponent = item.icon;
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => {
//                       setCurrentPage(item.id);
//                       setShowMobileMenu(false);
//                     }}
//                     className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                       currentPage === item.id
//                         ? 'bg-purple-100 text-purple-700'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <IconComponent className="h-5 w-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// // Home Page Component
// const HomePage = ({ user }) => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div>
//             <h1 className="text-4xl font-bold mb-4">
//               Welcome back, {user.name}!
//             </h1>
//             <p className="text-lg mb-6 text-purple-100">
//               Ready to learn something new or share your expertise?
//             </p>
//             <div className="flex space-x-4">
//               <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                 Start Learning
//               </button>
//               <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
//                 Upload Video
//               </button>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
//               <div className="text-3xl font-bold">{user.xp}</div>
//               <div className="text-purple-200">Total XP</div>
//               <div className="mt-4 bg-white/30 rounded-full h-2">
//                 <div 
//                   className="bg-white h-2 rounded-full" 
//                   style={{ width: `${(user.xp / (user.xp + user.xpToNext)) * 100}%` }}
//                 ></div>
//               </div>
//               <div className="text-sm text-purple-200 mt-2">
//                 {user.xpToNext} XP to Level {user.level + 1}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
//           <div className="bg-purple-100 p-3 rounded-lg w-fit mb-3">
//             <Video className="h-6 w-6 text-purple-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Upload Video</h3>
//           <p className="text-sm text-gray-600">Share your skills</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
//           <div className="bg-green-100 p-3 rounded-lg w-fit mb-3">
//             <Users className="h-6 w-6 text-green-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Find Mentor</h3>
//           <p className="text-sm text-gray-600">Connect with experts</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
//           <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3">
//             <MessageCircle className="h-6 w-6 text-blue-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Join Discussion</h3>
//           <p className="text-sm text-gray-600">Engage with community</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
//           <div className="bg-orange-100 p-3 rounded-lg w-fit mb-3">
//             <Calendar className="h-6 w-6 text-orange-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Schedule Session</h3>
//           <p className="text-sm text-gray-600">Book 1-on-1 learning</p>
//         </div>
//       </div>

//       {/* Recent Activity & Recommendations */}
//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h2>
//           <div className="space-y-4">
//             {mockVideos.slice(0, 3).map((video) => (
//               <div key={video.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex space-x-4">
//                   <div className="relative">
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-32 h-20 object-cover rounded-lg"
//                     />
//                     <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
//                       {video.duration}
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
//                     <p className="text-sm text-gray-600 mb-2">by {video.creator}</p>
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                       <span className="flex items-center space-x-1">
//                         <Eye className="h-4 w-4" />
//                         <span>{video.views.toLocaleString()}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <Heart className="h-4 w-4" />
//                         <span>{video.likes}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                         <span>{video.rating}</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">React Development</span>
//                   <span className="text-sm text-gray-500">85%</span>
//                 </div>
//                 <div className="bg-gray-200 rounded-full h-2">
//                   <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
//                   <span className="text-sm text-gray-500">60%</span>
//                 </div>
//                 <div className="bg-gray-200 rounded-full h-2">
//                   <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">Photography</span>
//                   <span className="text-sm text-gray-500">25%</span>
//                 </div>
//                 <div className="bg-gray-200 rounded-full h-2">
//                   <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
//             <h3 className="font-semibold text-gray-800 mb-4">Recent Achievements</h3>
//             <div className="space-y-3">
//               {user.badges.slice(0, 3).map((badge, index) => (
//                 <div key={index} className="flex items-center space-x-3">
//                   <div className="bg-yellow-100 p-2 rounded-lg">
//                     <Award className="h-4 w-4 text-yellow-600" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">{badge}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Videos Page Component
// const VideosPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedLevel, setSelectedLevel] = useState('All');
  
//   const categories = ['All', 'Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
//   const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

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

//       {/* Video Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {mockVideos.map((video) => (
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

// // Skill Exchange Page Component
// const SkillExchangePage = () => {
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedSkillOffer, setSelectedSkillOffer] = useState('');
//   const [selectedSkillWanted, setSelectedSkillWanted] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const filterOptions = [
//     { id: 'all', label: 'All Listings' },
//     { id: 'free', label: 'Free Exchange' },
//     { id: 'paid', label: 'Paid Sessions' },
//     { id: 'verified', label: 'Verified Users' },
//     { id: 'online', label: 'Online Now' }
//   ];

//   const skillCategories = [
//     'All', 'Programming', 'Design', 'Marketing', 'Photography', 'Music', 
//     'Art', 'Writing', 'Business', 'Languages', 'Cooking', 'Fitness'
//   ];

//   const UserDetailModal = ({ user, onClose }) => {
//     if (!user) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//             <h3 className="text-xl font-semibold text-gray-800">Connect with {user.user.name}</h3>
//             <button 
//               onClick={onClose}
//               className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
          
//           <div className="p-6">
//             {/* User Info */}
//             <div className="flex items-start space-x-4 mb-6">
//               <div className="relative">
//                 <img
//                   src={user.user.avatar}
//                   alt={user.user.name}
//                   className="h-16 w-16 rounded-full"
//                 />
//                 {user.user.verified && (
//                   <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   </div>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <h4 className="text-lg font-semibold text-gray-800">{user.user.name}</h4>
//                 <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
//                   <span className="flex items-center space-x-1">
//                     <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                     <span>{user.user.rating} ({user.user.reviewCount} reviews)</span>
//                   </span>
//                   <span>Level {user.user.level}</span>
//                   <span>{user.totalSessions} sessions completed</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm">
//                   <span className="text-gray-600">📍 {user.location}</span>
//                   <span className="text-green-600">⚡ Responds in {user.responseTime}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Skill Exchange Details */}
//             <div className="bg-gray-50 p-4 rounded-lg mb-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <h5 className="font-medium text-gray-800 mb-2">Offering</h5>
//                   <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-center font-medium">
//                     {user.skillOffered}
//                   </div>
//                 </div>
//                 <div>
//                   <h5 className="font-medium text-gray-800 mb-2">Looking for</h5>
//                   <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-center font-medium">
//                     {user.skillWanted}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <h5 className="font-medium text-gray-800 mb-2">About</h5>
//               <p className="text-gray-700">{user.description}</p>
//             </div>

//             {/* Skills & Tags */}
//             <div className="mb-6">
//               <h5 className="font-medium text-gray-800 mb-3">Skills & Expertise</h5>
//               <div className="flex flex-wrap gap-2">
//                 {user.tags.map((tag, index) => (
//                   <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Availability */}
//             <div className="mb-6">
//               <h5 className="font-medium text-gray-800 mb-3">Availability & Preferences</h5>
//               <div className="grid md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-gray-600">Available:</span>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {user.availability.map((time, index) => (
//                       <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
//                         {time}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Session Types:</span>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {user.sessionType.map((type, index) => (
//                       <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
//                         {type}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-3">
//                 <span className="text-gray-600">Rate: </span>
//                 <span className="font-medium text-gray-800">{user.hourlyRate}</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-3">
//               <button className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
//                 <MessageCircle className="h-5 w-5" />
//                 <span>Send Message</span>
//               </button>
//               <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
//                 <VideoIcon className="h-5 w-5" />
//                 <span>Schedule Session</span>
//               </button>
//               <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                 <Heart className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const filteredListings = mockSkillListings.filter(listing => {
//     const matchesCategory = selectedCategory === 'All' || 
//       listing.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
//     const matchesFilter = selectedFilter === 'all' || 
//       (selectedFilter === 'free' && listing.hourlyRate === 'Free Exchange') ||
//       (selectedFilter === 'paid' && listing.hourlyRate !== 'Free Exchange') ||
//       (selectedFilter === 'verified' && listing.user.verified);
    
//     return matchesCategory && matchesFilter;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Skill Exchange</h1>
//           <p className="text-gray-600">Connect with others for one-on-one skill swapping</p>
//         </div>
//         <button className="mt-4 lg:mt-0 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
//           <Plus className="h-5 w-5" />
//           <span>Post Your Skills</span>
//         </button>
//       </div>

//       {/* Filter Bar */}
//       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//           <div className="flex flex-wrap gap-2">
//             {filterOptions.map((filter) => (
//               <button
//                 key={filter.id}
//                 onClick={() => setSelectedFilter(filter.id)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   selectedFilter === filter.id
//                     ? 'bg-purple-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {filter.label}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-purple-600"
//           >
//             <Filter className="h-5 w-5" />
//             <span>More Filters</span>
//           </button>
//         </div>

//         {/* Advanced Filters */}
//         <div className={`mt-4 pt-4 border-t border-gray-200 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               >
//                 {skillCategories.map((category) => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Skill Offered</label>
//               <input
//                 type="text"
//                 value={selectedSkillOffer}
//                 onChange={(e) => setSelectedSkillOffer(e.target.value)}
//                 placeholder="e.g., React Development"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Skill Wanted</label>
//               <input
//                 type="text"
//                 value={selectedSkillWanted}
//                 onChange={(e) => setSelectedSkillWanted(e.target.value)}
//                 placeholder="e.g., UI/UX Design"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Showing {filteredListings.length} skill exchange opportunities
//         </p>
//       </div>

//       {/* Skill Listings */}
//       <div className="space-y-6">
//         {filteredListings.map((listing) => (
//           <div key={listing.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//             <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
//               {/* User Info */}
//               <div className="flex items-center space-x-4 lg:w-64">
//                 <div className="relative">
//                   <img
//                     src={listing.user.avatar}
//                     alt={listing.user.name}
//                     className="h-14 w-14 rounded-full"
//                   />
//                   {listing.user.verified && (
//                     <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
//                       <div className="w-2 h-2 bg-white rounded-full"></div>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{listing.user.name}</h3>
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                     <span>{listing.user.rating}</span>
//                     <span>({listing.user.reviewCount})</span>
//                     <span>• Level {listing.user.level}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Skill Exchange */}
//               <div className="flex-1 lg:flex lg:items-center lg:space-x-6">
//                 <div className="grid md:grid-cols-2 gap-4 lg:flex-1">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Offering</p>
//                     <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium text-center">
//                       {listing.skillOffered}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Looking for</p>
//                     <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium text-center">
//                       {listing.skillWanted}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rate & Availability */}
//                 <div className="mt-4 lg:mt-0 lg:w-32 text-right">
//                   <p className="font-semibold text-gray-800">{listing.hourlyRate}</p>
//                   <p className="text-sm text-gray-600">
//                     Responds in {listing.responseTime}
//                   </p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex space-x-2 lg:w-48">
//                 <button 
//                   onClick={() => setSelectedUser(listing)}
//                   className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
//                 >
//                   View Details
//                 </button>
//                 <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                   <Heart className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <p className="text-gray-700 mb-3">{listing.description}</p>
//               <div className="flex flex-wrap gap-2">
//                 {listing.tags.slice(0, 4).map((tag, index) => (
//                   <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
//                     {tag}
//                   </span>
//                 ))}
//                 {listing.tags.length > 4 && (
//                   <span className="text-sm text-gray-500">+{listing.tags.length - 4} more</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* User Detail Modal */}
//       <UserDetailModal 
//         user={selectedUser} 
//         onClose={() => setSelectedUser(null)} 
//       />

//       {/* Load More */}
//       <div className="text-center mt-8">
//         <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
//           Load More Listings
//         </button>
//       </div>
//     </div>
//   );
// };
// const CommunityPage = () => {
//   const [newPost, setNewPost] = useState('');

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Community</h1>

//       {/* Create Post */}
//       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//         <div className="flex space-x-4">
//           <img
//             src={mockUser.avatar}
//             alt={mockUser.name}
//             className="h-10 w-10 rounded-full"
//           />
//           <div className="flex-1">
//             <textarea
//               value={newPost}
//               onChange={(e) => setNewPost(e.target.value)}
//               placeholder="Share your thoughts, ask questions, or offer help..."
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
//               rows="3"
//             />
//             <div className="flex justify-between items-center mt-3">
//               <div className="flex space-x-4">
//                 <button className="text-gray-500 hover:text-purple-600">
//                   <Camera className="h-5 w-5" />
//                 </button>
//                 <button className="text-gray-500 hover:text-purple-600">
//                   <Video className="h-5 w-5" />
//                 </button>
//               </div>
//               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
//                 Post
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Community Posts */}
//       <div className="space-y-6">
//         {mockCommunityPosts.map((post) => (
//           <div key={post.id} className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-start space-x-4">
//               <img
//                 src="/api/placeholder/40/40"
//                 alt={post.author}
//                 className="h-10 w-10 rounded-full"
//               />
//               <div className="flex-1">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <h3 className="font-semibold text-gray-800">{post.author}</h3>
//                   <span className="text-sm text-gray-500">{post.timestamp}</span>
//                 </div>
//                 <p className="text-gray-700 mb-4">{post.content}</p>
//                 <div className="flex items-center space-x-6">
//                   <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
//                     <Heart className="h-5 w-5" />
//                     <span>{post.likes}</span>
//                   </button>
//                   <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
//                     <MessageSquare className="h-5 w-5" />
//                     <span>{post.comments}</span>
//                   </button>
//                   <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
//                     <Share2 className="h-5 w-5" />
//                     <span>Share</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Discussion Boards */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Discussion Boards</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {['Programming', 'Design', 'Art', 'Music'].map((topic) => (
//             <div key={topic} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
//               <h3 className="font-semibold text-gray-800 mb-2">{topic}</h3>
//               <p className="text-sm text-gray-600 mb-4">Join the conversation about {topic.toLowerCase()}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">1.2k members</span>
//                 <ChevronRight className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Leaderboard Page Component
// const LeaderboardPage = () => {
//   const mockLeaderboard = [
//     { rank: 1, name: 'Alex Chen', xp: 15420, badge: 'Master Mentor', avatar: '/api/placeholder/40/40' },
//     { rank: 2, name: 'Sarah Johnson', xp: 12890, badge: 'Video Expert', avatar: '/api/placeholder/40/40' },
//     { rank: 3, name: 'Marcus Rodriguez', xp: 11250, badge: 'Community Leader', avatar: '/api/placeholder/40/40' },
//     { rank: 4, name: 'Emma Wilson', xp: 9800, badge: 'Skill Sharer', avatar: '/api/placeholder/40/40' },
//     { rank: 5, name: 'David Kim', xp: 8650, badge: 'Rising Star', avatar: '/api/placeholder/40/40' }
//   ];

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Leaderboard</h1>
//         <p className="text-gray-600">Top contributors in our skill-sharing community</p>
//       </div>

//       {/* Current User Rank */}
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl text-white mb-8">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <img
//               src={mockUser.avatar}
//               alt={mockUser.name}
//               className="h-12 w-12 rounded-full border-2 border-white"
//             />
//             <div>
//               <h3 className="font-semibold">Your Current Rank</h3>
//               <p className="text-purple-200">#2 • {mockUser.xp} XP</p>
//             </div>
//           </div>
//           <Trophy className="h-8 w-8 text-yellow-300" />
//         </div>
//       </div>

//       {/* Leaderboard */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Top Contributors</h2>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {mockLeaderboard.map((user) => (
//             <div key={user.rank} className="p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
//               <div className="flex items-center justify-center w-8 h-8">
//                 {user.rank <= 3 ? (
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
//                     user.rank === 1 ? 'bg-yellow-500' : 
//                     user.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'
//                   }`}>
//                     {user.rank}
//                   </div>
//                 ) : (
//                   <span className="text-lg font-semibold text-gray-600">#{user.rank}</span>
//                 )}
//               </div>
//               <img
//                 src={user.avatar}
//                 alt={user.name}
//                 className="h-12 w-12 rounded-full"
//               />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-800">{user.name}</h3>
//                 <p className="text-sm text-gray-600">{user.badge}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold text-gray-800">{user.xp.toLocaleString()} XP</p>
//                 <div className="flex items-center space-x-1">
//                   <TrendingUp className="h-4 w-4 text-green-500" />
//                   <span className="text-sm text-green-600">+125 this week</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Contributors by Category</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {['Programming', 'Design', 'Art', 'Music', 'Cooking', 'Photography'].map((category) => (
//             <div key={category} className="bg-white p-6 rounded-xl shadow-md">
//               <h3 className="font-semibold text-gray-800 mb-4">{category}</h3>
//               <div className="space-y-3">
//                 {mockLeaderboard.slice(0, 3).map((user, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <span className="text-sm text-gray-500">#{index + 1}</span>
//                     <img
//                       src={user.avatar}
//                       alt={user.name}
//                       className="h-6 w-6 rounded-full"
//                     />
//                     <span className="text-sm font-medium text-gray-700">{user.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Profile Page Component
// const ProfilePage = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const tabs = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'videos', label: 'My Videos' },
//     { id: 'achievements', label: 'Achievements' },
//     { id: 'settings', label: 'Settings' }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Profile Header */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-32"></div>
//         <div className="relative px-6 pb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <img
//               src={user.avatar}
//               alt={user.name}
//               className="h-24 w-24 rounded-full border-4 border-white -mt-12 bg-white"
//             />
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
//               <p className="text-gray-600">Level {user.level} • {user.xp} XP</p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {user.badges.slice(0, 3).map((badge, index) => (
//                   <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
//                     {badge}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
//                 Edit Profile
//               </button>
//               <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//                 <Settings className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-md text-center">
//           <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-gray-800">23</div>
//           <div className="text-sm text-gray-600">Videos Created</div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-md text-center">
//           <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-gray-800">156</div>
//           <div className="text-sm text-gray-600">Students Taught</div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-md text-center">
//           <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-gray-800">42h</div>
//           <div className="text-sm text-gray-600">Teaching Hours</div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-md text-center">
//           <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-gray-800">4.9</div>
//           <div className="text-sm text-gray-600">Average Rating</div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="bg-white rounded-xl shadow-md mb-8">
//         <div className="border-b border-gray-200">
//           <nav className="flex space-x-8 px-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-purple-500 text-purple-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="p-6">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills I Offer</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {user.skillsOffered.map((skill, index) => (
//                     <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills I'm Learning</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {user.skillsLearning.map((skill, index) => (
//                     <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3 text-sm">
//                     <Video className="h-4 w-4 text-purple-600" />
//                     <span>Published "Advanced React Patterns" video</span>
//                     <span className="text-gray-500">2 days ago</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-sm">
//                     <MessageCircle className="h-4 w-4 text-blue-600" />
//                     <span>Helped 3 students with JavaScript questions</span>
//                     <span className="text-gray-500">1 week ago</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-sm">
//                     <Award className="h-4 w-4 text-yellow-500" />
//                     <span>Earned "Community Leader" badge</span>
//                     <span className="text-gray-500">2 weeks ago</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'videos' && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800">My Videos</h3>
//                 <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
//                   <Plus className="h-4 w-4" />
//                   <span>Upload New Video</span>
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {mockVideos.slice(0, 4).map((video) => (
//                   <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden">
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-full h-32 object-cover"
//                     />
//                     <div className="p-4">
//                       <h4 className="font-medium text-gray-800 mb-2">{video.title}</h4>
//                       <div className="flex items-center justify-between text-sm text-gray-500">
//                         <span>{video.views.toLocaleString()} views</span>
//                         <span>{video.likes} likes</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'achievements' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-6">Achievements & Badges</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {user.badges.map((badge, index) => (
//                   <div key={index} className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-xl border border-yellow-200">
//                     <div className="text-center">
//                       <Award className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
//                       <h4 className="font-semibold text-gray-800 mb-2">{badge}</h4>
//                       <p className="text-sm text-gray-600">Earned by completing specific milestones</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'settings' && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
//                     <input
//                       type="text"
//                       defaultValue={user.name}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
//                     <textarea
//                       placeholder="Tell us about yourself..."
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       rows="3"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
//                 <div className="space-y-3">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-2 text-sm text-gray-700">Email notifications for new messages</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-2 text-sm text-gray-700">Push notifications for skill matches</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-2 text-sm text-gray-700">Weekly progress reports</span>
//                   </label>
//                 </div>
//               </div>
//               <div className="pt-4">
//                 <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const SkillSwapApp = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [user] = useState(mockUser);

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage user={user} />;
//       case 'videos':
//         return <VideosPage />;
//       case 'skillswap':
//         return <SkillExchangePage />;
//       case 'community':
//         return <CommunityPage />;
//       case 'leaderboard':
//         return <LeaderboardPage />;
//       case 'profile':
//         return <ProfilePage user={user} />;
//       default:
//         return <HomePage user={user} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header 
//         user={user} 
//         currentPage={currentPage} 
//         setCurrentPage={setCurrentPage} 
//       />
//       <main>
//         {renderPage()}
//       </main>
//     </div>
//   );
// };

// export default SkillSwapApp;

import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import SkillExchangePage from './pages/SkillExchangePage';
import CommunityPage from './pages/CommunityPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';

// Mock user data
const mockUser = {
  id: 1,
  name: 'Sarah Johnson',
  avatar: '/api/placeholder/40/40',
  level: 12,
  xp: 2450,
  xpToNext: 550,
  badges: ['Video Master', 'Mentor', 'Community Leader'],
  skillsOffered: ['React Development', 'UI/UX Design'],
  skillsLearning: ['Machine Learning', 'Photography']
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user] = useState(mockUser);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage user={user} />;
      case 'videos':
        return <VideosPage />;
      case 'skillswap':
        return <SkillExchangePage />;
      case 'community':
        return <CommunityPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage user={user} />;
      default:
        return <HomePage user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;