// my code

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Settings, Video, Users, Clock, Star, Award, Plus,
//   MessageCircle, Calendar, Upload, X, GraduationCap, BookOpen, FileText
// } from 'lucide-react';

// const useAuth = () => ({
//   user: {
//     id: '123',
//     name: 'Sarah Johnson',
//     email: 'sarah.johnson@example.com',
//     avatar: '/api/placeholder/150/150',
//     level: 15,
//     xp: 12450,
//     badges: ['Early Adopter', 'Top Contributor', 'Mentor', 'Community Helper', 'Bug Squasher', 'Beta Tester'],
//     skillsOffered: ['React', 'JavaScript', 'UI/UX Design'],
//     skillsLearning: ['Python', 'Machine Learning', 'Photography'],
//     bio: 'Passionate full-stack developer and UI/UX enthusiast. Love sharing knowledge and learning new technologies.',
//     location: 'San Francisco, CA',
//     website: 'https://sarahjohnson.dev',
//     phone: '+1 (555) 123-4567',
//     education: {
//       tenth: { school: 'City High School', board: 'CBSE', percentage: '92%', year: '2014' },
//       twelfth: { school: 'City High School', board: 'CBSE', percentage: '88%', year: '2016' },
//       graduation: { college: 'State University', degree: 'B.Tech', specialization: 'Computer Science', cgpa: '8.5', year: '2020' },
//       postGraduation: { college: '', degree: '', specialization: '', cgpa: '', year: '' }
//     }
//   }
// });

// const userVideos = [
//   { id: 1, title: 'Advanced React Hooks Tutorial', thumbnail: '/api/placeholder/300/200', views: 12500, likes: 890, duration: '15:32', uploadDate: '2 weeks ago' },
//   { id: 2, title: 'UI/UX Design Principles', thumbnail: '/api/placeholder/300/200', views: 8300, likes: 654, duration: '22:15', uploadDate: '1 month ago' },
//   { id: 3, title: 'JavaScript Best Practices', thumbnail: '/api/placeholder/300/200', views: 15600, likes: 1200, duration: '18:45', uploadDate: '3 weeks ago' },
//   { id: 4, title: 'Responsive Web Design', thumbnail: '/api/placeholder/300/200', views: 9400, likes: 756, duration: '28:30', uploadDate: '1 week ago' }
// ];

// export default function ProfilePage() {
//   const { user } = useAuth();

//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(user?.avatar || '/api/placeholder/150/150');
//   const [newSkill, setNewSkill] = useState('');

//   const [editedProfile, setEditedProfile] = useState({
//     name: '',
//     bio: '',
//     location: '',
//     website: '',
//     email: '',
//     phone: '',
//     skills: [],
//     resume: null,
//     resumeName: '',
//     education: {
//       tenth: { school: '', board: '', percentage: '', year: '' },
//       twelfth: { school: '', board: '', percentage: '', year: '' },
//       graduation: { college: '', degree: '', specialization: '', cgpa: '', year: '' },
//       postGraduation: { college: '', degree: '', specialization: '', cgpa: '', year: '' }
//     }
//   });

//   // Populate the form with user data when the component mounts or user data changes
//   useEffect(() => {
//     if (user) {
//       setEditedProfile({
//         name: user.name || '',
//         bio: user.bio || '',
//         location: user.location || '',
//         website: user.website || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         skills: [...(user.skillsOffered || []), ...(user.skillsLearning || [])],
//         resume: null,
//         resumeName: user.resumeName || '',
//         education: user.education || editedProfile.education
//       });
//       setProfilePhoto(user.avatar);
//     }
//   }, [user]);

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: Users },
//     { id: 'profile', label: 'Edit Profile', icon: Settings },
//     { id: 'videos', label: 'My Videos', icon: Video },
//     { id: 'achievements', label: 'Achievements', icon: Award }
//   ];

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfilePhoto(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleResumeUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditedProfile({ ...editedProfile, resume: file, resumeName: file.name });
//     }
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
//       setEditedProfile({ ...editedProfile, skills: [...editedProfile.skills, newSkill.trim()] });
//       setNewSkill('');
//     }
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setEditedProfile({ ...editedProfile, skills: editedProfile.skills.filter(skill => skill !== skillToRemove) });
//   };

//   const handleSaveProfile = async () => {
//     // This is where you would handle the database submission.
//     // The `editedProfile` state contains all the text data.
//     // The `profilePhoto` state might need to be uploaded first to get a URL.
//     // The `editedProfile.resume` contains the file object for the resume.

//     try {
//       console.log('Saving profile to database...');

//       const formData = new FormData();

//       // Append all text fields
//       Object.keys(editedProfile).forEach(key => {
//         if (key === 'skills' || key === 'education') {
//           formData.append(key, JSON.stringify(editedProfile[key]));
//         } else if (key !== 'resume') {
//           formData.append(key, editedProfile[key]);
//         }
//       });

//       // Append resume file if it exists
//       if (editedProfile.resume) {
//         formData.append('resume', editedProfile.resume, editedProfile.resumeName);
//       }

//       // Handle profile photo upload
//       formData.append('avatar', profilePhoto);

//       // --- Mock API Call ---
//       // Replace this with our actual fetch or axios call
//       // e.g., const response = await fetch('/api/user/profile', { method: 'PUT', body: formData });
//       console.log('Data to be sent:', Object.fromEntries(formData.entries()));
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
//       // --- End of Mock API Call ---

//       alert('Profile saved successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       alert('Failed to save profile. Please try again.');
//     }
//   };

//   const handleEducationChange = (level, field, value) => {
//     setEditedProfile(prev => ({
//       ...prev,
//       education: { ...prev.education, [level]: { ...prev.education[level], [field]: value } }
//     }));
//   };

//   const recentActivities = [
//     { action: 'Published "Advanced React Patterns" video', timestamp: '2 days ago', icon: Video },
//     { action: 'Completed mentoring session with John Doe', timestamp: '5 days ago', icon: Users },
//     { action: 'Answered 3 questions in Programming forum', timestamp: '1 week ago', icon: MessageCircle },
//     { action: 'Earned "Community Leader" badge', timestamp: '2 weeks ago', icon: Award }
//   ];

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//         {/* --- Profile Header & Edit Section --- */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//           <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-15"></div>
//           <div className="relative px-6 py-4">
//             <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
//               <div className="relative group">
//                 <img src={profilePhoto} alt={user.name} className="h-28 w-28 rounded-full border-4 border-white -mt-16 bg-white object-cover shadow-md" />
//                 {isEditing && (
//                   <label className="absolute inset-0 -mt-16 flex items-center justify-center bg-black bg-opacity-60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <Upload className="h-8 w-8 text-white" />
//                     <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
//                   </label>
//                 )}
//               </div>
//               <div className="flex-1 text-center sm:text-left">
//                 {isEditing ? (
//                   <input type="text" value={editedProfile.name} onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})} className="text-3xl font-bold text-gray-800 border-b-2 border-purple-500 focus:outline-none bg-transparent w-full sm:w-auto" />
//                 ) : (
//                   <h1 className="text-3xl font-bold text-gray-800">{editedProfile.name}</h1>
//                 )}
//                 <p className="text-gray-500">Level {user.level} • {user.xp?.toLocaleString()} XP</p>
//                 {isEditing ? (
//                   <textarea value={editedProfile.bio} onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})} className="w-full text-gray-700 mt-2 max-w-2xl border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" rows="2" placeholder="Tell us about yourself..." />
//                 ) : (
//                   editedProfile.bio && <p className="text-gray-600 mt-2 max-w-2xl">{editedProfile.bio}</p>
//                 )}
//               </div>
//               <div className="flex space-x-3 self-center sm:self-end">
//                 {isEditing ? (
//                   <>
//                     <button onClick={handleSaveProfile} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md">Save</button>
//                     <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors">Cancel</button>
//                   </>
//                 ) : (
//                   <button onClick={() => setIsEditing(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md flex items-center gap-2"><Settings size={16}/>Edit Profile</button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* --- Main Content with Tabs --- */}
//         <div className="bg-white rounded-xl shadow-lg">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-2 sm:space-x-8 px-6 overflow-x-auto">
//               {tabs.map((tab) => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
//                     <IconComponent className="h-5 w-5" />
//                     <span>{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>

//           <div className="p-6">
//             <AnimatePresence mode="wait">
//               {activeTab === 'overview' && (
//                 <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid lg:grid-cols-3 gap-8">
//                   <div className="lg:col-span-2 space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
//                       <div className="flex flex-wrap gap-3">
//                         {editedProfile.skills.map((skill, idx) => (
//                           <motion.span key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">{skill}</motion.span>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
//                       <div className="space-y-3">
//                         {recentActivities.map((activity, idx) => {
//                           const IconComponent = activity.icon;
//                           return (
//                             <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
//                               <div className="bg-white p-2 rounded-full shadow-sm"><IconComponent className="h-5 w-5 text-purple-600" /></div>
//                               <div className="flex-1">
//                                 <p className="text-sm font-medium text-gray-800">{activity.action}</p>
//                                 <p className="text-xs text-gray-500">{activity.timestamp}</p>
//                               </div>
//                             </motion.div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//                       <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
//                       <div className="space-y-2">
//                         <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"><Plus className="h-4 w-4" /><span>Upload Video</span></button>
//                         <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"><Calendar className="h-4 w-4" /><span>Schedule Session</span></button>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'profile' && (
//                 <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">

//                   {/* Skills Section */}
//                   <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><BookOpen className="h-5 w-5 mr-2" />Skills</h3>
//                     <div className="mb-4">
//                       <div className="flex flex-col sm:flex-row gap-2">
//                         <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Add a new skill..." />
//                         <button onClick={handleAddSkill} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"><Plus className="h-4 w-4 mr-1" />Add</button>
//                       </div>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       <AnimatePresence>
//                         {editedProfile.skills.map((skill) => (
//                           <motion.div key={skill} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
//                             {skill}
//                             <button onClick={() => handleRemoveSkill(skill)} className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button>
//                           </motion.div>
//                         ))}
//                       </AnimatePresence>
//                     </div>
//                   </div>

//                   {/* Resume Section */}
//                   <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><FileText className="h-5 w-5 mr-2" />Resume</h3>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
//                       <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                       <label className="cursor-pointer">
//                         <span className="text-purple-600 hover:text-purple-700 font-medium">Click to upload your resume</span>
//                         <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
//                       </label>
//                       <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
//                       {editedProfile.resumeName && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm">
//                           <FileText className="h-4 w-4 text-purple-600" />
//                           <span className="font-medium">{editedProfile.resumeName}</span>
//                         </motion.div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Education Sections */}
//                   {['tenth', 'twelfth'].map((level) => (
//                     <div key={level} className="bg-gray-50 p-6 rounded-lg shadow-inner">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                         <GraduationCap className="h-5 w-5 mr-2" />{level === 'tenth' ? '10th Standard Details' : '12th Standard Details'}
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input type="text" value={editedProfile.education[level].school} onChange={(e) => handleEducationChange(level, 'school', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="School Name" />
//                         <input type="text" value={editedProfile.education[level].board} onChange={(e) => handleEducationChange(level, 'board', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Board (e.g., CBSE)" />
//                         <input type="text" value={editedProfile.education[level].percentage} onChange={(e) => handleEducationChange(level, 'percentage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Percentage" />
//                         <input type="text" value={editedProfile.education[level].year} onChange={(e) => handleEducationChange(level, 'year', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Year of Passing" />
//                       </div>
//                     </div>
//                   ))}

//                   {['graduation', 'postGraduation'].map((level) => (
//                     <div key={level} className="bg-gray-50 p-6 rounded-lg shadow-inner">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                         <GraduationCap className="h-5 w-5 mr-2" />{level === 'graduation' ? 'Graduation Details' : 'Post Graduation Details'}
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input type="text" value={editedProfile.education[level].college} onChange={(e) => handleEducationChange(level, 'college', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="College/University Name" />
//                         <input type="text" value={editedProfile.education[level].degree} onChange={(e) => handleEducationChange(level, 'degree', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Degree (e.g., B.Tech)" />
//                         <input type="text" value={editedProfile.education[level].specialization} onChange={(e) => handleEducationChange(level, 'specialization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Specialization (e.g., Computer Science)" />
//                         <input type="text" value={editedProfile.education[level].cgpa} onChange={(e) => handleEducationChange(level, 'cgpa', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="CGPA / Percentage" />
//                         <input type="text" value={editedProfile.education[level].year} onChange={(e) => handleEducationChange(level, 'year', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Year of Passing" />
//                       </div>
//                     </div>
//                   ))}

//                   <div className="flex justify-end pt-4">
//                     <button onClick={handleSaveProfile} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl text-lg">
//                       Save All Changes
//                     </button>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'videos' && (
//                 <motion.div key="videos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                     <h3 className="text-xl font-semibold text-gray-800">My Videos ({userVideos.length})</h3>
//                     <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Upload New Video</span></button>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {userVideos.map((video) => (
//                       <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer bg-white">
//                         <div className="relative">
//                           <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
//                           <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">{video.duration}</div>
//                         </div>
//                         <div className="p-4">
//                           <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">{video.title}</h4>
//                           <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//                             <span>{video.views.toLocaleString()} views</span>
//                             <span>{video.likes} likes</span>
//                           </div>
//                           <p className="text-xs text-gray-400">Uploaded {video.uploadDate}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'achievements' && (
//                 <motion.div key="achievements" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-6">Achievements & Badges</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {user.badges.map((badge, idx) => (
//                       <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 hover:shadow-md transition-all">
//                         <div className="p-3 bg-purple-100 rounded-full mb-3">
//                             <Award className="h-8 w-8 text-purple-600"/>
//                         </div>
//                         <h4 className="font-semibold text-gray-800 text-sm">{badge}</h4>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// theam black

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Video,
  Users,
  Award,
  Plus,
  MessageCircle,
  Calendar,
  Upload,
} from "lucide-react";
import EditProfile from "../components/EditProfile";
import { useAuth } from "../context/AuthContext"; 

const userVideos = [
  {
    id: 1,
    title: "Advanced React Hooks Tutorial",
    thumbnail: "/api/placeholder/300/200",
    views: 12500,
    likes: 890,
    duration: "15:32",
    uploadDate: "2 weeks ago",
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    thumbnail: "/api/placeholder/300/200",
    views: 8300,
    likes: 654,
    duration: "22:15",
    uploadDate: "1 month ago",
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    thumbnail: "/api/placeholder/300/200",
    views: 15600,
    likes: 1200,
    duration: "18:45",
    uploadDate: "3 weeks ago",
  },
  {
    id: 4,
    title: "Responsive Web Design",
    thumbnail: "/api/placeholder/300/200",
    views: 9400,
    likes: 756,
    duration: "28:30",
    uploadDate: "1 week ago",
  },
];

export default function ProfilePage() {
  const { user: authUser } = useAuth() || {};

  const fallbackUser = {
    id: "123",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/api/placeholder/150/150",
    level: 15,
    xp: 12450,
    badges: [
      "Early Adopter",
      "Top Contributor",
      "Mentor",
      "Community Helper",
      "Bug Squasher",
      "Beta Tester",
    ],
    skills: ["React", "JavaScript", "UI/UX Design"],
    bio: "Passionate full-stack developer and UI/UX enthusiast.",
    education: {},
  };

  const user = authUser || fallbackUser;

  const [activeTab, setActiveTab] = useState("overview");
  const [newSkill, setNewSkill] = useState("");
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
    skills: [],
    education: {},
    resumeName: "",
  });

  //  Initialize profile state from user
  const resetProfileState = useCallback(() => {
    if (user) {
      setEditedProfile({
        name: user.name || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        skills: user.skills || [],
        education: user.education || {},
        resumeName: user.resumeName || "",
      });
    }
  }, [user]);

  useEffect(() => {
    resetProfileState();
  }, [resetProfileState]);

  // Save / Cancel handlers
  const handleSaveProfile = () => {
    console.log("Saving profile data:", editedProfile);
    setActiveTab("overview");
  };

  const handleCancelEdit = () => {
    resetProfileState();
    setActiveTab("overview");
  };

  // Input handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile((prev) => ({ ...prev, resumeName: file.name }));
      console.log("Resume file selected:", file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleEducationChange = (level, field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...(prev.education?.[level] || {}),
          [field]: value,
        },
      },
    }));
  };

  const recentActivities = [
    {
      action: 'Published "Advanced React Patterns" video',
      timestamp: "2 days ago",
      icon: Video,
    },
    {
      action: "Completed mentoring session with John Doe",
      timestamp: "5 days ago",
      icon: Users,
    },
    {
      action: "Answered 3 questions in Programming forum",
      timestamp: "1 week ago",
      icon: MessageCircle,
    },
    {
      action: 'Earned "Community Leader" badge',
      timestamp: "2 weeks ago",
      icon: Award,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "profile", label: "Edit Profile", icon: Settings },
    { id: "videos", label: "My Videos", icon: Video },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-20"></div>
          <div className="relative px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <img
                  src={editedProfile.avatar}
                  // alt={editedProfile.name}
                  className="h-28 w-28 rounded-full border-4 border-slate-800 -mt-16 bg-slate-700 object-cover"
                />
                {activeTab === "profile" && (
                  <label className="absolute inset-0 -mt-16 flex items-center justify-center bg-black bg-opacity-60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="h-8 w-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-4xl font-bold text-white">
                  {editedProfile.name}
                </h1>
                <p className="text-slate-400">
                  Level {user.level} • {user.xp?.toLocaleString()} XP
                </p>
                <p className="text-slate-300 mt-2 max-w-2xl">
                  {editedProfile.bio}
                </p>
              </div>

              <div className="flex space-x-3 self-center sm:self-end">
                <button
                  onClick={() => {
                    setActiveTab("profile");
                    setTimeout(() => {
                      const section = document.getElementById(
                        "edit-profile-section"
                      );
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 200);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <Settings size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="border-b border-slate-700">
            <nav className="flex space-x-2 sm:space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-400"
                        : "border-transparent text-slate-400 hover:text-purple-400 hover:border-purple-400/50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
            
              {/* Overview */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid lg:grid-cols-3 gap-8"
                >
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Skills Offer
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {editedProfile.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Recent Activity
                      </h3>
                      <div className="space-y-3">
                        {recentActivities.map((activity, idx) => {
                          const IconComponent = activity.icon;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              <div className="bg-slate-700 p-2 rounded-full">
                                <IconComponent className="h-5 w-5 text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-slate-200">
                                  {activity.action}
                                </p>
                                <p className="text-sm text-slate-400">
                                  {activity.timestamp}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                </motion.div>
              )}

              {/* Edit Profile Section */}
              {activeTab === "profile" && (
                <EditProfile
                  editedProfile={editedProfile}
                  onProfileChange={handleProfileChange}
                  onPhotoUpload={handlePhotoUpload}
                  onSave={handleSaveProfile}
                  onCancel={handleCancelEdit}
                  newSkill={newSkill}
                  setNewSkill={setNewSkill}
                  onAddSkill={handleAddSkill}
                  onRemoveSkill={handleRemoveSkill}
                  onEducationChange={handleEducationChange}
                  onResumeUpload={handleResumeUpload}
                />
              )}

              {/* Videos */}
              {activeTab === "videos" && (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="text-2xl font-bold text-slate-100">
                      My Videos ({userVideos.length})
                    </h3>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Upload New Video</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userVideos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-slate-100 mb-2 line-clamp-2 h-12">
                            {video.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                            <span>{video.views.toLocaleString()} views</span>
                            <span>{video.likes} likes</span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Uploaded {video.uploadDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Achievements */}
              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold text-slate-100 mb-6">
                    Achievements & Badges
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {user.badges.map((badge, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col items-center text-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500/50 transition-all"
                      >
                        <div className="p-3 bg-slate-700 rounded-full mb-3">
                          <Award className="h-8 w-8 text-purple-400" />
                        </div>
                        <h4 className="font-semibold text-slate-200 text-sm">
                          {badge}
                        </h4>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
