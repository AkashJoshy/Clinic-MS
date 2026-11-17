import { getContrastTextColor } from "@/helpers/color-palette.helper";
import { usePlatformConfig } from "@/hooks/use-platform-config.hook";
import { useAuthStore } from "@/store";
import type { RouteRoleProps } from "@/types/auth";
import { Activity, User } from "lucide-react";

export function DashboardHeader({ role }: { role: RouteRoleProps }) {
  const { websiteName, primaryColor } = usePlatformConfig();
  const users = useAuthStore((state) => state.users);

  const contrastColor = getContrastTextColor(primaryColor);

  const firstName = role
    ? (users[role]?.fullName?.split(" ")[0] ?? "Unavailable")
    : "Unavailable";

  return (
    <div
      style={{
        backgroundColor: primaryColor,
        color: contrastColor,
      }}
      className="sticky top-0 z-100 flex items-center justify-between border-b border-black/10 p-3.5 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)]"
    >

      <div className="flex items-center gap-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${contrastColor}15` }}
        >
          <Activity size={18} style={{ color: contrastColor }} />
        </div>

        <h1 className="font-semibold" style={{ color: contrastColor }}>
          {websiteName}
        </h1>
      </div>

      {/* User Information */}
      <div className="relative">
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors"
          style={{
            borderColor: `${contrastColor}25`,
            backgroundColor: `${contrastColor}10`,
          }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: `${contrastColor}15` }}
          >
            <User size={14} style={{ color: contrastColor }} />
          </div>

          <span
            className="max-w-20 truncate text-sm font-medium"
            style={{ color: contrastColor }}
          >
            {firstName}
          </span>
        </div>
      </div>
    </div>
  );
}
