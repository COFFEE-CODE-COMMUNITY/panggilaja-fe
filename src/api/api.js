import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // kirim cookie otomatis
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // minta token baru pakai refresh token di cookie
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.data.user.accessToken;

        // simpan ke header axios default dan request ulang
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token gagal:", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
