import React, { useState } from 'react';
import { Trophy, TrendingUp, Star, Award } from 'lucide-react';

// Mock leaderboard data
const mockLeaderboard = [
  { 
    rank: 1, 
    name: 'Alex Chen', 
    xp: 15420, 
    badge: 'Master Mentor', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 245,
    specialties: ['React', 'JavaScript', 'Node.js']
  },
  { 
    rank: 2, 
    name: 'Sarah Johnson', 
    xp: 12890, 
    badge: 'Video Expert', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 189,
    specialties: ['UI/UX Design', 'Photography']
  },
  { 
    rank: 3, 
    name: 'Marcus Rodriguez', 
    xp: 11250, 
    badge: 'Community Leader', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 156,
    specialties: ['Guitar', 'Music Theory']
  },
  { 
    rank: 4, 
    name: 'Emma Wilson', 
    xp: 9800, 
    badge: 'Skill Sharer', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 134,
    specialties: ['Digital Art', 'Illustration']
  },
  { 
    rank: 5, 
    name: 'David Kim', 
    xp: 8650, 
    badge: 'Rising Star', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 198,
    specialties: ['Photography', 'Lightroom']
  },
  { 
    rank: 6, 
    name: 'Lisa Park', 
    xp: 7890, 
    badge: 'Creative Genius', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 167,
    specialties: ['Graphic Design', 'Branding']
  },
  { 
    rank: 7, 
    name: 'John Smith', 
    xp: 7234, 
    badge: 'Code Mentor', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 123,
    specialties: ['Python', 'Data Science']
  },
  { 
    rank: 8, 
    name: 'Maria Garcia', 
    xp: 6890, 
    badge: 'Language Expert', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 145,
    specialties: ['Spanish', 'French', 'Italian']
  }
];

// Current user mock data
const currentUser = {
  rank: 2,
  name: 'Sarah Johnson',
  xp: 12890,
  avatar: '/api/placeholder/40/40'
};

const LeaderboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const periods = [
    { id: 'all-time', label: 'All Time' },
    { id: 'monthly', label: 'This Month' },
    { id: 'weekly', label: 'This Week' },
    { id: 'daily', label: 'Today' }
  ];

  const categories = [
    { id: 'overall', label: 'Overall' },
    { id: 'programming', label: 'Programming' },
    { id: 'design', label: 'Design' },
    { id: 'art', label: 'Art & Creativity' },
    { id: 'music', label: 'Music' },
    { id: 'photography', label: 'Photography' },
    { id: 'languages', label: 'Languages' }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600 bg-yellow-100';
    if (rank === 2) return 'text-gray-600 bg-gray-100';
    if (rank === 3) return 'text-orange-600 bg-orange-100';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Leaderboard</h1>
        <p className="text-gray-600">Top contributors in our skill-sharing community</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>{period.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Current User Rank */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl text-white mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-12 w-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold text-lg">Your Current Rank</h3>
              <p className="text-purple-200">#{currentUser.rank} • {currentUser.xp.toLocaleString()} XP</p>
            </div>
          </div>
          <Trophy className="h-8 w-8 text-yellow-300" />
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockLeaderboard.slice(0, 3).map((user, index) => (
          <div 
            key={user.rank}
            className={`bg-white p-6 rounded-xl shadow-md text-center ${
              user.rank === 1 ? 'ring-2 ring-yellow-400 transform scale-105' : ''
            }`}
          >
            <div className="text-4xl mb-3">
              {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full mx-auto mb-3 border-2 border-gray-200"
            />
            <h3 className="font-semibold text-gray-800 mb-1">{user.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{user.badge}</p>
            <p className="text-lg font-bold text-purple-600 mb-2">{user.xp.toLocaleString()} XP</p>
            <div className="flex items-center justify-center space-x-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+{user.weeklyGain} this week</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              {user.specialties.slice(0, 2).map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Complete Rankings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockLeaderboard.map((user) => (
            <div key={user.rank} className="p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold ${getRankColor(user.rank)}`}>
                {user.rank <= 3 ? (
                  <span className="text-lg">{getRankIcon(user.rank)}</span>
                ) : (
                  <span>#{user.rank}</span>
                )}
              </div>
              
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                  {user.rank <= 5 && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{user.badge}</p>
                <div className="flex flex-wrap gap-1">
                  {user.specialties.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800">{user.xp.toLocaleString()}</p>
                <p className="text-sm text-gray-500">XP</p>
                <div className="flex items-center space-x-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{user.weeklyGain}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Community Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Top Contributor', description: 'Most XP earned this month', winner: 'Alex Chen' },
            { title: 'Best Teacher', description: 'Highest average rating', winner: 'Sarah Johnson' },
            { title: 'Most Active', description: 'Most sessions completed', winner: 'Marcus Rodriguez' },
            { title: 'Rising Star', description: 'Biggest XP gain this week', winner: 'David Kim' }
          ].map((achievement, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                <p className="text-sm font-medium text-purple-600">{achievement.winner}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;