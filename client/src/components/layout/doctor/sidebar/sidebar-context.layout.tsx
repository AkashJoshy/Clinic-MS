import React from "react";
import {
  DOCTOR_TOP_NAV_ITEMS,
  DOCTOR_BOTTOM_NAV_ITEMS,
} from "@/constants/sidebar.constant";
import NavSection from "../../admin/sidebar/nav-section.layout";
import { ROLE_VALUES } from "@/constants/role.constants";
import { useAuthStore } from "@/store";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
}

const SidebarContent: React.FC<Props> = ({
  collapsed,
  setCollapsed,
  isDark,
}) => {
  return (
    <div
      className={`flex h-full flex-col ${isDark ? "bg-[#080d14]" : "bg-white"}`}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <NavSection
          title="Main Menu"
          items={DOCTOR_TOP_NAV_ITEMS}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          role={ROLE_VALUES.lower.DOCTOR}
        />
      </div>

      <div className="mt-auto">
        <div className="mx-4 border-t border-white/10 mb-2" />
        <NavSection
          title="Account"
          items={DOCTOR_BOTTOM_NAV_ITEMS}
          collapsed={collapsed}
          role={ROLE_VALUES.lower.DOCTOR}
        />
      </div>
    </div>
  );
};

export default SidebarContent;
