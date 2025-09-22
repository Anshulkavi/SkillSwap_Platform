import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto">
              <Search className="h-12 w-12 text-purple-600 mx-auto" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or the URL might be incorrect.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Go to Homepage</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/videos"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
              >
                Browse Videos
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/skill-exchange"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
              >
                Skill Exchange
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/community"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
              >
                Community
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/leaderboard"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;