import type { NavItem } from "@/types/sideNav";
import React from "react";
import RenderNavItem from "./RenderNavItem";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  items: NavItem[];
  collapsed: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavSection: React.FC<Props> = ({
  title,
  items,
  collapsed,
  setCollapsed,
}) => {
  return (
    <nav className="px-2 py-3 space-y-1 ">
      <div
        className={cn(
          "items-center transition-all duration-300 ease-in-out hidden lg:flex px-3 mb-2",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <p
          className={cn(
            "text-[11px] font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
          )}
        >
          {title}
        </p>
        {setCollapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-primary rounded-md transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {items.map((item) => (
        <RenderNavItem key={item.label} item={item} collapsed={collapsed} />
      ))}
    </nav>
  );
};

export default NavSection;
