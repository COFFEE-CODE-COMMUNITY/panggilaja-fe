import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ TAMBAHKAN IMPORT INI

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ Penting untuk cookie
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      retry: originalRequest?._retry,
    });

    // Skip refresh untuk endpoint public
    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/google/callback",
    ];
    
    if (publicEndpoints.some((endpoint) => originalRequest?.url?.includes(endpoint))) {
      return Promise.reject(error);
    }

    // Handle 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest?._retry) {
      // Jika sedang refresh, masukkan ke queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Attempting to refresh token...");
        
        // ✅ PERBAIKAN: Panggil refresh endpoint
        const response = await api.post("/auth/refresh");

        console.log("✅ Refresh response:", response.data);

        // ✅ PERBAIKAN: Ambil accessToken dari response yang benar
        const newAccessToken = response.data.data?.accessToken || response.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        // ✅ Decode token untuk mendapatkan user data
        const decodedToken = jwtDecode(newAccessToken);
        const newUserData = decodedToken.user;

        // ✅ Simpan token dan user data baru
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("user", JSON.stringify(newUserData));

        // ✅ Update default headers
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // ✅ Process queue dengan token baru
        processQueue(null, newAccessToken);
        isRefreshing = false;

        console.log("✅ Token refreshed successfully");

        // ✅ Retry original request
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error("❌ Refresh failed:", {
          message: refreshError.message,
          response: refreshError.response?.data,
          status: refreshError.response?.status,
        });

        processQueue(refreshError, null);
        isRefreshing = false;

        // ✅ Clear storage dan redirect ke login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        
        // ✅ Redirect ke login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("❌ Network error - cannot connect to server");
    }

    return Promise.reject(error);
  }
);

export default api;