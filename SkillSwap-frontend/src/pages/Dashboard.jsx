// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    myListings: 0,
    pendingRequests: 0,
    completedSwaps: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [listingsRes, sentReqRes, receivedReqRes] = await Promise.all([
        axios.get('/api/listings/my'),
        axios.get('/api/requests/sent'),
        axios.get('/api/requests/received')
      ]);

      const listings = listingsRes.data;
      const sentRequests = sentReqRes.data;
      const receivedRequests = receivedReqRes.data;

      setStats({
        myListings: listings.length,
        pendingRequests: [...sentRequests, ...receivedRequests].filter(req => req.status === 'pending').length,
        completedSwaps: [...sentRequests, ...receivedRequests].filter(req => req.status === 'completed').length
      });

      // Combine and sort activity
      const allActivity = [
        ...listings.map(listing => ({
          type: 'listing',
          title: listing.title,
          date: listing.created_at,
          description: `Posted "${listing.title}"`
        })),
        ...sentRequests.map(req => ({
          type: 'request_sent',
          title: req.listing?.title || 'Request',
          date: req.created_at,
          description: `Sent request for "${req.listing?.title}"`
        })),
        ...receivedRequests.map(req => ({
          type: 'request_received',
          title: req.listing?.title || 'Request',
          date: req.created_at,
          description: `Received request for "${req.listing?.title}"`
        }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

      setRecentActivity(allActivity);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, {user.name}!
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.myListings}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      My Listings
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Active skills offered
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.pendingRequests}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Requests
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Awaiting response
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.completedSwaps}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Completed Swaps
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Successful exchanges
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link
                to="/create-listing"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
              >
                Create Listing
              </Link>
              <Link
                to="/listings"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
              >
                Browse Skills
              </Link>
              <Link
                to="/chat"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
              >
                Messages
              </Link>
              <Link
                to="/profile"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            {recentActivity.length === 0 ? (
              <p className="text-gray-500">No recent activity</p>
            ) : (
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== recentActivity.length - 1 && (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.type === 'listing'
                                ? 'bg-blue-500'
                                : activity.type === 'request_sent'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                          >
                            <span className="text-white text-xs font-medium">
                              {activity.type === 'listing' ? 'L' : 
                               activity.type === 'request_sent' ? 'S' : 'R'}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.description}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {new Date(activity.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;