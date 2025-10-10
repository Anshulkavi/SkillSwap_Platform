// src/api/axios.js
import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://skillswap-backend-rnr8.onrender.com/'); // ⬅️ your Render backend URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
