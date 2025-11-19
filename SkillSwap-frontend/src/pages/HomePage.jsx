// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Video, Users, MessageCircle, Calendar, Star, Heart, Eye, Award, Zap
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// // Mock data for videos
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

// // Reusable animated progress bar component
// const SkillProgress = ({ skill, percentage, color }) => (
//     <div>
//         <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-medium text-slate-300">{skill}</span>
//             <span className="text-sm font-bold text-slate-400">{percentage}%</span>
//         </div>
//         <div className="bg-slate-700 rounded-full h-2 w-full">
//             <motion.div 
//                 className={`h-2 rounded-full ${color}`}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${percentage}%` }}
//                 transition={{ duration: 1.5, ease: "easeInOut" }}
//             />
//         </div>
//     </div>
// );

// const HomePage = () => {
//     const { user } = useAuth();

//     // Default values for a richer UI even if user is null
//     const userName = user?.name || 'Explorer';
//     const userXp = user?.xp || 250;
//     const userLevel = user?.level || 5;
//     const xpToNext = user?.xpToNext || 400;
//     const userBadges = user?.badges || ['React Rookie', 'First Upload'];
//     const xpPercentage = (userXp / (userXp + xpToNext)) * 100;

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: { y: 0, opacity: 1 }
//     };

//     return (
//         <div className="bg-slate-900 text-slate-200 min-h-screen">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
//                 {/* Hero Section */}
//                 <motion.section 
//                     className="relative text-center py-20 md:py-32 rounded-3xl overflow-hidden mb-16"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     {/* Aurora Background Effect */}
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                         <div className="absolute -translate-x-[40%] -translate-y-[10%] w-[1000px] h-[1000px] bg-gradient-radial from-purple-600/40 to-transparent blur-3xl rounded-full"></div>
//                         <div className="absolute translate-x-[40%] translate-y-[10%] w-[1000px] h-[1000px] bg-gradient-radial from-blue-600/40 to-transparent blur-3xl rounded-full"></div>
//                     </div>
                    
//                     <div className="relative z-10">
//                         <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
//                             Welcome Back, {userName}
//                         </h1>
//                         <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
//                             Unleash your potential. Learn a new skill or share your wisdom with the world.
//                         </p>
//                         <motion.div className="flex flex-wrap justify-center gap-4" variants={containerVariants} initial="hidden" animate="visible">
//                             <motion.div variants={itemVariants}>
//                                 <Link to="/videos" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300">
//                                     Start Learning
//                                 </Link>
//                             </motion.div>
//                             <motion.div variants={itemVariants}>
//                                 <Link to="/upload" className="bg-white/10 border border-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transform transition-colors duration-300">
//                                     Share Your Skill
//                                 </Link>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </motion.section>

//                 {/* Quick Actions */}
//                 <motion.div 
//                     className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {[
//                         { to: "/upload", icon: Video, title: "Upload Video", text: "Share your skills", color: "text-purple-400" },
//                         { to: "/skill-exchange", icon: Users, title: "Find a Mentor", text: "Connect with experts", color: "text-green-400" },
//                         { to: "/community", icon: MessageCircle, title: "Discussions", text: "Engage with peers", color: "text-blue-400" },
//                         { to: "/schedule", icon: Calendar, title: "Book a Session", text: "1-on-1 learning", color: "text-orange-400" },
//                     ].map((item, index) => (
//                         <motion.div key={index} variants={itemVariants}>
//                             <Link to={item.to} className="group block p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-purple-500 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1">
//                                 <item.icon className={`h-8 w-8 mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
//                                 <h3 className="font-semibold text-slate-100">{item.title}</h3>
//                                 <p className="text-sm text-slate-400">{item.text}</p>
//                             </Link>
//                         </motion.div>
//                     ))}
//                 </motion.div>

//                 {/* Main Content Area */}
//                 <div className="grid lg:grid-cols-3 gap-8">
//                     {/* Recommended Videos */}
//                     <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
//                         <h2 className="text-3xl font-bold text-white mb-6">Jump Back In</h2>
//                         <div className="space-y-4">
//                             {mockVideos.map((video) => (
//                                 <motion.div 
//                                     key={video.id}
//                                     className="group flex items-center space-x-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors duration-300"
//                                     whileHover={{ scale: 1.02 }}
//                                 >
//                                     <div className="relative flex-shrink-0 w-40 h-24">
//                                         <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-lg"/>
//                                         <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
//                                         <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{video.duration}</span>
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <h3 className="font-semibold text-slate-100 truncate mb-1 group-hover:text-purple-400 transition-colors">{video.title}</h3>
//                                         <p className="text-sm text-slate-400 mb-2">by {video.creator}</p>
//                                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
//                                             <span className="flex items-center gap-1"><Eye size={16} /> {video.views.toLocaleString()}</span>
//                                             <span className="flex items-center gap-1"><Heart size={16} /> {video.likes}</span>
//                                             <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-current" /> {video.rating}</span>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Progress Hub */}
//                     <motion.div className="space-y-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
//                         <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
//                             <h2 className="text-xl font-bold text-white mb-4">Your Progress Hub</h2>
//                             <div className="text-center mb-4">
//                                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{userXp}</div>
//                                <div className="text-slate-400">Total XP</div>
//                                <div className="mt-4 bg-slate-700 rounded-full h-2">
//                                   <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
//                                </div>
//                                <div className="text-sm text-slate-400 mt-2">{xpToNext} XP to Level {userLevel + 1}</div>
//                             </div>
//                             <div className="space-y-4">
//                                 <SkillProgress skill="React Development" percentage={85} color="bg-purple-500" />
//                                 <SkillProgress skill="UI/UX Design" percentage={60} color="bg-blue-500" />
//                                 <SkillProgress skill="Photography" percentage={25} color="bg-green-500" />
//                             </div>
//                         </div>

//                         <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
//                             <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
//                             {userBadges.length > 0 ? (
//                                 <div className="space-y-3">
//                                     {userBadges.map((badge, index) => (
//                                         <div key={index} className="flex items-center space-x-3">
//                                             <div className="bg-yellow-500/10 p-2 rounded-full">
//                                                 <Award className="h-5 w-5 text-yellow-400" />
//                                             </div>
//                                             <span className="font-medium text-slate-300">{badge}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-4 text-slate-500">
//                                     <Zap className="h-10 w-10 mx-auto mb-2" />
//                                     <p>Start learning to unlock achievements!</p>
//                                 </div>
//                             )}
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Video, Users, MessageCircle, Calendar, Star, Heart, Eye, Award, Zap, ArrowRight, Sparkles, TrendingUp
} from 'lucide-react';

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: 'Advanced React Hooks Tutorial',
    creator: 'Alex Chen',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    duration: '15:32',
    views: 12500,
    likes: 890,
    rating: 4.8,
    category: 'Programming',
    level: 'Advanced'
  },
  {
    id: 2,
    title: 'Watercolor Painting Basics',
    creator: 'Emma Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=250&fit=crop',
    duration: '22:15',
    views: 8300,
    likes: 654,
    rating: 4.9,
    category: 'Art',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Guitar Fingerpicking Techniques',
    creator: 'Marcus Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop',
    duration: '18:45',
    views: 15600,
    likes: 1200,
    rating: 4.7,
    category: 'Music',
    level: 'Intermediate'
  }
];

// Reusable animated progress bar component
const SkillProgress = ({ skill, percentage, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm font-bold text-purple-600">{percentage}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-3 w-full overflow-hidden">
        <div 
          className={`h-3 rounded-full ${color} transition-all duration-1500 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const HomePage = () => {
  const { user } = useAuth();

  // Default values for a richer UI even if user is null
  const userName = user?.name || 'Explorer';
  const userXp = user?.xp || 250;
  const userLevel = user?.level || 5;
  const xpToNext = user?.xpToNext || 400;
  const userBadges = user?.badges || ['React Rookie', 'First Upload'];
  const xpPercentage = (userXp / (userXp + xpToNext)) * 100;

  const quickActions = [
    { to: "/app/videos", icon: Video, title: "Upload Video", text: "Share your skills", color: "purple", gradient: "from-purple-500 to-purple-600" },
    { to: "/app/skill-exchange", icon: Users, title: "Find a Mentor", text: "Connect with experts", color: "green", gradient: "from-green-500 to-green-600" },
    { to: "/app/community", icon: MessageCircle, title: "Discussions", text: "Engage with peers", color: "blue", gradient: "from-blue-500 to-blue-600" },
    { to: "/app/schedule", icon: Calendar, title: "Book a Session", text: "1-on-1 learning", color: "orange", gradient: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 rounded-3xl overflow-hidden mb-16 bg-gradient-to-br from-purple-600 to-blue-600">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeIn">
              <Sparkles className="h-4 w-4" />
              <span>Level {userLevel} • {userXp} XP</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fadeInUp">
              Welcome Back, <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fadeInUp animation-delay-200">
              Unleash your potential. Learn a new skill or share your wisdom with the world.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-400">
              <Link 
                to="/app/videos" 
                className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/app/videos" 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Share Your Skill
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {quickActions.map((item, index) => (
            <Link 
              key={index} 
              to={item.to} 
              style={{ animationDelay: `${index * 100}ms` }}
              className="group block p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
            >
              <div className={`bg-gradient-to-br ${item.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </Link>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommended Videos */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Jump Back In</h2>
              <Link to="/app/videos" className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 group">
                <span>View All</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockVideos.map((video, index) => (
                <div 
                  key={video.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="group flex items-center space-x-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-102 animate-slideInLeft"
                >
                  <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-xl">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1 group-hover:text-purple-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">by {video.creator}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                        <Eye size={16} /> {video.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart size={16} /> {video.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-current" /> {video.rating}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col gap-2">
                    <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                      {video.category}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium text-center">
                      {video.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Hub */}
          <div className="space-y-6">
            {/* XP Progress Card */}
            <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {userXp}
                </div>
                <div className="text-gray-600 font-medium">Total XP</div>
                <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${xpPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2 flex items-center justify-center space-x-1">
                  <span>{xpToNext} XP to</span>
                  <span className="font-bold text-purple-600">Level {userLevel + 1}</span>
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <SkillProgress 
                  skill="React Development" 
                  percentage={85} 
                  color="bg-gradient-to-r from-purple-500 to-purple-600" 
                />
                <SkillProgress 
                  skill="UI/UX Design" 
                  percentage={60} 
                  color="bg-gradient-to-r from-blue-500 to-blue-600" 
                />
                <SkillProgress 
                  skill="Photography" 
                  percentage={25} 
                  color="bg-gradient-to-r from-green-500 to-green-600" 
                />
              </div>
            </div>

            {/* Achievements Card */}
            <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-500" />
                <span>Achievements</span>
              </h3>
              {userBadges.length > 0 ? (
                <div className="space-y-3">
                  {userBadges.map((badge, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:scale-105 transition-transform duration-300"
                    >
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-2 rounded-full shadow-lg">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{badge}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-10 w-10 text-purple-600" />
                  </div>
                  <p className="text-gray-600">Start learning to unlock achievements!</p>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <div className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl text-white shadow-xl">
              <h3 className="text-lg font-bold mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Videos Watched</span>
                  <span className="text-2xl font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Hours Learned</span>
                  <span className="text-2xl font-bold">8.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Skills Improved</span>
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .hover\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
};

export default HomePage;