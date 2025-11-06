import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ganti sesuai environment-mu
  withCredentials: true, // ✅ wajib untuk kirim cookie refresh
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

// 🔁 Interceptor untuk setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Interceptor untuk setiap response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("⚠️ Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      retry: originalRequest?._retry,
    });

    // Jangan refresh untuk endpoint publik
    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/google/callback",
    ];
    if (publicEndpoints.some((endpoint) => originalRequest?.url?.includes(endpoint))) {
      return Promise.reject(error);
    }

    // 🔒 Tangani Unauthorized (401)
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        // Jika sedang refresh, masukkan request ini ke queue
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

        // 🔍 Decode token untuk log saja (tidak untuk overwrite user)
        try {
          const decodedToken = jwtDecode(newAccessToken);
          console.log("🔑 Decoded new token payload:", decodedToken);
        } catch (decodeError) {
          console.warn("⚠️ Gagal decode token baru:", decodeError);
        }

        // ✅ Simpan token baru
        localStorage.setItem("accessToken", newAccessToken);

        // ✅ Pertahankan data user lama (jangan timpa!)
        const existingUser = JSON.parse(localStorage.getItem("user") || "null");
        if (existingUser) {
          localStorage.setItem("user", JSON.stringify(existingUser));
        }

        // ✅ Update header Authorization
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // ✅ Proses ulang antrean yang menunggu
        processQueue(null, newAccessToken);
        isRefreshing = false;

        console.log("✅ Token refreshed successfully");
        console.log("🔁 Retrying original request:", originalRequest?.url);

        // ✅ Jalankan kembali request yang gagal
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", {
          message: refreshError.message,
          response: refreshError.response?.data,
          status: refreshError.response?.status,
        });

        processQueue(refreshError, null);
        isRefreshing = false;

        // ✅ Bersihkan token dan user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // ✅ Arahkan ke login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // 🌐 Tangani error koneksi
    if (!error.response) {
      console.error("❌ Network error: gagal terhubung ke server");
    }

    return Promise.reject(error);
  }
);

export default api;
