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
    skillsToLearn: [],
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
        skillsToLearn: user.skillsToLearn || [],
        education: user.education || {},
        resumeName: user.resumeName || "",
      });
    }
  }, [user]);

  useEffect(() => {
    resetProfileState();
  }, [resetProfileState]);

  const [newLearningSkill, setNewLearningSkill] = useState("");

  const handleAddLearningSkill = () => {
    if (
      newLearningSkill.trim() &&
      !editedProfile.skillsToLearn.includes(newLearningSkill.trim())
    ) {
      setEditedProfile((prev) => ({
        ...prev,
        skillsToLearn: [...prev.skillsToLearn, newLearningSkill.trim()],
      }));
      setNewLearningSkill("");
    }
  };

  const handleRemoveLearningSkill = (skillToRemove) => {
    setEditedProfile((prev) => ({
      ...prev,
      skillsToLearn: prev.skillsToLearn.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

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
                    {/* My Skills */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        My Skills
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

                    {/* Skills I Want to Learn */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Skills I Want to Learn
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {editedProfile.skillsToLearn.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-indigo-500/20 text-indigo-300 px-3 py-2 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Education Details */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Education Details
                      </h3>
                      <div className="space-y-4">
                        {/* 10th Standard */}
                        {editedProfile.education?.tenth && (
                          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-lg font-semibold text-purple-400 mb-3">
                              10th Standard
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {editedProfile.education.tenth.school && (
                                <div>
                                  <span className="text-slate-400">
                                    School:
                                  </span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.tenth.school}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.tenth.board && (
                                <div>
                                  <span className="text-slate-400">Board:</span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.tenth.board}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.tenth.percentage && (
                                <div>
                                  <span className="text-slate-400">
                                    Percentage:
                                  </span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.tenth.percentage}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.tenth.year && (
                                <div>
                                  <span className="text-slate-400">Year:</span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.tenth.year}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* 12th Standard */}
                        {editedProfile.education?.twelfth && (
                          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-lg font-semibold text-purple-400 mb-3">
                              12th Standard
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {editedProfile.education.twelfth.school && (
                                <div>
                                  <span className="text-slate-400">
                                    School:
                                  </span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.twelfth.school}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.twelfth.board && (
                                <div>
                                  <span className="text-slate-400">Board:</span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.twelfth.board}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.twelfth.percentage && (
                                <div>
                                  <span className="text-slate-400">
                                    Percentage:
                                  </span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.twelfth.percentage}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.twelfth.year && (
                                <div>
                                  <span className="text-slate-400">Year:</span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.twelfth.year}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Graduation */}
                        {editedProfile.education?.graduation && (
                          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-lg font-semibold text-purple-400 mb-3">
                              Graduation
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {editedProfile.education.graduation.college && (
                                <div>
                                  <span className="text-slate-400">
                                    College:
                                  </span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.graduation.college}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.graduation.degree && (
                                <div>
                                  <span className="text-slate-400">
                                    Degree:
                                  </span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.graduation.degree}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.graduation
                                .specialization && (
                                <div>
                                  <span className="text-slate-400">
                                    Specialization:
                                  </span>
                                  <p className="text-slate-200">
                                    {
                                      editedProfile.education.graduation
                                        .specialization
                                    }
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.graduation.cgpa && (
                                <div>
                                  <span className="text-slate-400">CGPA:</span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.graduation.cgpa}
                                  </p>
                                </div>
                              )}
                              {editedProfile.education.graduation.year && (
                                <div className="col-span-2">
                                  <span className="text-slate-400">Year:</span>
                                  <p className="text-slate-200">
                                    {editedProfile.education.graduation.year}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Post Graduation */}
                        {editedProfile.education?.postGraduation &&
                          (editedProfile.education.postGraduation.college ||
                            editedProfile.education.postGraduation.degree) && (
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                              <h4 className="text-lg font-semibold text-purple-400 mb-3">
                                Post Graduation
                              </h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                {editedProfile.education.postGraduation
                                  .college && (
                                  <div>
                                    <span className="text-slate-400">
                                      College:
                                    </span>
                                    <p className="text-slate-200">
                                      {
                                        editedProfile.education.postGraduation
                                          .college
                                      }
                                    </p>
                                  </div>
                                )}
                                {editedProfile.education.postGraduation
                                  .degree && (
                                  <div>
                                    <span className="text-slate-400">
                                      Degree:
                                    </span>
                                    <p className="text-slate-200">
                                      {
                                        editedProfile.education.postGraduation
                                          .degree
                                      }
                                    </p>
                                  </div>
                                )}
                                {editedProfile.education.postGraduation
                                  .specialization && (
                                  <div>
                                    <span className="text-slate-400">
                                      Specialization:
                                    </span>
                                    <p className="text-slate-200">
                                      {
                                        editedProfile.education.postGraduation
                                          .specialization
                                      }
                                    </p>
                                  </div>
                                )}
                                {editedProfile.education.postGraduation
                                  .cgpa && (
                                  <div>
                                    <span className="text-slate-400">
                                      CGPA:
                                    </span>
                                    <p className="text-slate-200">
                                      {
                                        editedProfile.education.postGraduation
                                          .cgpa
                                      }
                                    </p>
                                  </div>
                                )}
                                {editedProfile.education.postGraduation
                                  .year && (
                                  <div className="col-span-2">
                                    <span className="text-slate-400">
                                      Year:
                                    </span>
                                    <p className="text-slate-200">
                                      {
                                        editedProfile.education.postGraduation
                                          .year
                                      }
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity - Right Column */}
                  <div className="lg:col-span-1">
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
                                <p className="font-medium text-slate-200 text-sm">
                                  {activity.action}
                                </p>
                                <p className="text-xs text-slate-400">
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
                  newLearningSkill={newLearningSkill}
                  setNewLearningSkill={setNewLearningSkill}
                  onAddLearningSkill={handleAddLearningSkill}
                  onRemoveLearningSkill={handleRemoveLearningSkill}
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
