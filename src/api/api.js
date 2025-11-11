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

api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      url: response.config.url,
      status: response.status,
    });
    return response;
  },
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

        try {
          const decodedToken = jwtDecode(newAccessToken);
          console.log("🔑 Decoded new token payload:", {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.active_role,
            exp: new Date(decodedToken.exp * 1000).toISOString(),
          });
        } catch (decodeError) {
          console.warn("⚠️ Gagal decode token baru:", decodeError);
        }

        localStorage.setItem("accessToken", newAccessToken);

        const existingUser = JSON.parse(localStorage.getItem("user") || "null");
        if (existingUser) {
          console.log("✅ Preserving existing user data");
          localStorage.setItem("user", JSON.stringify(existingUser));
        }

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        console.log("✅ Token refreshed successfully");
        console.log("🔁 Retrying original request:", originalRequest?.url);

        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", {
          message: refreshError.message,
          response: refreshError.response?.data,
          status: refreshError.response?.status,
        });

        processQueue(refreshError, null);
        isRefreshing = false;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        if (typeof window !== "undefined") {
          console.log("🔄 Redirecting to login...");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

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
