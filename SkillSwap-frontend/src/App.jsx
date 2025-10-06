// import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Layout from './components/Layout';
// import Loading from './components/Loading';
// import ProtectedRoute from './components/ProtectedRoute';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './pages/HomePage';
// import VideosPage from './pages/VideosPage';
// import SkillExchangePage from './pages/SkillExchangePage';
// import CommunityPage from './pages/CommunityPage';
// import LeaderboardPage from './pages/LeaderboardPage';
// import ProfilePage from './pages/ProfilePage';

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <div className="min-h-screen bg-gray-50">
//           <Suspense fallback={<Loading />}>
//             <Routes>
//               {/* Public routes - No Layout */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* Protected routes - With Layout */}
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <LayoutWrapper />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </Suspense>
//         </div>
//       </AuthProvider>
//     </Router>
//   );
// };

// // Wrapper component for layout and nested routes
// const LayoutWrapper = () => {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/videos" element={<VideosPage />} />
//         <Route path="/skill-exchange" element={<SkillExchangePage />} />
//         <Route path="/community" element={<CommunityPage />} />
//         <Route path="/leaderboard" element={<LeaderboardPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
        
//         {/* Catch all route - redirect to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Layout>
//   );
// };

// export default App;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';

// Import Pages
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import SkillExchangePage from './pages/SkillExchangePage';
import CommunityPage from './pages/CommunityPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes - No Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes - With Layout */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <LayoutWrapper />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
};

// Wrapper component for layout and nested routes
const LayoutWrapper = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/videos" element={<VideosPage />} />
        
        {/* 👇 2. Add the new route for the detail page */}
        <Route path="/videos/:videoId" element={<VideoDetailPage />} />
        
        <Route path="/skill-exchange" element={<SkillExchangePage />} />
        <Route path="/community" element={<CommunityPage />} />
        {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/settings" element={<SettingsPage />} />


        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;