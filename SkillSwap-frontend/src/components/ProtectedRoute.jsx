// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   // Show loading spinner while checking auth status
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   // If user is not authenticated, redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user is authenticated, render the protected component
//   return children;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// This would typically check authentication status
const ProtectedRoute = ({ children, user }) => {
  const location = useLocation();

  // For demo purposes, we'll assume user is always authenticated
  // In a real app, you'd check authentication status here
  const isAuthenticated = user && user.id;

  if (!isAuthenticated) {
    // Redirect to login page with the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;