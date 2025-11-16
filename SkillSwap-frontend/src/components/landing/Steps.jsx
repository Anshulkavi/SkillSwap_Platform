import React from 'react';
import { UserPlus, Search, Repeat } from 'lucide-react';

const Steps = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and list the skills you want to offer and the skills you want to learn. Build your reputation with ratings and reviews.',
      color: 'purple'
    },
    {
      icon: Search,
      title: 'Find Your Match',
      description: 'Browse through thousands of skills and connect with people who have what you want to learn and need what you can teach.',
      color: 'blue'
    },
    {
      icon: Repeat,
      title: 'Start Swapping',
      description: 'Send swap requests, schedule sessions, and exchange knowledge. Rate your experience and grow your skill network.',
      color: 'pink'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Get started in three simple steps and begin your learning journey today
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colorClasses = {
              purple: {
                bg: 'bg-purple-100',
                icon: 'text-purple-600',
                border: 'border-purple-200',
                gradient: 'from-purple-600 to-purple-700'
              },
              blue: {
                bg: 'bg-blue-100',
                icon: 'text-blue-600',
                border: 'border-blue-200',
                gradient: 'from-blue-600 to-blue-700'
              },
              pink: {
                bg: 'bg-pink-100',
                icon: 'text-pink-600',
                border: 'border-pink-200',
                gradient: 'from-pink-600 to-pink-700'
              }
            };

            const colors = colorClasses[step.color];

            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="relative bg-white rounded-2xl border-2 border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`${colors.bg} ${colors.border} border-2 w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className={`h-10 w-10 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (hidden on mobile, visible on md+) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 transform -translate-y-1/2 z-10">
                    <svg
                      className="w-8 h-8 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your skill-swapping journey?
          </p>
          <a
            href="#cta"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Steps;