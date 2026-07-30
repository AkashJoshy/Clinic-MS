import React from "react";
import PatientNavSection from "./sidebar/PatientNavSection";
import { cn } from "@/lib/utils";
import { PATIENT_BOTTOM_NAV_ITEMS, PATIENT_TOP_NAV_ITEMS } from "@/constants/sidebar.constant";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientSideNav: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shrink-0 z-50",
        "w-16 lg:w-64", 
        collapsed && "lg:w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
          <PatientNavSection
            title="Main Menu"
            items={PATIENT_TOP_NAV_ITEMS}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>

        <div className="mt-auto">
          <div className="mx-4 border-t border-slate-100 mb-2" />
          <PatientNavSection
            title="Account"
            items={PATIENT_BOTTOM_NAV_ITEMS}
            collapsed={collapsed}
          />
        </div>
      </div>
    </aside>
  );
};

export default PatientSideNav;
