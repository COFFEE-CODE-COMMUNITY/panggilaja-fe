import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { updateProfile, logout } from "../features/authSlice";

const isDevelopment = import.meta.env.MODE === "development";
const API_BASE_URL = isDevelopment
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.panggilaja.space/api";



const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

let isRefreshing = false;
let failedQueue = [];

let store = null;
export const injectStore = (_store) => {
  store = _store;
};

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

    return response;
  },

  // ================
  // HANDLING ERROR
  // ================
  async (error) => {
    const originalRequest = error.config;




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

      return Promise.reject(error);
    }

    // ========================================
    // HANDLE 401 → REFRESH TOKEN
    // ========================================
    if (error.response?.status === 401 && !originalRequest?._retry) {
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

        } catch (decodeError) {
          console.warn("⚠️ Gagal decode access token:", decodeError);
        }

        // SIMPAN TOKEN + USER YANG TERUPDATE
        localStorage.setItem("accessToken", newAccessToken);

        if (decodedUser) {
          localStorage.setItem("user", JSON.stringify(decodedUser));
        }

        // ✅ SYNC REDUX: Update state agar aplikasi tahu token baru
        if (store) {
          store.dispatch(updateProfile());
        }

        // Update header
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;


        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", refreshError);

        processQueue(refreshError, null);
        isRefreshing = false;

        // ✅ PERBAIKAN: Clear storage & Redux
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        if (store) {
          store.dispatch(logout());
        }

        // ✅ PERBAIKAN: Redirect berdasarkan current path
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;

          // Jangan redirect kalau sudah di login page
          if (!currentPath.includes('/login')) {


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
