// src/pages/Listings.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, [searchQuery]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Skills</h1>
          <Link
            to="/create-listing"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Create Listing
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search skills, titles, descriptions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {listing.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {listing.description}
                </p>
                
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Offers: {listing.skill_offered}
                  </span>
                  {listing.skill_wanted && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                      Wants: {listing.skill_wanted}
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>By {listing.owner?.name || 'Unknown'}</span>
                  {listing.owner?.location && (
                    <span className="ml-2">• {listing.owner.location}</span>
                  )}
                </div>

                {listing.duration_hours && (
                  <p className="text-sm text-gray-500 mb-4">
                    Duration: {listing.duration_hours} hours
                  </p>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestSwap(listing.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Request Swap
                  </button>
                  <button
                    onClick={() => handleStartChat(listing.owner_id)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No listings found.</p>
            <Link
              to="/create-listing"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Be the first to create one!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings