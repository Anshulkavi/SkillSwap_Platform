import React, { useState } from 'react';
import { 
  Plus, Filter, Star, Heart, MessageCircle, VideoIcon, X, Users
} from 'lucide-react';
import UserDetailModal from '../components/UserDetailModal';

// Mock skill listings data
const mockSkillListings = [
  {
    id: 1,
    user: {
      name: 'Alex Chen',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      reviewCount: 127,
      level: 15,
      verified: true
    },
    skillOffered: 'React Development',
    skillWanted: 'UI/UX Design',
    description: 'Senior React developer with 5+ years experience. Looking to learn modern design principles and Figma.',
    availability: ['Evenings', 'Weekends'],
    sessionType: ['Video Call', 'Screen Share'],
    hourlyRate: 'Free Exchange',
    tags: ['JavaScript', 'TypeScript', 'Next.js', 'Node.js'],
    location: 'San Francisco, CA',
    responseTime: '< 2 hours',
    totalSessions: 89
  },
  {
    id: 2,
    user: {
      name: 'Sarah Martinez',
      avatar: '/api/placeholder/60/60',
      rating: 4.8,
      reviewCount: 93,
      level: 12,
      verified: true
    },
    skillOffered: 'Digital Marketing',
    skillWanted: 'Web Development',
    description: 'Marketing strategist specializing in social media and content creation. Want to learn HTML/CSS basics.',
    availability: ['Mornings', 'Afternoons'],
    sessionType: ['Video Call', 'Chat'],
    hourlyRate: 'Free Exchange',
    tags: ['SEO', 'Content Strategy', 'Social Media', 'Analytics'],
    location: 'Austin, TX',
    responseTime: '< 4 hours',
    totalSessions: 67
  },
  {
    id: 3,
    user: {
      name: 'David Kim',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      reviewCount: 156,
      level: 18,
      verified: true
    },
    skillOffered: 'Photography',
    skillWanted: 'Video Editing',
    description: 'Professional photographer with expertise in portrait and landscape photography. Looking to expand into video content creation.',
    availability: ['Weekends', 'Evenings'],
    sessionType: ['Video Call', 'In-Person'],
    hourlyRate: '$25/hour',
    tags: ['Portrait Photography', 'Lightroom', 'Camera Basics', 'Composition'],
    location: 'New York, NY',
    responseTime: '< 1 hour',
    totalSessions: 134
  },
  {
    id: 4,
    user: {
      name: 'Emma Wilson',
      avatar: '/api/placeholder/60/60',
      rating: 4.7,
      reviewCount: 84,
      level: 11,
      verified: false
    },
    skillOffered: 'Graphic Design',
    skillWanted: 'Python Programming',
    description: 'Creative designer with 3+ years in brand identity and logo design. Interested in learning Python for automation.',
    availability: ['Afternoons', 'Evenings'],
    sessionType: ['Video Call', 'Screen Share'],
    hourlyRate: 'Free Exchange',
    tags: ['Adobe Creative Suite', 'Brand Identity', 'Logo Design', 'Typography'],
    location: 'Seattle, WA',
    responseTime: '< 6 hours',
    totalSessions: 45
  },
  {
    id: 5,
    user: {
      name: 'Marcus Rodriguez',
      avatar: '/api/placeholder/60/60',
      rating: 4.8,
      reviewCount: 112,
      level: 14,
      verified: true
    },
    skillOffered: 'Guitar Playing',
    skillWanted: 'Music Production',
    description: 'Classical and acoustic guitarist with 10+ years experience. Looking to learn digital music production and mixing.',
    availability: ['Evenings', 'Weekends'],
    sessionType: ['Video Call', 'In-Person'],
    hourlyRate: '$20/hour',
    tags: ['Classical Guitar', 'Fingerpicking', 'Music Theory', 'Songwriting'],
    location: 'Los Angeles, CA',
    responseTime: '< 3 hours',
    totalSessions: 78
  }
];

const SkillExchangePage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkillOffer, setSelectedSkillOffer] = useState('');
  const [selectedSkillWanted, setSelectedSkillWanted] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filterOptions = [
    { id: 'all', label: 'All Listings' },
    { id: 'free', label: 'Free Exchange' },
    { id: 'paid', label: 'Paid Sessions' },
    { id: 'verified', label: 'Verified Users' },
    { id: 'online', label: 'Online Now' }
  ];

  const skillCategories = [
    'All', 'Programming', 'Design', 'Marketing', 'Photography', 'Music', 
    'Art', 'Writing', 'Business', 'Languages', 'Cooking', 'Fitness'
  ];

  const filteredListings = mockSkillListings.filter(listing => {
    const matchesCategory = selectedCategory === 'All' || 
      listing.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'free' && listing.hourlyRate === 'Free Exchange') ||
      (selectedFilter === 'paid' && listing.hourlyRate !== 'Free Exchange') ||
      (selectedFilter === 'verified' && listing.user.verified);
    
    const matchesSkillOffer = !selectedSkillOffer || 
      listing.skillOffered.toLowerCase().includes(selectedSkillOffer.toLowerCase());
    
    const matchesSkillWanted = !selectedSkillWanted || 
      listing.skillWanted.toLowerCase().includes(selectedSkillWanted.toLowerCase());
    
    return matchesCategory && matchesFilter && matchesSkillOffer && matchesSkillWanted;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Skill Exchange</h1>
          <p className="text-gray-600">Connect with others for one-on-one skill swapping</p>
        </div>
        <button className="mt-4 lg:mt-0 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Post Your Skills</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-purple-600"
          >
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        <div className={`mt-4 pt-4 border-t border-gray-200 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {skillCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Offered</label>
              <input
                type="text"
                value={selectedSkillOffer}
                onChange={(e) => setSelectedSkillOffer(e.target.value)}
                placeholder="e.g., React Development"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Wanted</label>
              <input
                type="text"
                value={selectedSkillWanted}
                onChange={(e) => setSelectedSkillWanted(e.target.value)}
                placeholder="e.g., UI/UX Design"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredListings.length} skill exchange opportunities
        </p>
      </div>

      {/* Skill Listings */}
      <div className="space-y-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 lg:w-64">
                <div className="relative">
                  <img
                    src={listing.user.avatar}
                    alt={listing.user.name}
                    className="h-14 w-14 rounded-full"
                  />
                  {listing.user.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{listing.user.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{listing.user.rating}</span>
                    <span>({listing.user.reviewCount})</span>
                    <span>• Level {listing.user.level}</span>
                  </div>
                </div>
              </div>

              {/* Skill Exchange */}
              <div className="flex-1 lg:flex lg:items-center lg:space-x-6">
                <div className="grid md:grid-cols-2 gap-4 lg:flex-1">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Offering</p>
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium text-center">
                      {listing.skillOffered}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Looking for</p>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium text-center">
                      {listing.skillWanted}
                    </div>
                  </div>
                </div>

                {/* Rate & Availability */}
                <div className="mt-4 lg:mt-0 lg:w-32 text-right">
                  <p className="font-semibold text-gray-800">{listing.hourlyRate}</p>
                  <p className="text-sm text-gray-600">
                    Responds in {listing.responseTime}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 lg:w-48">
                <button 
                  onClick={() => setSelectedUser(listing)}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  View Details
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700 mb-3">{listing.description}</p>
              <div className="flex flex-wrap gap-2">
                {listing.tags.slice(0, 4).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {listing.tags.length > 4 && (
                  <span className="text-sm text-gray-500">+{listing.tags.length - 4} more</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      <UserDetailModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Load More Listings
        </button>
      </div>
    </div>
  );
};

export default SkillExchangePage;