import React from "react";
import { Menu, X } from "lucide-react";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const 
MobileHeader: React.FC<Props> = ({ mobileOpen, setMobileOpen }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14
                   flex items-center justify-between px-4
                   bg-[#0d1218] border-b border-white/10">

  <span className="text-white font-bold">Healthixia</span>

  <button
    onClick={() => setMobileOpen((o) => !o)}
    className="w-9 h-9 flex items-center justify-center rounded-lg
               text-gray-400 hover:text-white hover:bg-white/10"
  >
    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
  </button>

</header>
  );
};

export default MobileHeader;