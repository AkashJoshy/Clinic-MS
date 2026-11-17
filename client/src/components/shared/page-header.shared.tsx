
import { getContrastTextColor } from "@/helpers/color-palette.helper";
import { useAuthStore } from "@/store";
import type { PageHeaderProps } from "@/types/admin";

const PageHeader = ({ icon: Icon, title, description }: PageHeaderProps) => {
  const { admin } = useAuthStore((state) => state.users);
  const { primaryColor } = useAuthStore((state) => state.platform);
  const isDark = admin?.theme === "DARK";

  return (
    <div className="flex items-center gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/15">
        <Icon size={24} style={{ color: primaryColor }} />
      </div>

      <div>
        <h1
          className={`text-2xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h1>

        <p
          className={`mt-0.5 text-sm ${
            isDark ? "text-[#8b9ab0]" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;