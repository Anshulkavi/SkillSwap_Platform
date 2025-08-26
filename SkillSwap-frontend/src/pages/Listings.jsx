// src/pages/Listings.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Star, MessageCircle, Plus, User, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'all', 'Programming', 'Marketing', 'Music', 'Creative', 'Lifestyle', 
    'Language', 'Business', 'Fitness', 'Photography'
  ];

  useEffect(() => {
    fetchListings();
  }, [searchQuery]);

  useEffect(() => {
    filterListings();
  }, [listings, selectedCategory]);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings/', {
        params: searchQuery ? { search: searchQuery } : {}
      });
      setListings(response.data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(listing => 
        listing.skill_offered.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        listing.skill_wanted?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  };

  const handleRequestSwap = async (listingId) => {
    try {
      await axios.post('/api/requests/', {
        listing_id: listingId,
        message: 'I would like to swap skills with you!'
      });
      alert('Swap request sent successfully!');
    } catch (error) {
      console.error('Failed to send request:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  const handleStartChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const getRandomColor = (index) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading skill listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Browse Skills</h1>
              <p className="mt-2 text-gray-600">Discover amazing skills and connect with talented people</p>
            </div>
            <Link
              to="/create-listing"
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Listing
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills, titles, descriptions..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredListings.length}</span> of <span className="font-semibold text-gray-900">{listings.length}</span> listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing, index) => (
            <div key={listing.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
              
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${getRandomColor(index)} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                      {getInitials(listing.owner?.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{listing.owner?.name || 'Unknown User'}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.owner?.location || 'Location not specified'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                {/* Listing Content */}
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {listing.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {listing.description}
                </p>

                {/* Skills Exchange */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
                      Offers: {listing.skill_offered}
                    </span>
                  </div>
                  {listing.skill_wanted && (
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                        Wants: {listing.skill_wanted}
                      </span>
                    </div>
                  )}
                </div>

                {/* Duration */}
                {listing.duration_hours && (
                  <div className="flex items-center text-gray-500 mb-6">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{listing.duration_hours} hours commitment</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleRequestSwap(listing.id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Request Swap
                  </button>
                  
                  <button
                    onClick={() => handleStartChat(listing.owner_id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No listings found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {listings.length === 0 
                ? "No skill listings available yet. Be the first to create one!"
                : "Try adjusting your search criteria or browse all categories"
              }
            </p>
            <div className="space-x-4">
              {listings.length > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              <Link
                to="/create-listing"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Listing
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;