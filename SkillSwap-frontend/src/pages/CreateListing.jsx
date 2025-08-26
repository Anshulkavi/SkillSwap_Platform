// src/pages/CreateListing.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Clock, MapPin, Tag, CheckCircle } from 'lucide-react';
import api from '../api/axios';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill_offered: '',
    skill_wanted: '',
    duration_hours: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Predefined options for better UX
  const popularSkills = [
    'Web Development', 'Mobile App Development', 'Graphic Design', 'Digital Marketing',
    'Photography', 'Video Editing', 'Writing', 'Music Production', 'Language Learning',
    'Cooking', 'Fitness Training', 'Business Strategy', 'Data Analysis', 'UI/UX Design'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        duration_hours: formData.duration_hours ? parseInt(formData.duration_hours) : null
      };
      
      await api.post('/api/listings/', submitData);
      
      // Show success animation
      setShowSuccess(true);
      
      // Navigate after animation
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fillSkill = (skill, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: skill
    }));
  };

  // Success Animation Component
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Created Successfully! 🎉</h2>
          <p className="text-gray-600">Redirecting to listings page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/listings"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Skill Listing</h1>
          <p className="text-gray-600 text-lg">Share your expertise and connect with fellow learners</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Tell us about your skill</h2>
            <p className="text-blue-100 mt-1">Fill in the details below to create your listing</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl flex items-center">
                <X className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Information
                </h3>
                <p className="text-gray-600 mt-1">Start with the essentials</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Listing Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="e.g., Learn Web Development in Exchange for Guitar Lessons"
                  value={formData.title}
                  onChange={handleChange}
                />
                <p className="text-gray-500 text-sm mt-2">Make it catchy and specific</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows="5"
                  required
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all resize-none"
                  placeholder="Describe what you're offering and what kind of exchange you're looking for. Include your experience level, what students will learn, and any requirements..."
                  value={formData.description}
                  onChange={handleChange}
                />
                <p className="text-gray-500 text-sm mt-2">
                  Be detailed - this helps people understand what you offer
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-green-600" />
                  Skill Exchange
                </h3>
                <p className="text-gray-600 mt-1">What you offer and what you want to learn</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Skill Offered */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Skill You're Offering *
                  </label>
                  <input
                    type="text"
                    name="skill_offered"
                    required
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="e.g., Web Development, Guitar, Photography"
                    value={formData.skill_offered}
                    onChange={handleChange}
                  />
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.slice(0, 6).map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => fillSkill(skill, 'skill_offered')}
                          className="px-3 py-1 text-xs bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors border border-green-200"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skill Wanted */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Skill You Want to Learn
                  </label>
                  <input
                    type="text"
                    name="skill_wanted"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="e.g., Cooking, Language Learning, Design"
                    value={formData.skill_wanted}
                    onChange={handleChange}
                  />
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.slice(6, 12).map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => fillSkill(skill, 'skill_wanted')}
                          className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Time Commitment
                </h3>
                <p className="text-gray-600 mt-1">How much time can you dedicate?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Duration in Hours (Optional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration_hours"
                    min="1"
                    max="1000"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="How many hours are you willing to dedicate?"
                    value={formData.duration_hours}
                    onChange={handleChange}
                  />
                  <Clock className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  This helps others understand your commitment level
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Creating Listing...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Listing
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/listings')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for a great listing:</h4>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Be specific about what you're teaching and your experience level</li>
            <li>• Mention what you expect in return to attract the right people</li>
            <li>• Include any materials or requirements needed</li>
            <li>• Be honest about your availability and time commitment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;