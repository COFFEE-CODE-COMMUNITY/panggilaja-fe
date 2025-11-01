import axios from "axios";

// http://43.133.144.23:5000/

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
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
    } else {
      console.log("⚠️ No token found for:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log detail error
    console.log("Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      retry: originalRequest?._retry,
      hasRefreshToken: document.cookie.includes('refreshToken'),
      cookies: document.cookie
    });

    // Skip refresh untuk endpoint public
    const publicEndpoints = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/google/callback"];
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
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Panggil refresh endpoint
        const res = await api.post("/auth/refresh");
        
        const newAccessToken = res.data.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        localStorage.setItem("accessToken", newAccessToken);

        // Update headers
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Process queue
        processQueue(null, newAccessToken);
        isRefreshing = false;

        return api(originalRequest);
        
      } catch (refreshError) {
        console.error("Refresh failed:", {
          message: refreshError.message,
          response: refreshError.response?.data,
          status: refreshError.response?.status
        });

        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Redirect to login
        if (window.location.pathname !== "/login") {
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      alert("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    }

    return Promise.reject(error);
  }
);

export default api;