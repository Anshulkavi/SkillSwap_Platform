import React from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

const CommunityPost = ({ post }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-start space-x-4">
      <img src="/api/placeholder/40/40" alt={post.author} className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="font-semibold text-gray-800">{post.author}</h3>
          <span className="text-sm text-gray-500">{post.timestamp}</span>
        </div>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"><Heart className="h-5 w-5" /><span>{post.likes}</span></button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"><MessageSquare className="h-5 w-5" /><span>{post.comments}</span></button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"><Share2 className="h-5 w-5" /><span>Share</span></button>
        </div>
      </div>
    </div>
  </div>
);

export default CommunityPost;
