// // Orignal page

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     password: '',
//     confirmPassword: '',
//     bio: '',
//     location: '',
//     skills_offered: '',
//     skills_wanted: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       const { confirmPassword, ...signupData } = formData;
//       await signup(signupData);
//       navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
//     } catch (error) {
//       setError(error.response?.data?.detail || 'Signup failed');
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
//             Create your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}
//           <div className="space-y-4">
//             <input
//               name="email"
//               type="email"
//               required
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Email address"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <input
//               name="name"
//               type="text"
//               required
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Full name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <input
//               name="password"
//               type="password"
//               required
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <input
//               name="confirmPassword"
//               type="password"
//               required
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Confirm password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//             <input
//               name="location"
//               type="text"
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Location (optional)"
//               value={formData.location}
//               onChange={handleChange}
//             />
//             <textarea
//               name="bio"
//               rows="3"
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Tell us about yourself (optional)"
//               value={formData.bio}
//               onChange={handleChange}
//             />
//             <input
//               name="skills_offered"
//               type="text"
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Skills you can offer (comma separated)"
//               value={formData.skills_offered}
//               onChange={handleChange}
//             />
//             <input
//               name="skills_wanted"
//               type="text"
//               className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Skills you want to learn (comma separated)"
//               value={formData.skills_wanted}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Creating account...' : 'Sign up'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               to="/login"
//               className="text-blue-600 hover:text-blue-500"
//             >
//               Already have an account? Sign in
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// 22

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../contexts/AuthContext';
// import { FaHome } from 'react-icons/fa';
// import Singn_up_img from '../assets/Singn_up_img.png';
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     password: '',
//     confirmPassword: '',
//     bio: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       const { confirmPassword, ...signupData } = formData;
//       await signup(signupData);
//       navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
//     } catch (error) {
//       setError(error.response?.data?.detail || 'Signup failed');
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.6 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   const inputVariants = {
//     focus: { scale: 1.01, transition: { duration: 0.2 } }
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-[#f7f6f5] p-4 sm:p-8 font-sans"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Back to Home Button */}
//       <motion.div
//         className="mb-6"
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Link
//           to="/"
//           className="inline-flex items-center px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-lg transition-all duration-200 font-medium"
//         >
//           <FaHome className="mr-2" />
//           Back to Home
//         </Link>
//       </motion.div>

//       {/* Main Container */}
//       <div className="flex items-center justify-center">
//         <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
//           <div className="flex flex-col lg:flex-row min-h-[600px]">

//             {/* Left Side - Image */}
//             <div className="lg:flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
//               {/* Animated Background Elements */}
//               <div className="absolute inset-0">
//                 <motion.div
//                   className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
//                   animate={{
//                     x: [0, 30, 0],
//                     y: [0, -30, 0],
//                   }}
//                   transition={{
//                     duration: 8,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 />
//                 <motion.div
//                   className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"
//                   animate={{
//                     x: [0, -40, 0],
//                     y: [0, 40, 0],
//                   }}
//                   transition={{
//                     duration: 10,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 />
//               </div>

//               {/* Illustration or Placeholder */}

//               <div className="relative z-10 text-center text-white">
//                 <img src={Singn_up_img} alt="Sign up illustration" className="w-full h-full max-w-md mx-auto object-contain " />
//               </div>
//             </div>

//             {/* Right Side - Signup Form */}
//             <div className="lg:flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">

//               {/* Already have account link */}
//               <div className="hidden sm:block absolute top-8 right-8 text-sm text-gray-600">
//                 <span className="mr-2">Already have an account?</span>
//                 <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
//                   Sign in
//                 </Link>
//               </div>

//               <div className="mt-8 sm:mt-16 mb-8">
//                 <motion.h1
//                   className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2"
//                   variants={itemVariants}
//                 >
//                   Create Account
//                 </motion.h1>
//                 <motion.p
//                   className="text-gray-500 text-sm"
//                   variants={itemVariants}
//                 >
//                   Sign up to get started
//                 </motion.p>
//               </div>

//               <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
//                 {error && (
//                   <motion.div
//                     className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {error}
//                   </motion.div>
//                 )}

//                 <motion.div variants={itemVariants}>
//                   <motion.div
//                     className="relative"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                   >
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <input
//                       name="email"
//                       type="email"
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
//                       placeholder="your@email.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </motion.div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <motion.div
//                     className="relative"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                   >
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                     <input
//                       name="name"
//                       type="text"
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
//                       placeholder="Your full name"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </motion.div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <motion.div
//                     className="relative"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                   >
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <input
//                       name="password"
//                       type="password"
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
//                       placeholder="••••••••••"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </motion.div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <motion.div
//                     className="relative"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                   >
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <input
//                       name="confirmPassword"
//                       type="password"
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
//                       placeholder="Confirm password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                     />
//                   </motion.div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <motion.div
//                     className="relative"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                   >
//                     <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                       </svg>
//                     </div>
//                     <textarea
//                       name="bio"
//                       rows="3"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
//                       placeholder="Tell us about yourself (optional)"
//                       value={formData.bio}
//                       onChange={handleChange}
//                     />
//                   </motion.div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <motion.button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-lg"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {loading ? (
//                       <div className="flex items-center">
//                         <motion.div
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                         <span className="text-sm sm:text-base">Creating account...</span>
//                       </div>
//                     ) : (
//                       'Create Account'
//                     )}
//                   </motion.button>
//                 </motion.div>

//                 {/* Mobile Sign in link */}
//                 <div className="block sm:hidden text-center pt-4">
//                   <span className="text-sm text-gray-600 mr-2">Already have an account?</span>
//                   <Link to="/login" className="text-indigo-600 font-semibold hover:underline text-sm">
//                     Sign in
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Signup;

// final

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaHome } from "react-icons/fa";
import Singn_up_img from "../assets/Singn_up_img.png";
import GoogleLoginButton from "../components/GoogleButton";

// And your illustration image here

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      navigate("/login", {
        state: { message: "Account created successfully! Please login." },
      });
    } catch (error) {
      setError(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    focus: { scale: 1.01, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f7f6f5] p-4 sm:p-8 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back to Home Button - Top Left */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center px-3 py-1.5 bg-white rounded-lg shadow 
               border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md 
               transition-all duration-200 font-medium text-base"
        >
          <FaHome className="mr-2 text-base" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen pt-16 sm:pt-0">
        <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row ">
            {/* Left Side - Image (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 lg:p-12 items-center justify-center relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"
                  animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Singn_up_img */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="w-full max-w-sm">
                  <img
                    src={Singn_up_img}
                    alt="Sign up iSingn_up_img"
                    className="w-full h-auto object-contain rounded-2xl shadow-lg bg-white/10 backdrop-blur-sm p-3"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 lg:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              {/* Logo placeholder */}
              <div className="absolute top-8 left-8 lg:relative lg:top-0 lg:left-0 lg:mb-8">
                {/* <img src={logo} alt="Logo" className="w-12 h-12" /> */}
              </div>

              {/* Header */}
              <div className="mb-6 sm:mb-8 text-center lg:text-left">
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-2"
                  variants={itemVariants}
                >
                  Create Account
                </motion.h1>
                <motion.p
                  className="text-gray-500 text-sm sm:text-base"
                  variants={itemVariants}
                >
                  Sign up to get started
                </motion.p>
              </div>

              {/* Signup Form */}
              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </motion.div>
                </motion.div>

                {/* Name Input */}
                <motion.div variants={itemVariants}>
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </motion.div>
                </motion.div>

                {/* Password and Confirm Password - Row layout on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password Input */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      className="relative"
                      variants={inputVariants}
                      whileFocus="focus"
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        name="password"
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Confirm Password Input */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      className="relative"
                      variants={inputVariants}
                      whileFocus="focus"
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bio Textarea */}
                <motion.div variants={itemVariants}>
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <textarea
                      name="bio"
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                      placeholder="Tell us about yourself (optional)"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-md"
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
                        <span className="text-sm sm:text-base">
                          Creating account...
                        </span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </motion.div>

                {/* Already have account link - Moved below button */}
                <div className="text-center pt-4">
                  <span className="text-sm sm:text-base text-gray-600 mr-2">
                    Already have an account?
                  </span>
                  <Link
                    to="/login"
                    className="text-indigo-600 font-semibold hover:underline text-sm sm:text-base"
                  >
                    Sign in
                  </Link>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center text-xs sm:text-sm text-gray-400 my-6">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="px-3 sm:px-4 bg-white z-10">
                    Sign up with email
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Continue with Google - Moved below sign in link */}
                {/* <div className="pt-4">
                  <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition text-sm sm:text-base">
                    <FaGoogle className="mr-3" />
                    Continue with Google
                  </button>
                </div> */}
                <div className="pt-4">
                  <GoogleLoginButton />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
