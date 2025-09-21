import React from 'react';
import { Eye, Heart, Star, Play } from 'lucide-react';

const VideoCard = ({ video }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">{video.duration}</div>
      <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
        <Play className="h-12 w-12 text-white fill-current" />
      </button>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
      <p className="text-sm text-gray-600 mb-3">by {video.creator}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span className="flex items-center space-x-1"><Eye className="h-4 w-4" /><span>{video.views.toLocaleString()}</span></span>
        <span className="flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-500 fill-current" /><span>{video.rating}</span></span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{video.category}</span>
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{video.level}</span>
      </div>
    </div>
  </div>
);

export default VideoCard;
