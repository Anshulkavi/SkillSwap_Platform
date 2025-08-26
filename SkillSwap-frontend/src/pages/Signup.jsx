// // src/pages/Signup.js
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

// src/pages/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    bio: '',
    location: '',
    skills_offered: '',
    skills_wanted: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
    } catch (error) {
      setError(error.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Landing */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Home
          </Link>
        </div>
        
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <input
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="name"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              name="confirmPassword"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <input
              name="location"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Location (optional)"
              value={formData.location}
              onChange={handleChange}
            />
            <textarea
              name="bio"
              rows="3"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tell us about yourself (optional)"
              value={formData.bio}
              onChange={handleChange}
            />
            <input
              name="skills_offered"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Skills you can offer (comma separated)"
              value={formData.skills_offered}
              onChange={handleChange}
            />
            <input
              name="skills_wanted"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Skills you want to learn (comma separated)"
              value={formData.skills_wanted}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;