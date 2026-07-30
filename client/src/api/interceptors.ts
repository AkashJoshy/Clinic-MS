import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import api from "./axios";
import { useAuthStore } from "../../src/store/auth";
import type { Tokens } from "@/types/auth";

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const { tokens, user } = useAuthStore.getState();
    let role = user?.role as keyof typeof tokens;
    if (role) {
      role = role.toLowerCase() as keyof Tokens;
    }
    const token = role ? tokens[role] : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse<any, {}>) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    console.log(`Axios Response`);

    if (status === 401) {
      const { user, logout } = useAuthStore.getState();
      const role = user?.role?.toLowerCase();

      if (role) {
        logout(role as any);
      }

      const loginRoutes: Record<string, string> = {
        admin: "/admin",
        clinic: "/clinic",
        doctor: "/doctor",
        patient: "/login",
      };
      
      let message = "";
      if (code === "TOKEN_EXPIRED" || code === "INVALID_TOKEN") {
      }
      message = "Session expired. Please login again.";

      const redirectPath = role ? loginRoutes[role] || "/login" : "/login";
      window.location.href = message
    ? `${redirectPath}?message=${message}`
    : redirectPath;
    }

    return Promise.reject(error);
  },
);

export default api;
