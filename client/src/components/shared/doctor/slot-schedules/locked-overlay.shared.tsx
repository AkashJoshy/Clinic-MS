import { getContrastTextColor } from "@/helpers/color-palette.helper";
import { useAuthStore } from "@/store";
import type { LockedOverlayProps } from "@/types/doctor-clinic";
import { Lock } from "lucide-react";

export function LockedOverlay({
  disabled,
  description,
  title,
  isDark,
  isPreviousWarns,
  previousWarnMessage,
}: LockedOverlayProps) {
  if (!disabled) return null;

  const overlayClass = isDark ? "bg-[#0d1a27]/60" : "bg-slate-900/40";

  const iconContainerClass = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-200 bg-white/80";

  const iconClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const titleClass = isDark ? "text-white" : "text-slate-900";

  const descriptionClass = isDark ? "text-[#8b9ab0]" : "text-black";

  const { primaryColor } = useAuthStore(state => state.platform)

  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center rounded-lg px-6 backdrop-blur-[2px] ${overlayClass}`}
    >
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center ${overlayClass}`}
      >
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${iconContainerClass}`}
        >
          <Lock size={22} className={iconClass} />
        </div>

        <h3 
        style={{ color: getContrastTextColor(primaryColor) }} 
        className={`text-sm font-semibold ${titleClass}`}>{title }</h3>

        <p
          className={`mt-2 max-w-sm text-xs leading-relaxed ${descriptionClass}`}
        >
          {description}
        </p>

        {isPreviousWarns && (
          <button
            type="button"
            className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {previousWarnMessage}
          </button>
        )}
      </div>
    </div>
  );
}
