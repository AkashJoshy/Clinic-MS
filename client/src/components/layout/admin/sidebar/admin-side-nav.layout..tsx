import React, { useState } from "react";
import SidebarContent from "./sidebar-context.layout";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

const AdminSideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { admin } = useAuthStore(state => state.users)


  return (
    <aside
      className={cn(
        `flex flex-col h-full bg-${admin?.theme === "DARK" ? "dark" : ""} border-r border-white/10 transition-all duration-300 ease-in-out flex-shrink-0 z-50`,
        collapsed ? "w-17" : "w-17 lg:w-64",
      )}
    >
      <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </aside>
  );
};

export default AdminSideNav;
