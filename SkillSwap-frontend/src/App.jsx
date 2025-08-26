// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Listings from "./pages/Listings";
// import CreateListing from "./pages/CreateListing";
// import Profile from "./pages/Profile";
// import Chat from "./pages/Chat";
// import VideoCall from "./pages/VideoCall";
// import SkillSwapLanding from "./pages/SkillSwapLanding";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<SkillSwapLanding />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/listings"
//               element={
//                 <ProtectedRoute>
//                   <Listings />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/create-listing"
//               element={
//                 <ProtectedRoute>
//                   <CreateListing />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/chat/:userId?"
//               element={
//                 <ProtectedRoute>
//                   <Chat />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/video/:roomId"
//               element={
//                 <ProtectedRoute>
//                   <VideoCall />
//                 </ProtectedRoute>
//               }
//             />
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
import LandingPage from './pages/LandingPage'; // Import your landing page
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import VideoCall from './pages/VideoCall';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Conditional Navbar - Only show on protected routes */}
          <Routes>
            {/* Public Routes - No Navbar */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
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