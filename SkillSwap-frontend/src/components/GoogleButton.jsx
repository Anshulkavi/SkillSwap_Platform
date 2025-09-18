// import React from "react";

// export default function GoogleLoginButton() {
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:8000/api/auth/google/login";
//   };

//   return (
//     <button
//       onClick={handleGoogleLogin}
//       className="bg-white w-full py-2 px-4 border border-gray-300 rounded-lg 
//                  flex items-center justify-center gap-2 
//                  text-gray-700 hover:bg-gray-100 transition"
//     >
//       <img
//         src="https://developers.google.com/identity/images/g-logo.png"
//         alt="Google Logo"
//         className="w-5 h-5"
//       />
//       Continue with Google
//     </button>
//   );
// }

// src/components/GoogleButton.jsx

import React from "react";

// Accept an 'onClick' prop
export default function GoogleLoginButton({ onClick }) {
  const handleGoogleLogin = () => {
    // If a function was passed in the onClick prop, run it first
    if (onClick) {
      onClick();
    }
    // Then, continue with the Google login
    window.location.href = "http://localhost:8000/api/auth/google/login";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white w-full py-2 px-4 border border-gray-300 rounded-lg 
                 flex items-center justify-center gap-2 
                 text-gray-700 hover:bg-gray-100 transition"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
}