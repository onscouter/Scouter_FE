import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// We'll override this with a setter so we can get the token at runtime
let getToken: (() => Promise<string | null>) | null = null;

export const setAccessTokenGetter = (getter: () => Promise<string | null>) => {
  getToken = getter;
};

// Request interceptor to inject access token
apiClient.interceptors.request.use(async (config) => {
  const token = getToken && (await getToken());
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
