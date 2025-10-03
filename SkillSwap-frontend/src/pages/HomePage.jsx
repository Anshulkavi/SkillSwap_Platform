import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Video, Users, MessageCircle, Calendar, Star, Heart, Eye, Award, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: 'Advanced React Hooks Tutorial',
    creator: 'Alex Chen',
    thumbnail: '/api/placeholder/300/200',
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
    thumbnail: '/api/placeholder/300/200',
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
    thumbnail: '/api/placeholder/300/200',
    duration: '18:45',
    views: 15600,
    likes: 1200,
    rating: 4.7,
    category: 'Music',
    level: 'Intermediate'
  }
];

// const HomePage = () => {
//   const { user } = useAuth();

//   // Default values if user data is incomplete
//   const userName = user?.name || 'User';
//   const userXp = user?.xp || 0;
//   const userLevel = user?.level || 1;
//   const xpToNext = user?.xpToNext || 100;
//   const userBadges = user?.badges || [];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div>
//             <h1 className="text-4xl font-bold mb-4">
//               Welcome back, {userName}!
//             </h1>
//             <p className="text-lg mb-6 text-purple-100">
//               Ready to learn something new or share your expertise?
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link 
//                 to="/videos"
//                 className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//               >
//                 Start Learning
//               </Link>
//               <Link 
//                 to="/videos"
//                 className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
//               >
//                 Upload Video
//               </Link>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
//               <div className="text-3xl font-bold">{userXp}</div>
//               <div className="text-purple-200">Total XP</div>
//               <div className="mt-4 bg-white/30 rounded-full h-2">
//                 <div 
//                   className="bg-white h-2 rounded-full transition-all" 
//                   style={{ width: `${(userXp / (userXp + xpToNext)) * 100}%` }}
//                 ></div>
//               </div>
//               <div className="text-sm text-purple-200 mt-2">
//                 {xpToNext} XP to Level {userLevel + 1}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <Link 
//           to="/videos"
//           className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//         >
//           <div className="bg-purple-100 p-3 rounded-lg w-fit mb-3">
//             <Video className="h-6 w-6 text-purple-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Upload Video</h3>
//           <p className="text-sm text-gray-600">Share your skills</p>
//         </Link>
        
//         <Link 
//           to="/skill-exchange"
//           className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//         >
//           <div className="bg-green-100 p-3 rounded-lg w-fit mb-3">
//             <Users className="h-6 w-6 text-green-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Find Mentor</h3>
//           <p className="text-sm text-gray-600">Connect with experts</p>
//         </Link>
        
//         <Link 
//           to="/community"
//           className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//         >
//           <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3">
//             <MessageCircle className="h-6 w-6 text-blue-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Join Discussion</h3>
//           <p className="text-sm text-gray-600">Engage with community</p>
//         </Link>
        
//         <Link 
//           to="/skill-exchange"
//           className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//         >
//           <div className="bg-orange-100 p-3 rounded-lg w-fit mb-3">
//             <Calendar className="h-6 w-6 text-orange-600" />
//           </div>
//           <h3 className="font-semibold text-gray-800">Schedule Session</h3>
//           <p className="text-sm text-gray-600">Book 1-on-1 learning</p>
//         </Link>
//       </div>

//       {/* Recent Activity & Recommendations */}
//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h2>
//           <div className="space-y-4">
//             {mockVideos.slice(0, 3).map((video) => (
//               <div key={video.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex space-x-4">
//                   <div className="relative flex-shrink-0">
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-32 h-20 object-cover rounded-lg"
//                     />
//                     <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
//                       {video.duration}
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-800 mb-2 truncate">{video.title}</h3>
//                     <p className="text-sm text-gray-600 mb-2">by {video.creator}</p>
//                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
//                   <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: '85%' }}></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
//                   <span className="text-sm text-gray-500">60%</span>
//                 </div>
//                 <div className="bg-gray-200 rounded-full h-2">
//                   <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: '60%' }}></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">Photography</span>
//                   <span className="text-sm text-gray-500">25%</span>
//                 </div>
//                 <div className="bg-gray-200 rounded-full h-2">
//                   <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: '25%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
//             <h3 className="font-semibold text-gray-800 mb-4">Recent Achievements</h3>
//             {userBadges.length > 0 ? (
//               <div className="space-y-3">
//                 {userBadges.slice(0, 3).map((badge, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <div className="bg-yellow-100 p-2 rounded-lg">
//                       <Award className="h-4 w-4 text-yellow-600" />
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">{badge}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-4">
//                 <Award className="h-12 w-12 text-gray-300 mx-auto mb-2" />
//                 <p className="text-sm text-gray-500">Complete tasks to earn badges!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// Reusable animated progress bar component
const SkillProgress = ({ skill, percentage, color }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-300">{skill}</span>
            <span className="text-sm font-bold text-slate-400">{percentage}%</span>
        </div>
        <div className="bg-slate-700 rounded-full h-2 w-full">
            <motion.div 
                className={`h-2 rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
        </div>
    </div>
);

const HomePage = () => {
    const { user } = useAuth();

    // Default values for a richer UI even if user is null
    const userName = user?.name || 'Explorer';
    const userXp = user?.xp || 250;
    const userLevel = user?.level || 5;
    const xpToNext = user?.xpToNext || 400;
    const userBadges = user?.badges || ['React Rookie', 'First Upload'];
    const xpPercentage = (userXp / (userXp + xpToNext)) * 100;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Hero Section */}
                <motion.section 
                    className="relative text-center py-20 md:py-32 rounded-3xl overflow-hidden mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Aurora Background Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute -translate-x-[40%] -translate-y-[10%] w-[1000px] h-[1000px] bg-gradient-radial from-purple-600/40 to-transparent blur-3xl rounded-full"></div>
                        <div className="absolute translate-x-[40%] translate-y-[10%] w-[1000px] h-[1000px] bg-gradient-radial from-blue-600/40 to-transparent blur-3xl rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            Welcome Back, {userName}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                            Unleash your potential. Learn a new skill or share your wisdom with the world.
                        </p>
                        <motion.div className="flex flex-wrap justify-center gap-4" variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants}>
                                <Link to="/videos" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300">
                                    Start Learning
                                </Link>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Link to="/upload" className="bg-white/10 border border-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transform transition-colors duration-300">
                                    Share Your Skill
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Quick Actions */}
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { to: "/upload", icon: Video, title: "Upload Video", text: "Share your skills", color: "text-purple-400" },
                        { to: "/skill-exchange", icon: Users, title: "Find a Mentor", text: "Connect with experts", color: "text-green-400" },
                        { to: "/community", icon: MessageCircle, title: "Discussions", text: "Engage with peers", color: "text-blue-400" },
                        { to: "/schedule", icon: Calendar, title: "Book a Session", text: "1-on-1 learning", color: "text-orange-400" },
                    ].map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Link to={item.to} className="group block p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-purple-500 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1">
                                <item.icon className={`h-8 w-8 mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
                                <h3 className="font-semibold text-slate-100">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.text}</p>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recommended Videos */}
                    <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <h2 className="text-3xl font-bold text-white mb-6">Jump Back In</h2>
                        <div className="space-y-4">
                            {mockVideos.map((video) => (
                                <motion.div 
                                    key={video.id}
                                    className="group flex items-center space-x-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="relative flex-shrink-0 w-40 h-24">
                                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-lg"/>
                                        <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{video.duration}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-100 truncate mb-1 group-hover:text-purple-400 transition-colors">{video.title}</h3>
                                        <p className="text-sm text-slate-400 mb-2">by {video.creator}</p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                                            <span className="flex items-center gap-1"><Eye size={16} /> {video.views.toLocaleString()}</span>
                                            <span className="flex items-center gap-1"><Heart size={16} /> {video.likes}</span>
                                            <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-current" /> {video.rating}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Progress Hub */}
                    <motion.div className="space-y-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                            <h2 className="text-xl font-bold text-white mb-4">Your Progress Hub</h2>
                            <div className="text-center mb-4">
                               <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{userXp}</div>
                               <div className="text-slate-400">Total XP</div>
                               <div className="mt-4 bg-slate-700 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
                               </div>
                               <div className="text-sm text-slate-400 mt-2">{xpToNext} XP to Level {userLevel + 1}</div>
                            </div>
                            <div className="space-y-4">
                                <SkillProgress skill="React Development" percentage={85} color="bg-purple-500" />
                                <SkillProgress skill="UI/UX Design" percentage={60} color="bg-blue-500" />
                                <SkillProgress skill="Photography" percentage={25} color="bg-green-500" />
                            </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
                            {userBadges.length > 0 ? (
                                <div className="space-y-3">
                                    {userBadges.map((badge, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="bg-yellow-500/10 p-2 rounded-full">
                                                <Award className="h-5 w-5 text-yellow-400" />
                                            </div>
                                            <span className="font-medium text-slate-300">{badge}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-slate-500">
                                    <Zap className="h-10 w-10 mx-auto mb-2" />
                                    <p>Start learning to unlock achievements!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;