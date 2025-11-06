// // src/api/axios.js
// import axios from 'axios';

// const BASE_URL =
//   import.meta.env.VITE_BACKEND_URL ||
//   (window.location.hostname === 'localhost'
//     ? 'http://localhost:8000'
//     : 'https://skillswap-backend-rnr8.onrender.com');

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// ✅ Add access token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
