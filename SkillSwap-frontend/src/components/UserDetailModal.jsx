// src/components/UserDetailModal.jsx
import React from 'react';
import { X, Star, Mail, MessageSquare } from 'lucide-react';

const UserDetailModal = ({ listing, onClose }) => {
  if (!listing) return null;

  const { user, skill_offered, skill_wanted, description, tags, availability, session_type, hourly_rate, response_time } = listing;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[95vh] flex flex-col">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Exchange Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <img src={user.avatar || '/api/placeholder/80/80'} alt={user.name} className="h-20 w-20 rounded-full border-2 border-purple-200" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 fill-current mr-1" /> <span>{user.rating || 4.8}</span></div>
                <span>•</span>
                <div>Level {user.level}</div>
                <span>•</span>
                <div>{user.location || "Location not set"}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{user.bio || "No bio provided."}</p>
            </div>
          </div>
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Offering</h4>
                <div className="bg-green-100 text-green-800 p-3 rounded-lg text-lg font-semibold">{skill_offered}</div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Looking For</h4>
                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-lg font-semibold">{skill_wanted}</div>
              </div>
            </div>
            <p className="text-gray-700 mt-4">{description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {(tags || []).map(tag => <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{tag}</span>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Availability</h4>
              <p className="text-gray-600">{(availability || []).join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Session Type</h4>
              <p className="text-gray-600">{(session_type || []).join(', ')}</p>
            </div>
          </div>
        </div>
        <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3">
          <button className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300">
            <span className="flex items-center"><Mail size={16} className="mr-2" /> Message {user.name.split(' ')[0]}</span>
          </button>
          <button className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-purple-700">
             <span className="flex items-center"><MessageSquare size={16} className="mr-2" /> Send Exchange Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserDetailModal;