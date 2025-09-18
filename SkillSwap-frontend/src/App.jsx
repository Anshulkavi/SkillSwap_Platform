// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage'; // Import your landing page
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Listings from './pages/Listings';
// import CreateListing from './pages/CreateListing';
// import Profile from './pages/Profile';
// import Chat from './pages/Chat';
// import VideoCall from './pages/VideoCall';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           {/* Conditional Navbar - Only show on protected routes */}
//           <Routes>
//             {/* Public Routes - No Navbar */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
            
//             {/* Protected Routes - With Navbar */}
//             <Route path="/dashboard" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/listings" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Listings />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/create-listing" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <CreateListing />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/profile" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/chat/:userId?" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <Chat />
//                 </ProtectedRoute>
//               </>
//             } />
//             <Route path="/video/:roomId" element={
//               <>
//                 <Navbar />
//                 <ProtectedRoute>
//                   <VideoCall />
//                 </ProtectedRoute>
//               </>
//             } />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import VideoCall from './pages/VideoCall';

// 1. ADD THIS IMPORT
import AuthSuccess from './pages/AuthSuccess';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes - No Navbar */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* 2. ADD THIS ROUTE */}
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            {/* Protected Routes - With Navbar */}
            <Route path="/dashboard" element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </>
            } />
            <Route path="/listings" element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <Listings />
                </ProtectedRoute>
              </>
            } />
            <Route path="/create-listing" element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              </>
            } />
            <Route path="/profile" element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </>
            } />
            <Route path="/chat/:userId?" element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              </>
            } />
            <Route path="/video/:roomId" element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <VideoCall />
                </ProtectedRoute>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;