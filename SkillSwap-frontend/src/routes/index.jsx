import { lazy } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const VideosPage = lazy(() => import('../pages/VideosPage'));
const SkillExchangePage = lazy(() => import('../pages/SkillExchangePage'));
const CommunityPage = lazy(() => import('../pages/CommunityPage'));
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

// Route configuration
export const routes = [
  {
    path: '/',
    element: HomePage,
    name: 'Home',
    protected: false
  },
  {
    path: '/videos',
    element: VideosPage,
    name: 'Videos',
    protected: false
  },
  {
    path: '/skill-exchange',
    element: SkillExchangePage,
    name: 'Skill Exchange',
    protected: false
  },
  {
    path: '/community',
    element: CommunityPage,
    name: 'Community',
    protected: false
  },
  {
    path: '/leaderboard',
    element: LeaderboardPage,
    name: 'Leaderboard',
    protected: false
  },
  {
    path: '/profile',
    element: ProfilePage,
    name: 'Profile',
    protected: true
  }
];

// Navigation items for header
export const navigationItems = [
  { path: '/', label: 'Home', icon: 'Home' },
  { path: '/videos', label: 'Videos', icon: 'Video' },
  { path: '/skill-exchange', label: 'Skill Exchange', icon: 'Users' },
  { path: '/community', label: 'Community', icon: 'MessageCircle' },
  { path: '/leaderboard', label: 'Leaderboard', icon: 'Trophy' },
  { path: '/profile', label: 'Profile', icon: 'User' }
];