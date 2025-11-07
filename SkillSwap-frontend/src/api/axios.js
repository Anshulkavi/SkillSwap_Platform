// // src/api/axios.js
// import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:8000",
//   baseURL: "https://skillswap-backend-rnr8.onrender.com",
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("skillswap_access_token"); // ✅ match key name
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

import axios from "axios";

// 🧠 Automatically switch between local and deployed backend
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://skillswap-backend-rnr8.onrender.com";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// 🔒 Add access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("skillswap_access_token"); // ✅ key must match
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
