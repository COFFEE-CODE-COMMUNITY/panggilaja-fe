import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ Penting untuk kirim cookies
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

// Request interceptor - tambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Token ditambahkan ke request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle refresh token
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response OK:", response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("❌ Response Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      retry: originalRequest?._retry,
    });

    // Skip refresh untuk endpoint public
    const publicEndpoints = ["/auth/login", "/auth/register", "/auth/refresh"];
    if (publicEndpoints.some((endpoint) => originalRequest?.url?.includes(endpoint))) {
      console.log("🔓 Public endpoint, skip refresh");
      return Promise.reject(error);
    }

    // Jika 401 dan belum retry
    if (error.response?.status === 401 && !originalRequest?._retry) {
      
      // Jika sedang refresh, masukkan ke queue
      if (isRefreshing) {
        console.log("⏳ Refresh sedang berlangsung, masuk queue");
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

      console.log("🔄 Memulai refresh token...");

      try {
        // ⚡ Panggil refresh endpoint (cookies otomatis terkirim)
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.data.accessToken;

        console.log("✅ Refresh token berhasil!");

        // Simpan token baru
        localStorage.setItem("accessToken", newAccessToken);

        // Update default header
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Process queue
        processQueue(null, newAccessToken);

        isRefreshing = false;

        // Retry original request
        console.log("🔁 Retry request:", originalRequest.url);
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token gagal:", refreshError);

        processQueue(refreshError, null);
        isRefreshing = false;

        // Hapus token dan redirect
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Cegah redirect loop
        if (window.location.pathname !== "/login") {
          console.log("🔀 Redirect ke /login");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;