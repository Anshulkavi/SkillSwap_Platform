import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

  const { user } = useAuth();

  // If user is logged in → DO NOT show landing navbar
  if (user) return null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillSwap+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Features
            </a>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2"
              >
                Features
              </a>
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-center hover:shadow-lg transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;