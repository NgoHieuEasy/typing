import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ACCESS_TOKEN } from "@/utils/constants";
import { CONFIG } from "@/config-global";
import { useUserStore } from "@/zustand/useUserStore";

export const apiClient: AxiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const { setExpiredToken } = useUserStore();

      originalRequest._retry = true;

      setExpiredToken(true);
    }

    return Promise.reject(error);
  }
);

export interface AxiosErrorResponse {
  message?: string;
  status?: number;
  statusText?: string;
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
    statusText?: string;
  };
}
export default apiClient;
