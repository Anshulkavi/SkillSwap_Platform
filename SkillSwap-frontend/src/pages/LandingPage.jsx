import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, BookOpen, Trophy, Star, ChevronDown, Menu, X, Play, Check, MessageCircle, Video, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SkillSwapLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer → Python Developer",
      content: "I traded my design skills for coding knowledge. Now I'm a full-stack developer!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Marketing → Photography",
      content: "Learned professional photography by teaching digital marketing. Amazing community!",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Priya Patel",
      role: "Data Analyst → Guitar",
      content: "Who knew my Excel skills could get me guitar lessons? Love this platform!",
      rating: 5,
      avatar: "PP"
    }
  ];

  const skills = [
    "Programming", "Design", "Marketing", "Photography", "Music", "Languages",
    "Cooking", "Fitness", "Writing", "Business", "Art", "Math"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ 1. ADD THIS EFFECT FOR AUTOMATIC REDIRECTION
  useEffect(() => {
    // This checks the auth status after the initial loading is done.
    if (!loading && user) {
      // If there is a logged-in user, redirect them to the dashboard.
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]); // It runs whenever these values change.


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleAuthAction = (action) => {
    if (user) {
      // If user is logged in, go to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, go to login or signup
      navigate(action);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
  //     </div>
  //   );
  // }

  // ✅ 2. UPDATE THIS CONDITION
  // Show the spinner if we are still loading OR if a user exists
  // (because they will be redirected shortly). This prevents the page from flashing.
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="hover:text-cyan-400 transition-colors">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-cyan-400 transition-colors">How it Works</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-cyan-400 transition-colors">Reviews</button>
              
              {user ? (
                <>
                  <span className="text-cyan-400">Welcome, {user.name}!</span>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105"
                  >
                    Go to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAuthAction('/login')} className="hover:text-cyan-400 transition-colors">Sign In</button>
                  <button 
                    onClick={() => handleAuthAction('/signup')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('features')} className="block hover:text-cyan-400 transition-colors">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block hover:text-cyan-400 transition-colors">How it Works</button>
              <button onClick={() => scrollToSection('testimonials')} className="block hover:text-cyan-400 transition-colors">Reviews</button>
              
              {user ? (
                <>
                  <span className="block text-cyan-400">Welcome, {user.name}!</span>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full w-full text-center block text-white"
                  >
                    Go to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAuthAction('/login')} className="block hover:text-cyan-400 transition-colors">Sign In</button>
                  <button 
                    onClick={() => handleAuthAction('/signup')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full w-full text-center block text-white"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <span className="text-sm">🎉 Join 10,000+ skill swappers worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Trade Skills,
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Transform Lives
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
              Connect with people worldwide to exchange skills. Learn what you love, teach what you know, 
              and build meaningful connections in our vibrant community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {user ? (
                <>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105 flex items-center text-white"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => navigate('/chat')}
                    className="border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all flex items-center text-white"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    View Messages
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleAuthAction('/signup')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105 flex items-center text-white"
                  >
                    Start Swapping Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleAuthAction('/login')}
                    className="border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all flex items-center text-white"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Sign In
                  </button>
                </>
              )}
            </div>

            {/* Floating Skills */}
            <div className="relative">
              <div className="absolute inset-0 flex flex-wrap justify-center gap-4 opacity-20">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm animate-pulse"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animationDuration: '3s'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="text-center mt-20">
          <ChevronDown className="w-8 h-8 mx-auto animate-bounce opacity-60" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-cyan-400">SkillSwap</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of learning and teaching with our innovative platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Community</h3>
              <p className="text-gray-300">
                Connect with skilled individuals from around the world. Our diverse community spans every skill imaginable.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Integrated Chat & Video</h3>
              <p className="text-gray-300">
                Seamless communication with built-in chat and video calling features for effective skill exchange sessions.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Trusted</h3>
              <p className="text-gray-300">
                Protected user profiles with secure authentication and verified skill listings for a safe learning environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="text-purple-400">Works</span>
            </h2>
            <p className="text-xl text-gray-300">Get started in just 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
              <p className="text-gray-300">
                Sign up and list the skills you want to teach and what you'd like to learn. Add your bio, location, and preferences.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Browse & Connect</h3>
              <p className="text-gray-300">
                Explore skill listings, find perfect matches, and create your own skill exchange listings for others to discover.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Chat & Learn</h3>
              <p className="text-gray-300">
                Use integrated chat and video calling to schedule sessions and begin your skill exchange journey together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="text-green-400">Stories</span>
            </h2>
            <p className="text-xl text-gray-300">See how SkillSwap transformed lives</p>
          </div>
          
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-xl mb-6 text-gray-200">
                "{testimonials[currentTestimonial].content}"
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-cyan-400' : 'bg-white/30'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {user ? (
              <>Welcome Back, <span className="text-cyan-400">{user.name}</span>!</>
            ) : (
              <>Ready to Start Your <span className="text-cyan-400">Skill Journey</span>?</>
            )}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {user ? (
              "Continue exploring and connecting with fellow skill swappers in your dashboard."
            ) : (
              "Join thousands of learners and teachers who are already transforming their lives through skill exchange."
            )}
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">10,000+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-300">Skills Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
          
          {user ? (
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105 mb-4 text-white inline-block"
            >
              Continue to Dashboard
            </button>
          ) : (
            <button 
              onClick={() => handleAuthAction('/signup')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105 mb-4 text-white inline-block"
            >
              Join SkillSwap Today
            </button>
          )}
          
          {!user && (
            <p className="text-gray-400">Free to join • No credit card required</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 SkillSwap Platform. Connecting skills, transforming lives.
          </p>
        </div>
      </footer>
    </div>
  );
}