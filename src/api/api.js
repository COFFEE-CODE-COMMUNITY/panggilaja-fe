import axios from "axios";

// http://43.133.144.23:5000/

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json',
  },
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
      console.log("🔑 Token added to:", config.url);
    } else {
      console.log("⚠️ No token found for:", config.url);
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response OK:", response.config.url, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log detail error
    console.log("❌ Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      retry: originalRequest?._retry,
      hasRefreshToken: document.cookie.includes("refreshToken"),
      cookies: document.cookie,
    });

    // Skip refresh untuk endpoint public
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
      console.log("🔓 Public endpoint, skip refresh");
      return Promise.reject(error);
    }

    // Handle 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest?._retry) {
      // Jika sedang refresh, masukkan ke queue
      if (isRefreshing) {
        console.log("⏳ Refresh in progress, adding to queue");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log("🔄 Starting token refresh...");
      console.log("📍 Current cookies:", document.cookie);

      try {
        // Panggil refresh endpoint
        const res = await api.post("/auth/refresh");

        console.log("✅ Refresh response:", res.data);

        const newAccessToken = res.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        console.log("💾 Saving new token");
        localStorage.setItem("accessToken", newAccessToken);

        // Update headers
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Process queue
        processQueue(null, newAccessToken);
        isRefreshing = false;

        console.log("🔁 Retrying original request:", originalRequest.url);
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh failed:", {
          message: refreshError.message,
          response: refreshError.response?.data,
          status: refreshError.response?.status,
        });

        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Redirect to login
        // if (window.location.pathname !== "/login") {
        //   console.log("🔀 Redirecting to login");
        //   alert("Sesi Anda telah berakhir. Silakan login kembali.");
        //   window.location.href = "/login";
        // }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("🌐 Network error - server might be down");
      alert("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    }

    return Promise.reject(error);
  }
);

export default api;
