import React from 'react';
import { 
  Users, 
  Search, 
  Star, 
  Shield, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  Award,
  Repeat
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'User Profiles',
      description: 'Create detailed profiles showcasing skills you offer and want to learn. Build your reputation in the community.',
      color: 'purple'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find exactly what you need with advanced filters. Search by skill, location, availability, and ratings.',
      color: 'blue'
    },
    {
      icon: Repeat,
      title: 'Easy Swap Requests',
      description: 'Send and manage swap requests effortlessly. Track all your exchanges in one convenient dashboard.',
      color: 'green'
    },
    {
      icon: Star,
      title: 'Rating & Feedback',
      description: 'Rate your experiences and read reviews from others. Build trust through transparent feedback.',
      color: 'yellow'
    },
    {
      icon: Calendar,
      title: 'Session Scheduling',
      description: 'Schedule learning sessions at your convenience. Integrated calendar and reminder system.',
      color: 'indigo'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Communicate directly with your swap partners. Plan sessions and ask questions in real-time.',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Safe & Moderated',
      description: 'Admin moderation ensures a safe environment. Report issues and get support when needed.',
      color: 'red'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and climb leaderboards. Get recognized for your contributions to the community.',
      color: 'orange'
    }
  ];

  const colorClasses = {
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
    blue: { bg: 'bg-blue-100', icon: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
    green: { bg: 'bg-green-100', icon: 'text-green-600', gradient: 'from-green-500 to-green-600' },
    yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', gradient: 'from-yellow-500 to-yellow-600' },
    indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', gradient: 'from-indigo-500 to-indigo-600' },
    pink: { bg: 'bg-pink-100', icon: 'text-pink-600', gradient: 'from-pink-500 to-pink-600' },
    red: { bg: 'bg-red-100', icon: 'text-red-600', gradient: 'from-red-500 to-red-600' },
    orange: { bg: 'bg-orange-100', icon: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Swap Skills
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed to make skill exchange seamless and rewarding
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = colorClasses[feature.color];

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`${colors.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-7 w-7 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose SkillSwap+?
              </h3>
              <p className="text-lg text-purple-100 mb-6">
                Join a thriving community of learners and teachers. Exchange skills without spending money and grow together.
              </p>
              <ul className="space-y-3">
                {[
                  'Learn without financial barriers',
                  'Connect with passionate individuals',
                  'Build lasting relationships',
                  'Gain diverse skills and experiences'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10K+', label: 'Active Users' },
                { number: '50K+', label: 'Skills Swapped' },
                { number: '500+', label: 'Skill Categories' },
                { number: '98%', label: 'Satisfaction Rate' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-purple-100">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;