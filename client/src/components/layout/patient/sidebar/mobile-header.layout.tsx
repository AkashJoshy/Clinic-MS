import React from "react";
import { Menu, X, Activity } from "lucide-react";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientMobileHeader: React.FC<Props> = ({ mobileOpen, setMobileOpen }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-[60] h-16
                   flex items-center justify-between px-4
                   bg-white border-b border-slate-200 shadow-sm">

      <div className="flex items-center gap-2 text-[#1dc465]">
        <Activity size={24} />
        <span className="text-slate-800 font-bold text-lg">Healthixia</span>
      </div>

      <button
        onClick={() => setMobileOpen((o) => !o)}
        className="w-10 h-10 flex items-center justify-center rounded-xl
                   text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

    </header>
  );
};

export default PatientMobileHeader;
