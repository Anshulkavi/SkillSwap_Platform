// src/routes/AppRouter.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

// Lazy pages
const LandingPage = React.lazy(() => import("../pages/LandingPage"));
const Login = React.lazy(() => import("../components/Login"));
const Signup = React.lazy(() => import("../components/Signup"));
const HomePage = React.lazy(() => import("../pages/HomePage"));
const VideosPage = React.lazy(() => import("../pages/VideosPage"));
const VideoDetailPage = React.lazy(() => import("../pages/VideoDetailPage"));
const SkillExchangePage = React.lazy(() => import("../pages/SkillExchangePage"));
const CommunityPage = React.lazy(() => import("../pages/CommunityPage"));
const ChatLayout = React.lazy(() => import("../pages/ChatLayout"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const SettingsPage = React.lazy(() => import("../pages/Settings"));
const LeaderboardPage = React.lazy(() => import("../pages/LeaderboardPage"));

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={user ? <Navigate to="/app/home" replace /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/app/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/app/home" replace /> : <Signup />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <Layout>
                <ProtectedRoutes />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="videos" element={<VideosPage />} />
      <Route path="videos/:videoId" element={<VideoDetailPage />} />
      <Route path="skill-exchange" element={<SkillExchangePage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="chat" element={<ChatLayout />} />
      <Route path="chat/:roomId" element={<ChatLayout />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage />} />

      {/* default inside /app */}
      <Route path="*" element={<Navigate to="home" replace />} />
    </Routes>
  );
}
