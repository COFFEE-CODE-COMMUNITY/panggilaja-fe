import axios from "axios";
import { store } from "../../store/Store";

const axiosInstance = axios.create({
  baseURL: "https://https://api.panggilaja.space/api", // Ganti dengan URL backend Anda
  timeout: 10000,
});

// Interceptor untuk auto-add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login jika unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
