import React from "react";
import { ADMIN_TOP_NAV_ITEMS, ADMIN_BOTTOM_NAV_ITEMS } from "@/constants/sidebar.constant";
import NavSection from "./NavSection";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContent: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <NavSection
          title="Main Menu"
          items={ADMIN_TOP_NAV_ITEMS}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      <div className="mt-auto pb-0">
        <div className="mx-4 border-t border-white/10 mb-2" />
        <NavSection
          title="Account"
          items={ADMIN_BOTTOM_NAV_ITEMS}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

export default SidebarContent;