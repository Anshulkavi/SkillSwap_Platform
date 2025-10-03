// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Home, User, Video, MessageCircle, Trophy, Search, Bell, 
//   BookOpen, Users, Menu, X, LogOut, Settings
// } from 'lucide-react';

// const Header = ({ user }) => {
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const navItems = [
//     { id: '/', label: 'Home', icon: Home },
//     { id: '/videos', label: 'Videos', icon: Video },
//     { id: '/skill-exchange', label: 'Skill Exchange', icon: Users },
//     { id: '/community', label: 'Community', icon: MessageCircle },
//     { id: '/leaderboard', label: 'Leaderboard', icon: Trophy }
//   ];

//   const isActivePath = (path) => {
//     if (path === '/') {
//       return location.pathname === '/';
//     }
//     return location.pathname.startsWith(path);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
//               <BookOpen className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               SkillSwap+
//             </span>
//           </Link>

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
//               const isActive = isActivePath(item.id);
//               return (
//                 <Link
//                   key={item.id}
//                   to={item.id}
//                   className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-purple-100 text-purple-700'
//                       : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <IconComponent className="h-5 w-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               );
//             })}
            
//             <button className="relative p-2 text-gray-600 hover:text-purple-600">
//               <Bell className="h-5 w-5" />
//               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
//             </button>
            
//             {/* User Profile Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowProfileMenu(!showProfileMenu)}
//                 className="flex items-center space-x-3 cursor-pointer focus:outline-none"
//               >
//                 <img
//                   src={user?.avatar || '/api/placeholder/40/40'}
//                   alt={user?.name || 'User'}
//                   className="h-8 w-8 rounded-full border-2 border-purple-200"
//                 />
//                 <div className="hidden lg:block text-left">
//                   <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
//                   <p className="text-xs text-gray-500">Level {user?.level || 1}</p>
//                 </div>
//               </button>

//               {/* Dropdown Menu */}
//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-50">
//                   <Link
//                     to="/profile"
//                     onClick={() => setShowProfileMenu(false)}
//                     className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <User className="h-4 w-4 mr-3" />
//                     My Profile
//                   </Link>
//                   <Link
//                     to="/settings"
//                     onClick={() => setShowProfileMenu(false)}
//                     className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <Settings className="h-4 w-4 mr-3" />
//                     Settings
//                   </Link>
//                   <hr className="my-1" />
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                   >
//                     <LogOut className="h-4 w-4 mr-3" />
//                     Logout
//                   </button>
//                 </div>
//               )}
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

//         {/* Mobile Search Bar */}
//         <div className="md:hidden pb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search skills, videos, or creators..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {showMobileMenu && (
//           <div className="md:hidden pb-4">
//             <div className="flex flex-col space-y-2">
//               {navItems.map((item) => {
//                 const IconComponent = item.icon;
//                 const isActive = isActivePath(item.id);
//                 return (
//                   <Link
//                     key={item.id}
//                     to={item.id}
//                     onClick={() => setShowMobileMenu(false)}
//                     className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                       isActive
//                         ? 'bg-purple-100 text-purple-700'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <IconComponent className="h-5 w-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 );
//               })}
              
//               {/* Mobile User Menu */}
//               <div className="border-t border-gray-200 pt-4 mt-4">
//                 <Link
//                   to="/profile"
//                   onClick={() => setShowMobileMenu(false)}
//                   className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
//                 >
//                   <img
//                     src={user?.avatar || '/api/placeholder/40/40'}
//                     alt={user?.name || 'User'}
//                     className="h-8 w-8 rounded-full border-2 border-purple-200"
//                   />
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
//                     <p className="text-xs text-gray-500">Level {user?.level || 1}</p>
//                   </div>
//                 </Link>
                
//                 <Link
//                   to="/settings"
//                   onClick={() => setShowMobileMenu(false)}
//                   className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mt-2"
//                 >
//                   <Settings className="h-5 w-5" />
//                   <span className="font-medium">Settings</span>
//                 </Link>

//                 <button
//                   onClick={() => {
//                     setShowMobileMenu(false);
//                     handleLogout();
//                   }}
//                   className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg mt-2 w-full"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Click outside to close dropdown */}
//       {showProfileMenu && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setShowProfileMenu(false)}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, User, Video, MessageCircle, Trophy, Search, Bell, 
    BookOpen, Users, Menu, X, LogOut, Settings
} from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth(); // Assuming useAuth provides the user object
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close menus on route change
    useEffect(() => {
        setShowMobileMenu(false);
        setShowProfileMenu(false);
    }, [location.pathname]);

    const navItems = [
        { id: '/', label: 'Home', icon: Home },
        { id: '/videos', label: 'Videos', icon: Video },
        { id: '/skill-exchange', label: 'Skill Exchange', icon: Users },
        { id: '/community', label: 'Community', icon: MessageCircle },
        { id: '/leaderboard', label: 'Leaderboard', icon: Trophy }
    ];

    const isActivePath = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } }
    };

    const profileMenuVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: 'easeIn' } }
    };
    
    // Mock user for styling if not logged in
    const displayUser = user || { name: 'Guest User', level: 1, avatar: 'https://i.pravatar.cc/40' };

    return (
        <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/80 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">SkillSwap+</span>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search skills, videos..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.id}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                                    isActivePath(item.id)
                                        ? 'bg-slate-700/50 text-purple-400'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-purple-400'
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right side icons & Profile */}
                    <div className="flex items-center space-x-4 ml-4">
                         <button className="hidden md:block relative p-2 text-slate-300 hover:text-purple-400 transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                        
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center space-x-3 cursor-pointer focus:outline-none rounded-full p-1 transition-all duration-300 hover:bg-slate-800"
                            >
                                <img
                                    src={displayUser.avatar}
                                    alt={displayUser.name}
                                    className="h-9 w-9 rounded-full border-2 border-slate-600 group-hover:border-purple-500 transition-colors"
                                />
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        variants={profileMenuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute right-0 mt-2 w-56 bg-slate-800/90 backdrop-blur-lg rounded-lg shadow-lg border border-slate-700 z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-700">
                                            <p className="text-sm font-semibold text-white">{displayUser.name}</p>
                                            <p className="text-xs text-slate-400">Level {displayUser.level}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/80">
                                                <User className="h-4 w-4 mr-3" /> My Profile
                                            </Link>
                                            <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/80">
                                                <Settings className="h-4 w-4 mr-3" /> Settings
                                            </Link>
                                            <hr className="border-slate-700 my-1" />
                                            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
                                                <LogOut className="h-4 w-4 mr-3" /> Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                         {/* Mobile Menu Button */}
                        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-2 text-slate-300">
                            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-700"
                    >
                        <div className="p-6 flex flex-col space-y-2">
                           {navItems.map((item) => (
                                <Link
                                    key={`mobile-${item.id}`}
                                    to={item.id}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                                        isActivePath(item.id) ? 'bg-slate-800 text-purple-400' : 'text-slate-200 hover:bg-slate-800'
                                    }`}
                                >
                                    <item.icon className="h-6 w-6" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            <div className="border-t border-slate-700 pt-4 mt-2">
                                <Link to="/profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
                                    <User className="h-6 w-6 text-slate-400" />
                                    <span className="text-lg font-medium text-slate-200">My Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 px-4 py-3 w-full hover:bg-slate-800 rounded-lg"
                                >
                                    <LogOut className="h-6 w-6 text-red-400" />
                                    <span className="text-lg font-medium text-red-400">Logout</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;