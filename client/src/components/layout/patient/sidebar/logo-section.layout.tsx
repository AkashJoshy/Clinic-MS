import React from "react";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientLogoSection: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <div className={cn("flex items-center p-4 border-b border-slate-200 h-16", collapsed ? "justify-center" : "justify-center lg:justify-between")}>
      
      <div className="flex-1 lg:hidden" /> 

      {collapsed ? (
        <button className="hidden lg:flex w-full items-center justify-center text-slate-500 p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setCollapsed(false)}>
           <ChevronRight size={20} />
        </button>
      ) : (
        <button className="hidden lg:flex text-slate-500 p-1 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setCollapsed(true)}>
          <ChevronLeft size={20} />
        </button>
      )}

    </div>
  );
};

export default PatientLogoSection;
