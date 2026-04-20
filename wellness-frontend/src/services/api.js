import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Add JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Make sure token doesn't already have "Bearer " prefix
      const bearerToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      config.headers.Authorization = bearerToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle token expiration errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;