// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set up axios Authorization header when token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch current user
  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/api/auth/login', formData, {
      withCredentials: true, // ensures refresh token cookie is set
    });

    const { access_token } = response.data;

    localStorage.setItem('token', access_token);
    setToken(access_token);
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    await fetchUser();
    return response.data;
  };

  // Signup user
  const signup = async (userData) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  };

  // Refresh access token
  const refreshToken = async () => {
    try {
      const response = await api.post('/api/auth/refresh', null, {
        withCredentials: true, // sends the refresh token cookie
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return access_token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
      return null;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post('/api/auth/logout', null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    const response = await api.put('/api/users/me', profileData);
    setUser(response.data);
    return response.data;
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    refreshToken,
    updateProfile,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
