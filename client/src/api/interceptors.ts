import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import api from "./axios";
import { useAuthStore } from "../../src/store/auth";
import type { Tokens } from "@/types/auth";
import { logoutUser, refreshAccessToken } from "@/services/auth.service";

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
    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (status === 401 && code === "TOKEN_EXPIRED") {
      const originalUser = useAuthStore.getState().user;
      const originalRole = originalUser?.role?.toLowerCase();

      try {
        const { user, updateToken } = useAuthStore.getState();
        if (!user) {
          return Promise.reject(error);
        }

        const res = await refreshAccessToken();
        const response = res.data;

        console.log(`Error configuration`);
        console.log(error.config);

        const newAccessToken = response?.accessToken;
        const refreshedUser = response?.user;

        if (!newAccessToken || !refreshedUser) {
          throw new Error("Invalid refresh response");
        }

        const role = refreshedUser.role.toLowerCase();

        if (user.id !== refreshedUser.id) {
          throw new Error("User mismatch during token refresh");
        }
        updateToken(newAccessToken, role);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(error.config);
      } catch (refreshError) {
        const { logout } = useAuthStore.getState();
        const role = originalRole;

        if (role) {
          logout(role as keyof Tokens);
        }

        const path = error.config.url;
        redirectToLogin(role, "Session expired. Please login again.", path);
        return Promise.reject(refreshError);
      }
    }

    if (
      (status === 401 && code === "REFRESH_SESSION_NOT_FOUND") ||
      (status === 401 && code === "Invalid token")
    ) {
      const { user, logout } = useAuthStore.getState();
      const role = user?.role?.toLowerCase();

      if (role) {
        logout(role as keyof Tokens);
        const path = error.config.url;
        redirectToLogin(role, "Session expired. Please login again.", path);
      }
    }

    if (status === 401) {
      const { user, logout } = useAuthStore.getState();
      const role = user?.role?.toLowerCase();
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

      if (role) {
        try {
          await logoutUser();
        } finally {
          logout(role as keyof Tokens);
          const path = error.config.url;
          redirectToLogin(role, message, path);
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
