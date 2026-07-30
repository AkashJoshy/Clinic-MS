import { useAuthToken, useAuthStore } from "@/store"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RouteRoleProps } from "@/types/auth";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const ProtectedRoute = ({ role }: RouteRoleProps) => {
    const token = useAuthToken(role);
    const { _hasHydrated, logout } = useAuthStore();
    const location = useLocation();
    const expired = useMemo(() => !token || isTokenExpired(token), [token])
  
  const loginRoutes = {
    patient: "/login",
    doctor: "/doctor",
    admin: "/admin"    
  };

  useEffect(() => {
    const checkExpiration = () => {
      if (token && isTokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        logout(role);
      }
    };
    
      
    checkExpiration();
    
    const interval = setInterval(checkExpiration, 30 * 1000);

    return () => clearInterval(interval);
  }, [token, role, logout, location.pathname]);

  if (!_hasHydrated) return <div>Loading...</div>;
  if (!token || expired) {
    return <Navigate to={loginRoutes[role]} replace />;
  }

  return <Outlet />;
};