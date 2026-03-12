import { jwtDecode } from "jwt-decode";
import useAuthStore from "../store/useAuthStore";

const isDevelopment = import.meta.env.MODE === "development";
const API_BASE_URL = isDevelopment
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.panggilaja.space/api";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = useAuthStore.getState().accessToken;
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const config = {
    credentials: "include",
    ...options,
    headers,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    let response = await fetch(url, config);

    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/google/callback",
    ];

    if (!response.ok) {
      if (response.status === 401 && !publicEndpoints.some(e => endpoint.includes(e))) {
        return await handle401Error(url, config);
      }

      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        throw new Error(response.statusText);
      }
      throw errorData;
    }

    if (response.status !== 204) {
      return await response.json();
    }
    return null;

  } catch (error) {
    throw error;
  }
};

const handle401Error = async (originalUrl, originalConfig) => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(token => {
      originalConfig.headers.set("Authorization", `Bearer ${token}`);
      return fetch(originalUrl, originalConfig).then(res => res.json());
    }).catch(err => {
      throw err;
    });
  }

  isRefreshing = true;

  try {
    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
      }
    });
    console.log(refreshResponse)
    if (!refreshResponse.ok) {
      throw new Error('Refresh failed');
    }

    const data = await refreshResponse.json();
    const newAccessToken = data.data?.accessToken || data.accessToken;

    if (!newAccessToken) {
      throw new Error("No access token found in refresh response");
    }

    let decodedUser = null;
    try {
      const decoded = jwtDecode(newAccessToken);
      decodedUser = decoded.user;
    } catch (error) {
      console.warn("Gagal decode access token", error);
    }

    useAuthStore.getState().setAuth(newAccessToken, decodedUser);

    processQueue(null, newAccessToken);
    isRefreshing = false;

    originalConfig.headers.set("Authorization", `Bearer ${newAccessToken}`);
    const retriedResponse = await fetch(originalUrl, originalConfig);
    return await retriedResponse.json();

  } catch (error) {
    processQueue(error, null);
    isRefreshing = false;
    useAuthStore.getState().logout();

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/login")) {
        const returnUrl = encodeURIComponent(currentPath);
        window.location.href = `/login?returnUrl=${returnUrl}`;
      }
    }
    throw error;
  }
};

export { API_BASE_URL };
export default apiFetch;
