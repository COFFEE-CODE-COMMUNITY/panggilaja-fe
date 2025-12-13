import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isDevelopment = import.meta.env.MODE === "development";
const API_BASE_URL = isDevelopment
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.panggilaja.space/api";

console.log("🌐 API Base URL:", API_BASE_URL);
console.log("🌍 Environment:", import.meta.env.MODE);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ==========================
// REQUEST INTERCEPTOR
// ==========================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📤 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ==========================
// RESPONSE INTERCEPTOR
// ==========================
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      url: response.config.url,
      status: response.status,
    });
    return response;
  },

  // ================
  // HANDLING ERROR
  // ================
  async (error) => {
    const originalRequest = error.config;

    console.log("⚠️ Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      retry: originalRequest?._retry,
      message: error.message,
    });


    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/google/callback",
    ];

    if (
      publicEndpoints.some((endpoint) =>
        originalRequest?.url?.includes(endpoint)
      )
    ) {
      console.log("⏭️ Skipping refresh for public endpoint");
      return Promise.reject(error);
    }

    // ========================================
    // HANDLE 401 → REFRESH TOKEN
    // ========================================
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        console.log("⏳ Request queued while refreshing token");
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

        const response = await api.post("/auth/refresh");

        console.log("✅ Refresh response:", response.data);

        const newAccessToken =
          response.data.data?.accessToken || response.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token found in refresh response");
        }

        // Decode token untuk ambil role BARU
        let decodedUser = null;
        try {
          const decoded = jwtDecode(newAccessToken);
          decodedUser = decoded.user;
          console.log("🔑 Decoded new token user:", decodedUser);
        } catch (decodeError) {
          console.warn("⚠️ Gagal decode access token:", decodeError);
        }

        // SIMPAN TOKEN + USER YANG TERUPDATE
        localStorage.setItem("accessToken", newAccessToken);

        if (decodedUser) {
          localStorage.setItem("user", JSON.stringify(decodedUser));
        }

        // Update header
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        console.log("🔁 Retrying original request...");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", refreshError);

        processQueue(refreshError, null);
        isRefreshing = false;

        // ✅ PERBAIKAN: Clear storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // ✅ PERBAIKAN: Redirect berdasarkan current path
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          
          // Jangan redirect kalau sudah di login page
          if (!currentPath.includes('/login')) {
            console.log("🔄 Redirecting to login...");
            
            // Redirect ke login dengan return URL
            const returnUrl = encodeURIComponent(currentPath);
            window.location.href = `/login?returnUrl=${returnUrl}`;
          }
        }

        return Promise.reject(refreshError);
      }
    }

    // ================================
    // NETWORK ERROR HANDLING
    // ================================
    if (!error.response) {
      console.error("❌ Network error: gagal terhubung ke server");
      console.error("❌ Full error:", {
        message: error.message,
        code: error.code,
        config: {
          baseURL: error.config?.baseURL,
          url: error.config?.url,
        },
      });
    }

    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default api;
