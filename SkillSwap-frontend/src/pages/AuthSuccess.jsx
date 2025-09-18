// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AuthSuccess() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       localStorage.setItem("token", token);
//       navigate("/dashboard");
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return <div>Redirecting...</div>;
// }

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ 1. IMPORT useAuth

export default function AuthSuccess() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth(); // ✅ 2. GET THE FUNCTION FROM CONTEXT

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // ✅ 3. USE THE CONTEXT FUNCTION INSTEAD OF localStorage
      loginWithToken(token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, loginWithToken]); // ✅ 4. ADD TO DEPENDENCY ARRAY

  return <div>Redirecting...</div>;
}