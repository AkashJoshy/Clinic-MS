import { useAuthToken, useAuthStore } from "@/store";
import type { RouteRoleProps } from "@/types/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { isAccessTokenExpired } from "./ProtectedRoute";

export const AuthRoute = ({ role }: RouteRoleProps) => {
    let token = useAuthToken(role)
    const { _hasHydrated, logout } = useAuthStore();

    const dashboardRoutes = {
            patient: "/patient/dashboard",
            clinic: "/clinic/dashboard",
            doctor: "/doctor/dashboard",
            admin: "/admin/dashboard"
    }

    const expired = useMemo(() => token ? isAccessTokenExpired(token) : true, [token]);

    useEffect(() => {
        if (token && expired) {
            logout(role);
        }
    }, [token, expired, logout, role]);

    if (!_hasHydrated) return <div>Loading...</div>;

    if (token && !expired) {
        return <Navigate to={dashboardRoutes[role]} replace />;
    }

    return <Outlet />
}