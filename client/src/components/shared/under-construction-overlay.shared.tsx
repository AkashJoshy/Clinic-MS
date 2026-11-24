import React from "react";
import { Construction } from "lucide-react";

interface UnderConstructionOverlayProps {
  name: string;
  isDark?: boolean;
  className?: string;
}

const UnderConstructionOverlay: React.FC<
  UnderConstructionOverlayProps
> = ({ name, isDark = false, className = "" }) => {
  return (
    <div
      className={`
        flex h-full w-full flex-col items-center justify-center
        gap-1 rounded-xl border backdrop-blur-sm
        ${
          isDark
            ? "border-amber-400/20 bg-[#0D1A27]/95 text-amber-400"
            : "border-amber-200 bg-white/95 text-amber-600"
        }
        ${className}
      `}
    >
      <Construction className="h-5 w-5" />

      <span className="text-center text-[9px] font-bold leading-tight">
        {name}
      </span>

      <span className="text-[8px] font-medium">
        Under Construction
      </span>
    </div>
  );
};

export default UnderConstructionOverlay;