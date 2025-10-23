import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // supaya cookie refreshToken otomatis dikirim
});

// ✅ Tambahkan interceptor untuk menyisipkan accessToken di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Tambahkan interceptor untuk handle error & refresh token otomatis
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("%c[Auth]", "color: orange;", "Access token expired, refreshing...");

      try {
        const res = await api.post("/auth/refresh", {}, { withCredentials: true });
        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        console.log("%c[Auth]", "color: green;", "New access token received ✅");

        return api(originalRequest);
      } catch (err) {
        console.error("%c[Auth]", "color: red;", "Refresh token gagal ❌", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }

    return Promise.reject(error);
  }
);


export default api;
