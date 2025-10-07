// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios'; // Import our pre-configured axios instance

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper to set the authorization header on the axios instance
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial app load
  useEffect(() => {
    const token = localStorage.getItem('skillswap_access_token');
    const storedUser = localStorage.getItem('skillswap_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setAuthHeader(token); // Set auth header for any subsequent API calls
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('skillswap_access_token');
        localStorage.removeItem('skillswap_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/login', {
        email,
        password,
      });

      const { access_token, refresh_token, user: userData } = response.data;
      
      setUser(userData);
      localStorage.setItem('skillswap_access_token', access_token);
      localStorage.setItem('skillswap_refresh_token', refresh_token);
      localStorage.setItem('skillswap_user', JSON.stringify(userData));
      setAuthHeader(access_token);
      
      return userData;

    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
  };

  // 👇 THIS IS THE NEWLY IMPLEMENTED FUNCTION
  const signup = async (name, email, password) => {
    try {
      // Call the backend signup endpoint
      const response = await api.post('/api/signup', {
        name,
        email,
        password,
      });

      // The backend returns the same Token object as login, so we handle it the same way
      const { access_token, refresh_token, user: userData } = response.data;
      
      setUser(userData);
      localStorage.setItem('skillswap_access_token', access_token);
      localStorage.setItem('skillswap_refresh_token', refresh_token);
      localStorage.setItem('skillswap_user', JSON.stringify(userData));
      setAuthHeader(access_token);
      
      return userData;

    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillswap_access_token');
    localStorage.removeItem('skillswap_refresh_token');
    localStorage.removeItem('skillswap_user');
    setAuthHeader(null);
  };

  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};