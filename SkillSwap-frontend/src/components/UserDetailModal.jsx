import React from 'react';
import { 
  X, Star, MessageCircle, VideoIcon, Heart, Award 
} from 'lucide-react';

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Connect with {user.user.name}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <img
                src={user.user.avatar}
                alt={user.user.name}
                className="h-16 w-16 rounded-full"
              />
              {user.user.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{user.user.name}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{user.user.rating} ({user.user.reviewCount} reviews)</span>
                </span>
                <span>Level {user.user.level}</span>
                <span>{user.totalSessions} sessions completed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">📍 {user.location}</span>
                <span className="text-green-600">⚡ Responds in {user.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Skill Exchange Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Offering</h5>
                <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-center font-medium">
                  {user.skillOffered}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Looking for</h5>
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-center font-medium">
                  {user.skillWanted}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h5 className="font-medium text-gray-800 mb-2">About</h5>
            <p className="text-gray-700">{user.description}</p>
          </div>

          {/* Skills & Tags */}
          <div className="mb-6">
            <h5 className="font-medium text-gray-800 mb-3">Skills & Expertise</h5>
            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h5 className="font-medium text-gray-800 mb-3">Availability & Preferences</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Available:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.availability.map((time, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Session Types:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.sessionType.map((type, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-gray-600">Rate: </span>
              <span className="font-medium text-gray-800">{user.hourlyRate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Send Message</span>
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <VideoIcon className="h-5 w-5" />
              <span>Schedule Session</span>
            </button>
            <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;