// import React, { useState } from 'react';
// import Header from './components/Header';
// import HomePage from './pages/HomePage';
// import VideosPage from './pages/VideosPage';
// import SkillExchangePage from './pages/SkillExchangePage';
// import CommunityPage from './pages/CommunityPage';
// import LeaderboardPage from './pages/LeaderboardPage';
// import ProfilePage from './pages/ProfilePage';

// // Mock user data
// const mockUser = {
//   id: 1,
//   name: 'Sarah Johnson',
//   avatar: '/api/placeholder/40/40',
//   level: 12,
//   xp: 2450,
//   xpToNext: 550,
//   badges: ['Video Master', 'Mentor', 'Community Leader'],
//   skillsOffered: ['React Development', 'UI/UX Design'],
//   skillsLearning: ['Machine Learning', 'Photography']
// };

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [user] = useState(mockUser);

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage user={user} />;
//       case 'videos':
//         return <VideosPage />;
//       case 'skillswap':
//         return <SkillExchangePage />;
//       case 'community':
//         return <CommunityPage />;
//       case 'leaderboard':
//         return <LeaderboardPage />;
//       case 'profile':
//         return <ProfilePage user={user} />;
//       default:
//         return <HomePage user={user} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header 
//         user={user} 
//         currentPage={currentPage} 
//         setCurrentPage={setCurrentPage} 
//       />
//       <main>
//         {renderPage()}
//       </main>
//     </div>
//   );
// };

// export default App;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import SkillExchangePage from './pages/SkillExchangePage';
import CommunityPage from './pages/CommunityPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import { mockUser } from './data/mockData';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<Loading />}>
          <Layout user={mockUser}>
            <Routes>
              <Route path="/" element={<HomePage user={mockUser} />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/skill-exchange" element={<SkillExchangePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute user={mockUser}>
                    <ProfilePage user={mockUser} />
                  </ProtectedRoute>
                } 
              />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<HomePage user={mockUser} />} />
            </Routes>
          </Layout>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;