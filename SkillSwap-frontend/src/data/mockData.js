// Mock Data for SkillSwap+ Platform

// User Data
export const mockUser = {
  id: 1,
  name: 'Sarah Johnson',
  avatar: '/api/placeholder/40/40',
  level: 12,
  xp: 2450,
  xpToNext: 550,
  badges: ['Video Master', 'Mentor', 'Community Leader'],
  skillsOffered: ['React Development', 'UI/UX Design'],
  skillsLearning: ['Machine Learning', 'Photography']
};

// Videos Data
export const mockVideos = [
  {
    id: 1,
    title: 'Advanced React Hooks Tutorial',
    creator: 'Alex Chen',
    thumbnail: '/api/placeholder/300/200',
    duration: '15:32',
    views: 12500,
    likes: 890,
    rating: 4.8,
    category: 'Programming',
    level: 'Advanced'
  },
  {
    id: 2,
    title: 'Watercolor Painting Basics',
    creator: 'Emma Wilson',
    thumbnail: '/api/placeholder/300/200',
    duration: '22:15',
    views: 8300,
    likes: 654,
    rating: 4.9,
    category: 'Art',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Guitar Fingerpicking Techniques',
    creator: 'Marcus Rodriguez',
    thumbnail: '/api/placeholder/300/200',
    duration: '18:45',
    views: 15600,
    likes: 1200,
    rating: 4.7,
    category: 'Music',
    level: 'Intermediate'
  },
  {
    id: 4,
    title: 'Python Data Analysis with Pandas',
    creator: 'Dr. Sarah Kim',
    thumbnail: '/api/placeholder/300/200',
    duration: '28:30',
    views: 9400,
    likes: 756,
    rating: 4.6,
    category: 'Programming',
    level: 'Intermediate'
  },
  {
    id: 5,
    title: 'Photography Composition Rules',
    creator: 'David Park',
    thumbnail: '/api/placeholder/300/200',
    duration: '12:20',
    views: 11200,
    likes: 980,
    rating: 4.8,
    category: 'Photography',
    level: 'Beginner'
  },
  {
    id: 6,
    title: 'Advanced Photoshop Techniques',
    creator: 'Lisa Chen',
    thumbnail: '/api/placeholder/300/200',
    duration: '35:45',
    views: 7800,
    likes: 620,
    rating: 4.9,
    category: 'Design',
    level: 'Advanced'
  }
];

// Skill Listings Data
export const mockSkillListings = [
  {
    id: 1,
    user: {
      name: 'Alex Chen',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      reviewCount: 127,
      level: 15,
      verified: true
    },
    skillOffered: 'React Development',
    skillWanted: 'UI/UX Design',
    description: 'Senior React developer with 5+ years experience. Looking to learn modern design principles and Figma.',
    availability: ['Evenings', 'Weekends'],
    sessionType: ['Video Call', 'Screen Share'],
    hourlyRate: 'Free Exchange',
    tags: ['JavaScript', 'TypeScript', 'Next.js', 'Node.js'],
    location: 'San Francisco, CA',
    responseTime: '< 2 hours',
    totalSessions: 89
  },
  {
    id: 2,
    user: {
      name: 'Sarah Martinez',
      avatar: '/api/placeholder/60/60',
      rating: 4.8,
      reviewCount: 93,
      level: 12,
      verified: true
    },
    skillOffered: 'Digital Marketing',
    skillWanted: 'Web Development',
    description: 'Marketing strategist specializing in social media and content creation. Want to learn HTML/CSS basics.',
    availability: ['Mornings', 'Afternoons'],
    sessionType: ['Video Call', 'Chat'],
    hourlyRate: 'Free Exchange',
    tags: ['SEO', 'Content Strategy', 'Social Media', 'Analytics'],
    location: 'Austin, TX',
    responseTime: '< 4 hours',
    totalSessions: 67
  },
  {
    id: 3,
    user: {
      name: 'David Kim',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      reviewCount: 156,
      level: 18,
      verified: true
    },
    skillOffered: 'Photography',
    skillWanted: 'Video Editing',
    description: 'Professional photographer with expertise in portrait and landscape photography. Looking to expand into video content creation.',
    availability: ['Weekends', 'Evenings'],
    sessionType: ['Video Call', 'In-Person'],
    hourlyRate: '$25/hour',
    tags: ['Portrait Photography', 'Lightroom', 'Camera Basics', 'Composition'],
    location: 'New York, NY',
    responseTime: '< 1 hour',
    totalSessions: 134
  },
  {
    id: 4,
    user: {
      name: 'Emma Wilson',
      avatar: '/api/placeholder/60/60',
      rating: 4.7,
      reviewCount: 84,
      level: 11,
      verified: false
    },
    skillOffered: 'Graphic Design',
    skillWanted: 'Python Programming',
    description: 'Creative designer with 3+ years in brand identity and logo design. Interested in learning Python for automation.',
    availability: ['Afternoons', 'Evenings'],
    sessionType: ['Video Call', 'Screen Share'],
    hourlyRate: 'Free Exchange',
    tags: ['Adobe Creative Suite', 'Brand Identity', 'Logo Design', 'Typography'],
    location: 'Seattle, WA',
    responseTime: '< 6 hours',
    totalSessions: 45
  },
  {
    id: 5,
    user: {
      name: 'Marcus Rodriguez',
      avatar: '/api/placeholder/60/60',
      rating: 4.8,
      reviewCount: 112,
      level: 14,
      verified: true
    },
    skillOffered: 'Guitar Playing',
    skillWanted: 'Music Production',
    description: 'Classical and acoustic guitarist with 10+ years experience. Looking to learn digital music production and mixing.',
    availability: ['Evenings', 'Weekends'],
    sessionType: ['Video Call', 'In-Person'],
    hourlyRate: '$20/hour',
    tags: ['Classical Guitar', 'Fingerpicking', 'Music Theory', 'Songwriting'],
    location: 'Los Angeles, CA',
    responseTime: '< 3 hours',
    totalSessions: 78
  }
];

// Community Posts Data
export const mockCommunityPosts = [
  {
    id: 1,
    author: 'DevMaster',
    avatar: '/api/placeholder/40/40',
    content: 'Just finished my first React Native app! Thanks to all the amazing tutorials here. The community support has been incredible.',
    timestamp: '2 hours ago',
    likes: 23,
    comments: 5,
    image: null
  },
  {
    id: 2,
    author: 'ArtisticSoul',
    avatar: '/api/placeholder/40/40',
    content: 'Looking for someone to exchange digital art techniques for photography tips! I specialize in character design and illustration.',
    timestamp: '4 hours ago',
    likes: 15,
    comments: 8,
    image: '/api/placeholder/400/200'
  },
  {
    id: 3,
    author: 'CodeNewbie',
    avatar: '/api/placeholder/40/40',
    content: 'Can anyone recommend the best resources for learning Python? I\'m completely new to programming but very motivated!',
    timestamp: '6 hours ago',
    likes: 31,
    comments: 12,
    image: null
  },
  {
    id: 4,
    author: 'MusicMaker',
    avatar: '/api/placeholder/40/40',
    content: 'Just uploaded a new guitar tutorial on fingerpicking patterns. Would love your feedback!',
    timestamp: '1 day ago',
    likes: 45,
    comments: 18,
    image: '/api/placeholder/400/200'
  }
];

// Leaderboard Data
export const mockLeaderboard = [
  { 
    rank: 1, 
    name: 'Alex Chen', 
    xp: 15420, 
    badge: 'Master Mentor', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 245,
    specialties: ['React', 'JavaScript', 'Node.js']
  },
  { 
    rank: 2, 
    name: 'Sarah Johnson', 
    xp: 12890, 
    badge: 'Video Expert', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 189,
    specialties: ['UI/UX Design', 'Photography']
  },
  { 
    rank: 3, 
    name: 'Marcus Rodriguez', 
    xp: 11250, 
    badge: 'Community Leader', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 156,
    specialties: ['Guitar', 'Music Theory']
  },
  { 
    rank: 4, 
    name: 'Emma Wilson', 
    xp: 9800, 
    badge: 'Skill Sharer', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 134,
    specialties: ['Digital Art', 'Illustration']
  },
  { 
    rank: 5, 
    name: 'David Kim', 
    xp: 8650, 
    badge: 'Rising Star', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 198,
    specialties: ['Photography', 'Lightroom']
  },
  { 
    rank: 6, 
    name: 'Lisa Park', 
    xp: 7890, 
    badge: 'Creative Genius', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 167,
    specialties: ['Graphic Design', 'Branding']
  },
  { 
    rank: 7, 
    name: 'John Smith', 
    xp: 7234, 
    badge: 'Code Mentor', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 123,
    specialties: ['Python', 'Data Science']
  },
  { 
    rank: 8, 
    name: 'Maria Garcia', 
    xp: 6890, 
    badge: 'Language Expert', 
    avatar: '/api/placeholder/40/40',
    weeklyGain: 145,
    specialties: ['Spanish', 'French', 'Italian']
  }
];

// Categories and Filter Options
export const skillCategories = [
  'All', 'Programming', 'Design', 'Marketing', 'Photography', 'Music', 
  'Art', 'Writing', 'Business', 'Languages', 'Cooking', 'Fitness'
];

export const videoCategories = [
  'All', 'Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'
];

export const skillLevels = [
  'All', 'Beginner', 'Intermediate', 'Advanced'
];

export const filterOptions = [
  { id: 'all', label: 'All Listings' },
  { id: 'free', label: 'Free Exchange' },
  { id: 'paid', label: 'Paid Sessions' },
  { id: 'verified', label: 'Verified Users' },
  { id: 'online', label: 'Online Now' }
];