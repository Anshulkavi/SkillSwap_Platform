import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Users, Award, Upload, BookOpen, Plus, X, FileText, GraduationCap, Save, User } from 'lucide-react';

const user = {
  id: '123',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=Sarah`,
  level: 15,
  xp: 12450,
  badges: ['Early Adopter', 'Top Contributor', 'Mentor'],
  skills: ['React', 'JavaScript', 'UI/UX Design', 'Python'],
  bio: 'Passionate full-stack developer and UI/UX enthusiast. Love sharing knowledge and learning new technologies.',
  location: 'San Francisco, CA',
  education: {
    tenth: { school: 'City High School', board: 'CBSE', percentage: '92%', year: '2014' },
    twelfth: { school: 'City High School', board: 'CBSE', percentage: '88%', year: '2016' },
    graduation: { college: 'State University', degree: 'B.Tech', specialization: 'Computer Science', cgpa: '8.5', year: '2020' },
    postGraduation: { college: '', degree: '', specialization: '', cgpa: '', year: '' }
  }
};

const EditProfile = ({
  editedProfile,
  onProfileChange,
  onPhotoUpload,
  onSave,
  onCancel,
  newSkill,
  setNewSkill,
  onAddSkill,
  onRemoveSkill,
  onEducationChange,
  onResumeUpload,
}) => {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Basic Info Section */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
          <User className="h-5 w-5 mr-3 text-purple-400" />
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Your Name</label>
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={onProfileChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Your Bio</label>
            <textarea
              name="bio"
              value={editedProfile.bio}
              onChange={onProfileChange}
              rows="3"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoUpload}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 transition-colors"
            />
          </div>
        </div>
      </div>
      
      {/* Skills Section */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
          <BookOpen className="h-5 w-5 mr-3 text-purple-400" />
          Skills
        </h3>
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onAddSkill()}
              className="flex-1 w-full bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Add a new skill..."
            />
            <button
              onClick={onAddSkill}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {editedProfile.skills && editedProfile.skills.map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => onRemoveSkill(skill)}
                  className="hover:bg-purple-500/30 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-3 text-purple-400" /> Resume
        </h3>
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
          <Upload className="h-12 w-12 text-slate-500 mx-auto mb-3" />
          <label className="cursor-pointer">
            <span className="text-purple-400 hover:text-purple-300 font-medium">
              Click to upload your resume
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={onResumeUpload}
              className="hidden"
            />
          </label>
          <p className="text-sm text-slate-400 mt-2">
            PDF, DOC, DOCX (Max 5MB)
          </p>
          {editedProfile.resumeName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-200 bg-slate-700 p-3 rounded-lg"
            >
              <FileText className="h-4 w-4 text-purple-400" />
              <span className="font-medium">{editedProfile.resumeName}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Education Sections */}
      {["tenth", "twelfth", "graduation", "postGraduation"].map((level) => {
        const titles = { tenth: "10th Standard", twelfth: "12th Standard", graduation: "Graduation", postGraduation: "Post Graduation" };
        const isHighSchool = level === "tenth" || level === "twelfth";
        const eduData = editedProfile.education?.[level] || {};

        return (
          <div key={level} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
              <GraduationCap className="h-5 w-5 mr-3 text-purple-400" />
              {titles[level]} Details
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${!isHighSchool && "lg:grid-cols-3"}`}>
              <input type="text" value={eduData.school || eduData.college || ""} onChange={(e) => onEducationChange(level, isHighSchool ? "school" : "college", e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg" placeholder={isHighSchool ? "School Name" : "College/University"} />
              <input type="text" value={eduData.board || eduData.degree || ""} onChange={(e) => onEducationChange(level, isHighSchool ? "board" : "degree", e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg" placeholder={isHighSchool ? "Board" : "Degree"} />
              {!isHighSchool && <input type="text" value={eduData.specialization || ""} onChange={(e) => onEducationChange(level, "specialization", e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg" placeholder="Specialization"/>}
              <input type="text" value={eduData.percentage || eduData.cgpa || ""} onChange={(e) => onEducationChange(level, isHighSchool ? "percentage" : "cgpa", e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg" placeholder={isHighSchool ? "Percentage" : "CGPA / %"} />
              <input type="text" value={eduData.year || ""} onChange={(e) => onEducationChange(level, "year", e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg" placeholder="Year of Passing" />
            </div>
          </div>
        );
      })}

      <div className="flex justify-end space-x-4 pt-4">
         <button onClick={onCancel} className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-2 px-6 rounded-lg transition-colors">Cancel</button>
        <button onClick={onSave} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2">
            <Save className="h-4 w-4"/>Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default EditProfile;
