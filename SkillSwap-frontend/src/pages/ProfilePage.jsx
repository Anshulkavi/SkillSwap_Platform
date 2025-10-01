// import React, { useState } from 'react';
// import { 
//   Settings, Video, Users, Clock, Star, Award, Plus, 
//   MessageCircle, Calendar
// } from 'lucide-react';

// // Mock videos for user profile
// const userVideos = [
//   {
//     id: 1,
//     title: 'Advanced React Hooks Tutorial',
//     thumbnail: '/api/placeholder/300/200',
//     views: 12500,
//     likes: 890,
//     duration: '15:32',
//     uploadDate: '2 weeks ago'
//   },
//   {
//     id: 2,
//     title: 'UI/UX Design Principles',
//     thumbnail: '/api/placeholder/300/200',
//     views: 8300,
//     likes: 654,
//     duration: '22:15',
//     uploadDate: '1 month ago'
//   },
//   {
//     id: 3,
//     title: 'JavaScript Best Practices',
//     thumbnail: '/api/placeholder/300/200',
//     views: 15600,
//     likes: 1200,
//     duration: '18:45',
//     uploadDate: '3 weeks ago'
//   },
//   {
//     id: 4,
//     title: 'Responsive Web Design',
//     thumbnail: '/api/placeholder/300/200',
//     views: 9400,
//     likes: 756,
//     duration: '28:30',
//     uploadDate: '1 week ago'
//   }
// ];

// const ProfilePage = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProfile, setEditedProfile] = useState({
//     name: user.name,
//     bio: 'Passionate full-stack developer and UI/UX enthusiast. Love sharing knowledge and learning new technologies.',
//     location: 'San Francisco, CA',
//     website: 'https://sarahjohnson.dev',
//     skills: [...user.skillsOffered, ...user.skillsLearning],
//     socialLinks: {
//       twitter: '@sarahdev',
//       linkedin: 'linkedin.com/in/sarahj',
//       github: 'github.com/sarahj'
//     }
//   });

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: Users },
//     { id: 'videos', label: 'My Videos', icon: Video },
//     { id: 'achievements', label: 'Achievements', icon: Award },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const handleSaveProfile = () => {
//     // Handle profile save logic here
//     console.log('Saving profile:', editedProfile);
//     setIsEditing(false);
//   };

//   const recentActivities = [
//     {
//       type: 'video',
//       action: 'Published "Advanced React Patterns" video',
//       timestamp: '2 days ago',
//       icon: Video
//     },
//     {
//       type: 'session',
//       action: 'Completed mentoring session with John Doe',
//       timestamp: '5 days ago',
//       icon: Users
//     },
//     {
//       type: 'community',
//       action: 'Answered 3 questions in Programming forum',
//       timestamp: '1 week ago',
//       icon: MessageCircle
//     },
//     {
//       type: 'achievement',
//       action: 'Earned "Community Leader" badge',
//       timestamp: '2 weeks ago',
//       icon: Award
//     }
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
//               <h1 className="text-2xl font-bold text-gray-800">{editedProfile.name}</h1>
//               <p className="text-gray-600">Level {user.level} • {user.xp.toLocaleString()} XP</p>
//               <p className="text-gray-600 mt-1">{editedProfile.location}</p>
//               {editedProfile.bio && (
//                 <p className="text-gray-700 mt-2 max-w-2xl">{editedProfile.bio}</p>
//               )}
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {user.badges.slice(0, 3).map((badge, index) => (
//                   <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
//                     {badge}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <button 
//                 onClick={() => setIsEditing(true)}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
//               >
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
//             {tabs.map((tab) => {
//               const IconComponent = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                     activeTab === tab.id
//                       ? 'border-purple-500 text-purple-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <IconComponent className="h-4 w-4" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="p-6">
//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Skills Section */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills I Offer</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {user.skillsOffered.map((skill, index) => (
//                       <span key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills I'm Learning</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {user.skillsLearning.map((skill, index) => (
//                       <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Recent Activity */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
//                   <div className="space-y-3">
//                     {recentActivities.map((activity, index) => {
//                       const IconComponent = activity.icon;
//                       return (
//                         <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//                           <div className="bg-white p-2 rounded-lg">
//                             <IconComponent className="h-4 w-4 text-purple-600" />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-sm font-medium text-gray-800">{activity.action}</p>
//                             <p className="text-xs text-gray-500">{activity.timestamp}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* Quick Actions */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
//                   <div className="space-y-2">
//                     <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
//                       <Plus className="h-4 w-4" />
//                       <span>Upload Video</span>
//                     </button>
//                     <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
//                       <Calendar className="h-4 w-4" />
//                       <span>Schedule Session</span>
//                     </button>
//                     <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                       <MessageCircle className="h-4 w-4" />
//                       <span>Message Students</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Learning Progress */}
//                 <div className="bg-white border border-gray-200 p-4 rounded-lg">
//                   <h3 className="font-semibold text-gray-800 mb-3">Learning Progress</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="text-sm font-medium text-gray-700">React Development</span>
//                         <span className="text-sm text-gray-500">85%</span>
//                       </div>
//                       <div className="bg-gray-200 rounded-full h-2">
//                         <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
//                         <span className="text-sm text-gray-500">60%</span>
//                       </div>
//                       <div className="bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="text-sm font-medium text-gray-700">Photography</span>
//                         <span className="text-sm text-gray-500">25%</span>
//                       </div>
//                       <div className="bg-gray-200 rounded-full h-2">
//                         <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Videos Tab */}
//           {activeTab === 'videos' && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800">My Videos ({userVideos.length})</h3>
//                 <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
//                   <Plus className="h-4 w-4" />
//                   <span>Upload New Video</span>
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {userVideos.map((video) => (
//                   <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
//                     <div className="relative">
//                       <img
//                         src={video.thumbnail}
//                         alt={video.title}
//                         className="w-full h-36 object-cover"
//                       />
//                       <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
//                         {video.duration}
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">{video.title}</h4>
//                       <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//                         <span>{video.views.toLocaleString()} views</span>
//                         <span>{video.likes} likes</span>
//                       </div>
//                       <p className="text-xs text-gray-500">Uploaded {video.uploadDate}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Achievements Tab */}
//           {activeTab === 'achievements' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-6">Achievements & Badges</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

//               {/* Progress Towards Next Badges */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h4 className="font-semibold text-gray-800 mb-4">Progress Towards Next Badges</h4>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm font-medium text-gray-700">Super Mentor (Teach 100 students)</span>
//                       <span className="text-sm text-gray-500">156/100 ✓</span>
//                     </div>
//                     <div className="bg-green-200 rounded-full h-2">
//                       <div className="bg-green-600 h-2 rounded-full w-full"></div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm font-medium text-gray-700">Video Master (Upload 50 videos)</span>
//                       <span className="text-sm text-gray-500">23/50</span>
//                     </div>
//                     <div className="bg-gray-200 rounded-full h-2">
//                       <div className="bg-purple-600 h-2 rounded-full" style={{ width: '46%' }}></div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm font-medium text-gray-700">Community Champion (Get 1000 likes)</span>
//                       <span className="text-sm text-gray-500">743/1000</span>
//                     </div>
//                     <div className="bg-gray-200 rounded-full h-2">
//                       <div className="bg-blue-600 h-2 rounded-full" style={{ width: '74%' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Settings Tab */}
//           {activeTab === 'settings' && (
//             <div className="space-y-8">
//               {/* Profile Settings */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
//                 {isEditing ? (
//                   <div className="bg-blue-50 p-6 rounded-lg space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
//                         <input
//                           type="text"
//                           value={editedProfile.name}
//                           onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                         <input
//                           type="text"
//                           value={editedProfile.location}
//                           onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
//                       <textarea
//                         value={editedProfile.bio}
//                         onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                         rows="3"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
//                       <input
//                         type="url"
//                         value={editedProfile.website}
//                         onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       />
//                     </div>
//                     <div className="flex space-x-3">
//                       <button 
//                         onClick={handleSaveProfile}
//                         className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
//                       >
//                         Save Changes
//                       </button>
//                       <button 
//                         onClick={() => setIsEditing(false)}
//                         className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
//                         <p className="text-gray-900">{editedProfile.name}</p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                         <p className="text-gray-900">{editedProfile.location}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
//                       <p className="text-gray-900">{editedProfile.bio}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
//                       <a href={editedProfile.website} className="text-purple-600 hover:underline">
//                         {editedProfile.website}
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Notification Settings */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
//                 <div className="space-y-4">
//                   <label className="flex items-center">
//                     <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Email notifications for new messages</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Push notifications for skill matches</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Weekly progress reports</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Session reminders</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Marketing emails</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Privacy Settings */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
//                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                       <option>Public - Anyone can view my profile</option>
//                       <option>Members Only - Only registered users can view</option>
//                       <option>Private - Only people I connect with</option>
//                     </select>
//                   </div>
//                   <label className="flex items-center">
//                     <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Show my online status</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Allow direct messages from anyone</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
//                     <span className="ml-3 text-sm text-gray-700">Show my location to other users</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Account Actions */}
//               <div className="border-t border-gray-200 pt-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
//                 <div className="space-y-3">
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                     Download My Data
//                   </button>
//                   <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
//                     Deactivate Account
//                   </button>
//                   <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
//                     Delete Account
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, Video, Users, Clock, Star, Award, Plus, 
  MessageCircle, Calendar
} from 'lucide-react';

// Mock videos for user profile
const userVideos = [
  {
    id: 1,
    title: 'Advanced React Hooks Tutorial',
    thumbnail: '/api/placeholder/300/200',
    views: 12500,
    likes: 890,
    duration: '15:32',
    uploadDate: '2 weeks ago'
  },
  {
    id: 2,
    title: 'UI/UX Design Principles',
    thumbnail: '/api/placeholder/300/200',
    views: 8300,
    likes: 654,
    duration: '22:15',
    uploadDate: '1 month ago'
  },
  {
    id: 3,
    title: 'JavaScript Best Practices',
    thumbnail: '/api/placeholder/300/200',
    views: 15600,
    likes: 1200,
    duration: '18:45',
    uploadDate: '3 weeks ago'
  },
  {
    id: 4,
    title: 'Responsive Web Design',
    thumbnail: '/api/placeholder/300/200',
    views: 9400,
    likes: 756,
    duration: '28:30',
    uploadDate: '1 week ago'
  }
];

const ProfilePage = () => {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    bio: 'Passionate full-stack developer and UI/UX enthusiast. Love sharing knowledge and learning new technologies.',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    skills: [...(user?.skillsOffered || []), ...(user?.skillsLearning || [])],
    socialLinks: {
      twitter: '@sarahdev',
      linkedin: 'linkedin.com/in/sarahj',
      github: 'github.com/sarahj'
    }
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'videos', label: 'My Videos', icon: Video },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSaveProfile = () => {
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const recentActivities = [
    {
      type: 'video',
      action: 'Published "Advanced React Patterns" video',
      timestamp: '2 days ago',
      icon: Video
    },
    {
      type: 'session',
      action: 'Completed mentoring session with John Doe',
      timestamp: '5 days ago',
      icon: Users
    },
    {
      type: 'community',
      action: 'Answered 3 questions in Programming forum',
      timestamp: '1 week ago',
      icon: MessageCircle
    },
    {
      type: 'achievement',
      action: 'Earned "Community Leader" badge',
      timestamp: '2 weeks ago',
      icon: Award
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-32"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white -mt-12 bg-white"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{editedProfile.name}</h1>
              <p className="text-gray-600">Level {user.level} • {user.xp?.toLocaleString()} XP</p>
              <p className="text-gray-600 mt-1">{editedProfile.location}</p>
              {editedProfile.bio && (
                <p className="text-gray-700 mt-2 max-w-2xl">{editedProfile.bio}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {(user.badges || []).slice(0, 3).map((badge, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Edit Profile
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">23</div>
          <div className="text-sm text-gray-600">Videos Created</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">156</div>
          <div className="text-sm text-gray-600">Students Taught</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">42h</div>
          <div className="text-sm text-gray-600">Teaching Hours</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">4.9</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills I Offer</h3>
                  <div className="flex flex-wrap gap-3">
                    {(user.skillsOffered || []).map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills I'm Learning</h3>
                  <div className="flex flex-wrap gap-3">
                    {(user.skillsLearning || []).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-white p-2 rounded-lg">
                            <IconComponent className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Upload Video</span>
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Schedule Session</span>
                    </button>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>Message Students</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">My Videos ({userVideos.length})</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Upload New Video</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userVideos.map((video) => (
                  <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">{video.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>{video.likes} likes</span>
                      </div>
                      <p className="text-xs text-gray-500">Uploaded {video.uploadDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Achievements & Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {(user.badges || []).map((badge, index) => (
                  <div key={index} className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-xl border border-yellow-200">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-800 mb-2">{badge}</h4>
                      <p className="text-sm text-gray-600">Earned by completing specific milestones</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
                {isEditing ? (
                  <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={editedProfile.location}
                          onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows="3"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleSaveProfile}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <p className="text-gray-900">{editedProfile.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <p className="text-gray-900">{editedProfile.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
