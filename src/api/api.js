// /api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://ec2-54-167-153-121.compute-1.amazonaws.com:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await axios.post("http://localhost:4000/api/auth/refresh", {
            refresh_token: refreshToken
          });

          const { access_token } = response.data;
          localStorage.setItem("access_token", access_token);

          // Update the Authorization header
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Only clear storage if refresh token is invalid
        if (refreshError.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/signin-socials";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
