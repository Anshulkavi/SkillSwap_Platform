// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';

// const Hero = () => {
//   return (
//     <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="text-center lg:text-left space-y-8">
//             {/* Badge */}
//             <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
//               <Sparkles className="h-4 w-4" />
//               <span>Join 10,000+ Skill Swappers</span>
//             </div>

//             {/* Main Headline */}
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
//               Swap Skills.{' '}
//               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Learn Faster.
//               </span>{' '}
//               Grow Together.
//             </h1>

//             {/* Subheadline */}
//             <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
//               Exchange your expertise with others. Learn new skills without spending money. Build a community of lifelong learners.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Link
//                 to="/signup"
//                 className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
//               >
//                 <span>Get Started Free</span>
//                 <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <a
//                 href="#how-it-works"
//                 className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center space-x-2"
//               >
//                 <span>Learn How</span>
//               </a>
//             </div>

//             {/* Stats */}
//             <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
//               <div className="text-center lg:text-left">
//                 <div className="flex items-center justify-center lg:justify-start space-x-2 text-3xl font-bold text-gray-900">
//                   <Users className="h-8 w-8 text-purple-600" />
//                   <span>10K+</span>
//                 </div>
//                 <p className="text-gray-600 mt-1">Active Users</p>
//               </div>
//               <div className="text-center lg:text-left">
//                 <div className="flex items-center justify-center lg:justify-start space-x-2 text-3xl font-bold text-gray-900">
//                   <Zap className="h-8 w-8 text-blue-600" />
//                   <span>50K+</span>
//                 </div>
//                 <p className="text-gray-600 mt-1">Skills Swapped</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Visual */}
//           <div className="relative">
//             {/* Decorative circles */}
//             <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//             <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
//             {/* Image container */}
//             <div className="relative bg-white rounded-2xl shadow-2xl p-8">
//               <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
//                 <div className="text-center space-y-4">
//                   <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-lg">
//                     <BookOpen className="h-16 w-16 text-purple-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     Your Next Skill Awaits
//                   </h3>
//                   <p className="text-gray-600">
//                     Connect with mentors and learners worldwide
//                   </p>
//                 </div>
//               </div>

//               {/* Floating cards */}
//               <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-xl p-3 border border-purple-200">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                     <span className="text-green-600 text-lg">🎨</span>
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-gray-800">Design</p>
//                     <p className="text-xs text-gray-500">+234 skills</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-3 border border-blue-200">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <span className="text-blue-600 text-lg">💻</span>
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-gray-800">Coding</p>
//                     <p className="text-xs text-gray-500">+567 skills</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom animation keyframes - add to your global CSS */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Zap, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Join 10,000+ Skill Swappers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Swap Skills.{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Learn Faster.
              </span>{' '}
              Grow Together.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Exchange your expertise with others. Learn new skills without spending money. Build a community of lifelong learners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center space-x-2"
              >
                <span>Learn How</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-3xl font-bold text-gray-900">
                  <Users className="h-8 w-8 text-purple-600" />
                  <span>10K+</span>
                </div>
                <p className="text-gray-600 mt-1">Active Users</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-3xl font-bold text-gray-900">
                  <Zap className="h-8 w-8 text-blue-600" />
                  <span>50K+</span>
                </div>
                <p className="text-gray-600 mt-1">Skills Swapped</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            {/* Image container */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-lg">
                    <BookOpen className="h-16 w-16 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Your Next Skill Awaits
                  </h3>
                  <p className="text-gray-600">
                    Connect with mentors and learners worldwide
                  </p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-xl p-3 border border-purple-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">🎨</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Design</p>
                    <p className="text-xs text-gray-500">+234 skills</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-3 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">💻</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Coding</p>
                    <p className="text-xs text-gray-500">+567 skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes - add to your global CSS */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
  