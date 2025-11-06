// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("skillswap_access_token"); // ✅ match key name
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
