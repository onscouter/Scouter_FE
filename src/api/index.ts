import { store } from "@/store";
import axios from "axios";
import { clearUser, setUser } from "@/store/authSlice";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL,
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 12000,
  withCredentials: true,
});

// Request interceptor (optional: logging, etc.)
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await apiClient.post("/auth/refresh", {});
        const newToken = res.data.access_token;
        store.dispatch(
          setUser({
            user: res.data.employee,
            accessToken: newToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
