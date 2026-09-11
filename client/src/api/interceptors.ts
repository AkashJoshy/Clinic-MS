import {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import api from "./axios";
import { useAuthStore } from "../../src/store/auth";
import type { Tokens } from "@/types/auth";
import { logoutUser, refreshAccessToken } from "@/services/auth.service";

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const { tokens } = useAuthStore.getState();

    let role = config.authRole

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

const loginRoutes: Record<string, string> = {
  admin: "/admin",
  clinic: "/clinic",
  doctor: "/doctor",
  patient: "/login",
};

const redirectToLogin = (
  role: string | undefined,
  message: string,
  path: string,
) => {
  let finalRole = role;

  if (!finalRole) {
    console.log(`Final Role: ${finalRole}`);
    if (path.startsWith("/admin")) finalRole = "admin";
    else if (path.startsWith("/doctor")) finalRole = "doctor";
    else finalRole = "patient";
  }

  const redirectPath = finalRole
    ? loginRoutes[finalRole] || "/login"
    : "/login";

  if (window.location.pathname !== redirectPath) {
    window.location.replace(
      `${redirectPath}?message=${encodeURIComponent(message)}`,
    );
  }
};

api.interceptors.response.use(
  (response: AxiosResponse<any, {}>) => {
    return response;
  },
  async (error) => {
    console.log(`Error Type: ${error.response?.data?.code}`);
    console.log(`Error Code: ${error.response?.data?.status}`);
    
    const status = error.response?.status;
    const code = error.response?.data?.code;
    let authRole: "admin" | "patient" | "doctor" = error.config.authRole
    if (status === 401 && code === "TOKEN_EXPIRED") {
      console.log(`Token Expired`);
      
      try {
        const { users, updateToken } = useAuthStore.getState();

        
        if (!authRole) {
          return Promise.reject(error);
        }

        const res = await refreshAccessToken(authRole);
        const response = res.data;

        const newAccessToken = response?.accessToken;
        const refreshedUser = response?.user;

        if (!newAccessToken || !refreshedUser) {
          throw new Error("Invalid refresh response");
        }

        const role = refreshedUser.role.toLowerCase();

        if (users[authRole]!.id !== refreshedUser.id) {
          throw new Error("User mismatch during token refresh");
        }

        updateToken(newAccessToken, role);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(error.config);
      } catch (refreshError) {
        
        const { logout } = useAuthStore.getState();

        let authRole;
        if (error.config.authRole) {
          authRole = error.config?.authRole.toLowerCase() as keyof Tokens;
        }
        if (authRole) {
          logout(authRole);
        }

        const path = error.config.url;
        redirectToLogin(authRole, "Session expired. Please login again.", path);
        return Promise.reject(refreshError);
      }
    }

    // let authRole;
    // if (error.config.authRole) {
    //   authRole = error.config?.authRole.toLowerCase() as keyof Tokens;
    // }

    if (
      (status === 401 && code === "REFRESH_SESSION_NOT_FOUND") ||
      (status === 401 && code === "Invalid token")
    ) {
      console.log(`Token is having some issue here`)
      const { logout } = useAuthStore.getState();

      if (authRole) {
        logout(authRole);
        const path = error.config.url;
        redirectToLogin(authRole, "Session expired. Please login again.", path);
      }
    }

    if (status === 401) {
      const { logout } = useAuthStore.getState();
      const isLogoutRequest = error.config.url?.includes("/logout");
      const isRefreshRequest = error.config.url?.includes("/refresh");

      if (isLogoutRequest || isRefreshRequest) {
        return Promise.reject(error);
      }

      let message;
      if (code === "REFRESH_TOKEN_EXPIRED" || code === "INVALID_TOKEN") {
        message = "Session expired. Please login again.";
      } else {
        message = code;
      }

      if (authRole) {
        try {
          await logoutUser(authRole);
        } finally {
          logout(authRole);
          const path = error.config.url;
          redirectToLogin(authRole, message, path);
        }
      }
    }

    // if (status === 403) {
    //   const { user, logout } = useAuthStore.getState();
    //   const role = user?.role?.toLowerCase();

    //   if (role) {
    //     try {
    //       await logoutUser();
    //     } finally {
    //       logout(role as keyof Tokens);
    //     }
    //   }

    //   const message = "Account blocked";
    //   redirectToLogin(role, message);
    // }

    return Promise.reject(error);
  },
);

export default api;
