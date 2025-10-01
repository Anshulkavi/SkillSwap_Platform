import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('skillswap_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password) {
          const mockUser = {
            id: Math.random(),
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email,
            avatar: '/api/placeholder/40/40',
            level: 1,
            xp: 0,
            xpToNext: 100,
            badges: [],
            skillsOffered: [],
            skillsLearning: [],
            createdAt: new Date().toISOString()
          };
          
          setUser(mockUser);
          sessionStorage.setItem('skillswap_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const newUser = {
            id: Math.random(),
            name: name,
            email: email,
            avatar: '/api/placeholder/40/40',
            level: 1,
            xp: 0,
            xpToNext: 100,
            badges: ['New Member'],
            skillsOffered: [],
            skillsLearning: [],
            createdAt: new Date().toISOString()
          };
          
          setUser(newUser);
          sessionStorage.setItem('skillswap_user', JSON.stringify(newUser));
          resolve(newUser);
        } else {
          reject(new Error('All fields are required'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('skillswap_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    sessionStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;