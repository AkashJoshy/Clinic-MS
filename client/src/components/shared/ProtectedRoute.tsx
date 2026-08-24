import { useAuthToken, useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RouteRoleProps } from "@/types/auth";
import { useEffect, useMemo, useState } from "react";
import { refreshAccessToken } from "@/services/auth.service";

export const isAccessTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );

    return payload.exp * 1000 < Date.now();
  } catch (error: any) {
    return true
  }
};

export const ProtectedRoute = ({ role }: RouteRoleProps) => {
  const token = useAuthToken(role);
  const { _hasHydrated, logout, user, updateToken } = useAuthStore();
  const location = useLocation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const accessexpired = useMemo(
    () => !token || isAccessTokenExpired(token),
    [token],
  );

  const loginRoutes = {
    patient: "/login",
    doctor: "/doctor",
    admin: "/admin",
  };

  useEffect(() => {
    const checkExpiration = async () => {
      if (!token || !user) return;

      const expired = isAccessTokenExpired(token);

      if (!expired) return;

      // try {
      //   setIsRefreshing(true);
      //   const response = await refreshAccessToken();

      //   const newAccessToken = response.data?.accessToken;
      //   const refreshedUser = response.data?.user;

      //   if (!newAccessToken || !refreshedUser) {
      //     throw new Error("Invalid refresh response");
      //   }

      //   const refreshedRole = refreshedUser.role.toLowerCase();

      //   if (user.id !== refreshedUser.id) {
      //     throw new Error("User mismatch during token refresh");
      //   }

      //   updateToken(newAccessToken, refreshedRole);
      // } catch (error) {
      //   console.error("Token refresh failed:", error);

      //   logout(role);

      //   window.location.replace(
      //     `${loginRoutes[role]}?message=${encodeURIComponent(
      //       "Session expired. Please login again.",
      //     )}`,
      //   );
      // } finally {
      //   setIsRefreshing(false);
      // }

    };

    checkExpiration();

    const interval = setInterval(checkExpiration, 30 * 1000);

    return () => clearInterval(interval);
  }, [token, role, logout, location.pathname]);

  if (!_hasHydrated) return <div>Loading...</div>;
  if (!token || accessexpired) {
    return <Navigate to={loginRoutes[role]} replace />;
  }

  return token ? <Outlet /> : <Navigate to={loginRoutes[role]} replace />;
};
