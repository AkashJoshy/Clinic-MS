import React, { useState } from "react";
import SidebarContent from "./SidebarContext";
import { cn } from "@/lib/utils";

const AdminSideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[#0d1218] border-r border-white/10 transition-all duration-300 ease-in-out flex-shrink-0 z-50",
        collapsed ? "w-17" : "w-17 lg:w-64",
      )}
    >
      <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </aside>
  );
};

export default AdminSideNav;
