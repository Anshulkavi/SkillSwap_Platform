import React, { act, useState } from "react";
import {
  Settings,
  Video,
  Users,
  Clock,
  Star,
  Award,
  Plus,
  MessageCircle,
  Calendar,
  Edit,
  Camera,
  MapPin,
  Globe,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  TrendingUp,
  Eye,
  Heart,
  BookOpen,
  Download,
  Share2,
  Bell,
  Shield,
  Key,
  CreditCard,
  HelpCircle,
  LogOut,
  Check,
  X,
  AlertTriangle,
  Save,
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; 
import LeaderboardPage from "./LeaderboardPage";


// Mock videos for user profile
const userVideos = [
  {
    id: 1,
    title: "Advanced React Hooks Tutorial",
    thumbnail: "/api/placeholder/300/200",
    views: 12500,
    likes: 890,
    duration: "15:32",
    uploadDate: "2 weeks ago",
    status: "published",
    category: "Programming",
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    thumbnail: "/api/placeholder/300/200",
    views: 8300,
    likes: 654,
    duration: "22:15",
    uploadDate: "1 month ago",
    status: "published",
    category: "Design",
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    thumbnail: "/api/placeholder/300/200",
    views: 15600,
    likes: 1200,
    duration: "18:45",
    uploadDate: "3 weeks ago",
    status: "published",
    category: "Programming",
  },
  {
    id: 4,
    title: "Responsive Web Design",
    thumbnail: "/api/placeholder/300/200",
    views: 9400,
    likes: 756,
    duration: "28:30",
    uploadDate: "1 week ago",
    status: "published",
    category: "Design",
  },
  {
    id: 5,
    title: "React Performance Optimization",
    thumbnail: "/api/placeholder/300/200",
    views: 0,
    likes: 0,
    duration: "19:20",
    uploadDate: "Draft",
    status: "draft",
    category: "Programming",
  },
  {
    id: 6,
    title: "CSS Grid Layout Mastery",
    thumbnail: "/api/placeholder/300/200",
    views: 6200,
    likes: 445,
    duration: "25:10",
    uploadDate: "5 days ago",
    status: "published",
    category: "Design",
  },
];

// Mock skill exchange sessions
const mockSessions = [
  {
    id: 1,
    partner: "Alex Chen",
    partnerAvatar: "/api/placeholder/40/40",
    skill: "React Development",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "60 min",
    status: "completed",
    rating: 5,
  },
  {
    id: 2,
    partner: "Emma Wilson",
    partnerAvatar: "/api/placeholder/40/40",
    skill: "Digital Art",
    date: "2024-01-18",
    time: "4:00 PM",
    duration: "90 min",
    status: "upcoming",
    rating: null,
  },
  {
    id: 3,
    partner: "David Kim",
    partnerAvatar: "/api/placeholder/40/40",
    skill: "Photography",
    date: "2024-01-12",
    time: "10:00 AM",
    duration: "45 min",
    status: "completed",
    rating: 4,
  },
];

// Mock achievements with progress
const allAchievements = [
  {
    id: 1,
    name: "Video Master",
    description: "Upload 50 videos",
    icon: "🎥",
    progress: 23,
    target: 50,
    earned: false,
    category: "Content Creation",
  },
  {
    id: 2,
    name: "Mentor",
    description: "Teach 25 students",
    icon: "👨‍🏫",
    progress: 156,
    target: 25,
    earned: true,
    category: "Teaching",
  },
  {
    id: 3,
    name: "Community Leader",
    description: "Get 100 likes on posts",
    icon: "🌟",
    progress: 743,
    target: 100,
    earned: true,
    category: "Community",
  },
  {
    id: 4,
    name: "Super Mentor",
    description: "Teach 100 students",
    icon: "🏆",
    progress: 156,
    target: 100,
    earned: true,
    category: "Teaching",
  },
  {
    id: 5,
    name: "Content Creator",
    description: "Get 10,000 video views",
    icon: "📈",
    progress: 46200,
    target: 10000,
    earned: true,
    category: "Content Creation",
  },
  {
    id: 6,
    name: "Skill Master",
    description: "Master 5 different skills",
    icon: "🎯",
    progress: 3,
    target: 5,
    earned: false,
    category: "Learning",
  },
];

// Old way (receiving as prop)
// const CommunityPage = ({ user }) => { ... }

// New way (using hook)
const CommunityPage = () => {
  const { user } = useAuth(); // ... rest of component

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || "",
    bio: "Passionate full-stack developer...",
    location: "San Francisco, CA",
    website: "https://sarahjohnson.dev",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    skills: [...(user?.skillsOffered || []), ...(user?.skillsLearning || [])],
    socialLinks: {
      twitter: "@sarahdev",
      linkedin: "linkedin.com/in/sarahj",
      github: "github.com/sarahj",
      instagram: "@sarahcodes",
    },
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showOnlineStatus: true,
    allowDirectMessages: true,
    showLocation: false,
    showEmail: false,
  });

const tabs = [
  { id: "overview", label: "Overview", icon: Users },
  { id: "videos", label: "My Videos", icon: Video },
  { id: "sessions", label: "Sessions", icon: Calendar },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "leaderboard", label: "Leaderboard", icon: Star },
  
];

  const handleSaveProfile = () => {
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const recentActivities = [
    {
      type: "video",
      action: 'Published "Advanced React Patterns" video',
      timestamp: "2 days ago",
      icon: Video,
      color: "purple",
    },
    {
      type: "session",
      action: "Completed mentoring session with John Doe",
      timestamp: "5 days ago",
      icon: Users,
      color: "green",
    },
    {
      type: "community",
      action: "Answered 3 questions in Programming forum",
      timestamp: "1 week ago",
      icon: MessageCircle,
      color: "blue",
    },
    {
      type: "achievement",
      action: 'Earned "Community Leader" badge',
      timestamp: "2 weeks ago",
      icon: Award,
      color: "yellow",
    },
    {
      type: "skill",
      action: 'Added "Machine Learning" to learning goals',
      timestamp: "3 weeks ago",
      icon: BookOpen,
      color: "indigo",
    },
  ];

  // Analytics data
  const analyticsData = {
    totalViews: 46200,
    totalLikes: 3540,
    totalComments: 892,
    totalShares: 567,
    averageRating: 4.8,
    completionRate: 89,
    monthlyGrowth: 23,
    topVideo: "JavaScript Best Practices",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Skills Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Skills I Offer
                  </h3>
                  {(user?.skillsOffered ?? []).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <span>{skill}</span>
                      <Star className="h-3 w-3 text-green-600" />
                    </span>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Skills I'm Learning
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(user?.skillsLearning ?? []).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                      >
                        <span>{skill}</span>
                        <BookOpen className="h-3 w-3 text-blue-600" />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div
                            className={`p-2 rounded-lg bg-${activity.color}-100`}
                          >
                            <IconComponent
                              className={`h-4 w-4 text-${activity.color}-600`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {activity.action}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Quick Actions
                  </h3>
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

                {/* Learning Progress */}
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Learning Progress
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          React Development
                        </span>
                        <span className="text-sm text-gray-500">85%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          UI/UX Design
                        </span>
                        <span className="text-sm text-gray-500">60%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Photography
                        </span>
                        <span className="text-sm text-gray-500">25%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{editedProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{editedProfile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Globe className="h-4 w-4" />
                      <a
                        href={editedProfile.website}
                        className="text-purple-600 hover:underline"
                      >
                        {editedProfile.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    My Videos ({userVideos.length})
                  </h3>
                  <p className="text-sm text-gray-600">
                    {userVideos.filter((v) => v.status === "published").length}{" "}
                    published,{" "}
                    {userVideos.filter((v) => v.status === "draft").length}{" "}
                    drafts
                  </p>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Upload New Video</span>
                </button>
              </div>

              {/* Video Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analyticsData.totalViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {analyticsData.totalLikes.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {analyticsData.totalComments}
                  </div>
                  <div className="text-sm text-gray-600">Total Comments</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.totalShares}
                  </div>
                  <div className="text-sm text-gray-600">Total Shares</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userVideos.map((video) => (
                  <div
                    key={video.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            video.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {video.status === "published" ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{video.likes}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {video.uploadDate}
                        </p>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          {video.category}
                        </span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 bg-gray-100 text-gray-700 py-1 px-2 rounded text-xs hover:bg-gray-200 transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 bg-purple-100 text-purple-700 py-1 px-2 rounded text-xs hover:bg-purple-200 transition-colors">
                          Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === "sessions" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  My Teaching Sessions
                </h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule New Session</span>
                </button>
              </div>

              {/* Session Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {
                      mockSessions.filter((s) => s.status === "completed")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    Completed Sessions
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {mockSessions.filter((s) => s.status === "upcoming").length}
                  </div>
                  <div className="text-sm text-gray-600">Upcoming Sessions</div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-600">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>

              {/* Sessions List */}
              <div className="space-y-4">
                {mockSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={session.partnerAvatar}
                          alt={session.partner}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {session.partner}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Skill: {session.skill}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>{session.date}</span>
                            <span>•</span>
                            <span>{session.time}</span>
                            <span>•</span>
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            session.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {session.status === "completed"
                            ? "Completed"
                            : "Upcoming"}
                        </span>
                        {session.rating && (
                          <div className="flex items-center justify-end space-x-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < session.rating
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Achievements & Badges
              </h3>

              {/* Achievement Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {allAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      achievement.earned
                        ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>

                      {achievement.earned ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="font-medium">Completed</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.target}
                            </span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (achievement.progress / achievement.target) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {achievement.target - achievement.progress} more to
                            go!
                          </p>
                        </div>
                      )}

                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mt-3">
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievement Stats */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-semibold mb-4">
                  Achievement Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {allAchievements.filter((a) => a.earned).length}
                    </div>
                    <div className="text-sm text-purple-100">Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {allAchievements.filter((a) => !a.earned).length}
                    </div>
                    <div className="text-sm text-purple-100">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {Math.round(
                        (allAchievements.filter((a) => a.earned).length /
                          allAchievements.length) *
                          100
                      )}
                      %
                    </div>
                    <div className="text-sm text-purple-100">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-purple-100">Rank</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Performance Analytics
              </h3>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {analyticsData.totalViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                  <div className="text-xs text-green-600 mt-1">
                    +{analyticsData.monthlyGrowth}% this month
                  </div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg text-center">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">
                    {analyticsData.totalLikes.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                  <div className="text-xs text-green-600 mt-1">
                    +15% this month
                  </div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">
                    {analyticsData.averageRating}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Based on 245 ratings
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.completionRate}%
                  </div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                  <div className="text-xs text-green-600 mt-1">
                    Above average
                  </div>
                </div>
              </div>

              {/* Top Performing Content */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Top Performing Videos
                </h4>
                <div className="space-y-4">
                  {userVideos
                    .filter((v) => v.status === "published")
                    .slice(0, 3)
                    .map((video, index) => (
                      <div
                        key={video.id}
                        className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <span className="text-lg font-bold text-purple-600">
                            #{index + 1}
                          </span>
                        </div>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-800 truncate">
                            {video.title}
                          </h5>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{video.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{video.likes}</span>
                            </span>
                            <span>{video.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Engagement Trends */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Engagement Overview
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Most Popular Category
                    </h5>
                    <p className="text-lg font-semibold text-purple-600">
                      Programming
                    </p>
                    <p className="text-sm text-gray-500">68% of total views</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Best Performing Day
                    </h5>
                    <p className="text-lg font-semibold text-blue-600">
                      Tuesday
                    </p>
                    <p className="text-sm text-gray-500">
                      Avg 1.2k views/video
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Average Watch Time
                    </h5>
                    <p className="text-lg font-semibold text-green-600">
                      12:34
                    </p>
                    <p className="text-sm text-gray-500">78% retention rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "leaderboard" && <LeaderboardPage />}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
