// // src/pages/Login.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await login(formData.email, formData.password);
//       navigate('/');
//     } catch (error) {
//       setError(error.response?.data?.detail || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to SkillSwap
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               to="/signup"
//               className="text-blue-600 hover:text-blue-500"
//             >
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// Orignal

// src/pages/Login.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await login(formData.email, formData.password);
//       // Navigate to dashboard instead of root
//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.response?.data?.detail || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* Back to Landing */}
//         <div className="text-center">
//           <Link
//             to="/"
//             className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
//           >
//             ← Back to Home
//           </Link>
//         </div>

//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to SkillSwap
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link to="/signup" className="text-blue-600 hover:text-blue-500">
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// final

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Login_img from "../assets/Login_img.png";
import GoogleLoginButton from "../components/GoogleButton";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await login(formData.email, formData.password);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-[#f7f6f5]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image - Covers 60-70% from left */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 w-full lg:w-3/5 xl:w-3/4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${Login_img})`,
            backgroundPosition: "center left",
          }}
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent lg:to-[#f7f6f5]/90" />
      </div>

      {/* Right Side Animated Background */}
      <div className="absolute inset-0 left-0 lg:left-3/5 xl:left-3/4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50">
          {/* Animated floating elements */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 bg-indigo-200/40 rounded-full blur-xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-48 h-48 bg-purple-200/30 rounded-full blur-xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-24 h-24 bg-pink-200/50 rounded-full blur-lg"
            animate={{
              x: [0, -20, 20, 0],
              y: [0, 20, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/4 right-1/3 w-36 h-36 bg-indigo-300/25 rounded-full blur-2xl"
            animate={{
              x: [0, 25, -25, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Geometric shapes for more visual interest */}
          <motion.div
            className="absolute bottom-1/4 right-1/2 w-16 h-16 border-2 border-purple-300/40 rounded-lg"
            animate={{
              rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/5 w-12 h-12 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6 lg:left-auto lg:right-46 z-20">
        <motion.div
          className="text-2xl sm:text-3xl font-bold text-white lg:text-gray-800 drop-shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="/">SKILLSWAP</a>
        </motion.div>
      </div>

      {/* Login Card - Centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div className="w-full max-w-md" variants={cardVariants}>
          {/* Glassmorphism Login Card */}
          <div className="relative">
            {/* Card with portrait/glassmorphism effect */}
            <div
              className="relative bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-8 sm:p-10 shadow-2xl"
              style={{
                boxShadow:
                  "0 25px 45px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-sm -z-10" />

              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  WELCOME BACK
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Welcome back! Please enter your details.
                </motion.p>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <motion.div
                    className="bg-red-50 backdrop-blur border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur border border-gray-300/50 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </motion.div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 pr-12 bg-white/60 backdrop-blur border border-gray-300/50 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </motion.div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-600">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="mr-2 rounded bg-white/60 border border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                    />
                    Remember me
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-gray-600 hover:text-indigo-600 transition-colors underline"
                  >
                    Forgot password
                  </Link>
                </div>

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </motion.button>

                {/* Google Sign In */}
                {/* <motion.button
                  type="button"
                  className="w-full flex items-center justify-center py-3 px-4 bg-white/60 backdrop-blur border border-gray-300/50 rounded-xl font-medium text-gray-700 hover:bg-white/80 transition-all text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGoogle className="mr-3" />
                  Sign in with Google
                </motion.button> */}
                <div className="pt-4">
                  <GoogleLoginButton onClick={() => setError("")} />{" "}
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <span className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors text-sm underline"
                  >
                    Sign up for free!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
