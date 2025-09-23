import axios from "axios";

const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 12000,
  withCredentials: true,
});

// Request interceptor (optional: logging, etc.)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.access_token;
        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
