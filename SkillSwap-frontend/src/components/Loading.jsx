import React from 'react';
import { BookOpen } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl mb-4 animate-pulse">
            <BookOpen className="h-8 w-8 text-white mx-auto" />
          </div>
          <div className="loading-spinner mx-auto mb-4"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading SkillSwap+</h2>
        <p className="text-gray-600">Please wait while we prepare your learning experience...</p>
      </div>
    </div>
  );
};

export default Loading;