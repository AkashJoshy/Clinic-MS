import type { NavItem } from "@/types/sideNav";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";
import LogoutAlert from "../../LogoutAlert";
import type { Tokens } from "@/types/auth";

interface Props {
  item: NavItem;
  collapsed: boolean;
}

interface LogoutData {
  logout: keyof Tokens;
  path: string;
}

const RenderNavItem: React.FC<Props> = ({ item, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [logoutData, setLogoutData] = useState<LogoutData | null>(null);
  const logout = useAuthStore((s) => s.logout);
  const baseClasses = cn(
    "group relative flex items-center px-3 py-2.5 rounded-xl",
    collapsed ? "justify-center" : "justify-center lg:justify-start",
    "transition-all duration-200 cursor-pointer select-none",
    "text-sm font-medium",
    isActive
      ? "bg-[#1dc465]/15 text-[#1dc465]"
      : "text-[#8b9ab0] hover:bg-white/5 hover:text-white",
  );

  const inner = (
    <>
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#1dc465] rounded-r-full" />
      )}

      <span
        className={cn(
          "shrink-0 flex items-center justify-center transition-colors duration-200",
          isActive ? "text-[#1dc465]" : "text-[#8b9ab0] group-hover:text-white",
        )}
      >
        {item.icon}
      </span>

      <span
        className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
          !collapsed
            ? "max-w-0 opacity-0 ml-0 lg:max-w-[200px] lg:opacity-100 lg:ml-3"
            : "max-w-0 opacity-0 ml-0",
        )}
      >
        {item.label}
      </span>

      <span
        className={cn(
          "pointer-events-none absolute left-full ml-3 z-50 px-2.5 py-1.5",
          "bg-[#1a2233] text-white text-xs font-medium rounded-lg border border-white/10",
          "opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0",
          "transition-all duration-150 whitespace-nowrap shadow-xl",
          !collapsed && "lg:hidden",
        )}
      >
        {item.label}
      </span>
    </>
  );

  const handleLogoutConfirm = () => {
    if (logoutData) {
      setShowLogoutAlert(false);
      logout(logoutData.logout);
      toast.success("Logged out");
      navigate(logoutData.path);
    }
  };

  if (item.onClick) {
    return (
      <>
        <button
          onClick={() => {
            if (item.label == "Logout" && item.onClick) {
              setShowLogoutAlert(true);
              const data = item.onClick();
              if (data) {
                setLogoutData({ logout: data.logout, path: data.path });
              }
            }
          }}
          className={cn(baseClasses, "w-full text-left outline-none")}
        >
          {inner}
        </button>
        <LogoutAlert
          open={showLogoutAlert}
          onOpenChange={setShowLogoutAlert}
          onConfirm={handleLogoutConfirm}
          isDark={true}
        />
      </>
    );
  }

  return (
    <NavLink to={item.path!} className={baseClasses}>
      {inner}
    </NavLink>
  );
};

export default RenderNavItem;
