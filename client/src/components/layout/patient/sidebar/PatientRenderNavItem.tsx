import type { NavItem } from "@/types/sideNav";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import LogoutAlert from "../../LogoutAlert";
import { useAuthStore } from "@/store";

interface Props {
  item: NavItem;
  collapsed: boolean;
}

const PatientRenderNavItem: React.FC<Props> = ({ item, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === item.path;
  const isLogout = item.label === "Logout";
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const logout = useAuthStore(state => state.logout)

  const baseClasses = cn(
    "group relative flex items-center px-3 py-2.5 rounded-xl",
    "justify-center lg:justify-start",
    "transition-all duration-200 cursor-pointer select-none",
    "text-sm font-medium",
    isActive
      ? "bg-[#1dc465]/10 text-[#1dc465]"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
  );

  const inner = (
    <>
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#1dc465] rounded-r-full" />
      )}

      <span
        className={cn(
          "shrink-0 flex items-center justify-center transition-colors duration-200",
          isActive ? "text-[#1dc465]" : "text-slate-400 group-hover:text-slate-600"
        )}
      >
        {item.icon}
      </span>

      <span
        className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out hidden lg:block",
          !collapsed ? "max-w-50 opacity-100 ml-3" : "max-w-0 opacity-0 ml-0"
        )}
      >
        {item.label}
      </span>

      <span
        className={cn(
          "pointer-events-none absolute left-full ml-3 z-50 px-2.5 py-1.5",
          "bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl",
          "opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 hidden",
          "transition-all duration-150 whitespace-nowrap",
          collapsed ? "lg:flex" : "hidden"
        )}
      >
        {item.label}
      </span>
    </>
  );

  const handleLogoutConfirm = () => {
    setShowLogoutAlert(false);
    logout("patient")
    toast.success("Logged out");
    navigate("/login");
  };

  if (isLogout) {
    return (
      <>
        <button
          onClick={() => setShowLogoutAlert(true)}
          className={cn(baseClasses, "w-full text-left outline-none")}
        >
          {inner}
        </button>
        <LogoutAlert
          open={showLogoutAlert}
          onOpenChange={setShowLogoutAlert}
          onConfirm={handleLogoutConfirm}
          isDark={false}
        />
      </>
    );
  }

  if (item.onClick) {
    return (
      <button
        onClick={item.onClick}
        className={cn(baseClasses, "w-full text-left outline-none")}
      >
        {inner}
      </button>
    );
  }

  return (
    <NavLink to={item.path!} className={baseClasses}>
      {inner}
    </NavLink>
  );
};

export default PatientRenderNavItem;