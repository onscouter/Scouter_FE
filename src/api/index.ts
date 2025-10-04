import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/store";
import { clearUser, setUser } from "@/store/authSlice";

// === Base configuration ===
const LOCAL_URL = import.meta.env.VITE_API_BASE_URL_LOCAL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createClient = (timeout: number) =>
  axios.create({
    baseURL: BASE_URL || LOCAL_URL,
    timeout,
    withCredentials: true,
  });

export const apiClient = createClient(15000);
export const aiApiClient = createClient(30000);

// === Attach Authorization header ===
const attachAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// === Refresh token and retry original request ===
const handleAuthError = async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };

  const shouldRetry =
    error.response?.status === 401 &&
    originalRequest &&
    !originalRequest._retry &&
    !originalRequest.url?.includes("/auth/refresh");

  if (shouldRetry) {
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

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newToken}`,
      };

      return axios(originalRequest);
    } catch (refreshError) {
      store.dispatch(clearUser());
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

// === Apply interceptors ===
[apiClient, aiApiClient].forEach((client) => {
  client.interceptors.request.use(attachAuthHeader);
  client.interceptors.response.use((response) => response, handleAuthError);
});
