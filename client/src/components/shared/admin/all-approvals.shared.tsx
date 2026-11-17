import type { AllApprovalsProps } from "@/types/admin";
import { Building } from "lucide-react";

export function AllApprovals({
  icon: Icon = Building,
  name,
  isDark,
}: AllApprovalsProps) {
  const theme = {
    container: isDark
      ? "border-white/1 bg-[#0d1a27]/50"
      : "border-gray-200 bg-white",
    iconWrapper: isDark ? "bg-white/5" : "bg-gray-100",
    icon: isDark ? "text-[#4a5568]" : "text-gray-400",
    heading: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed ${theme.container}`}
    >
      <div
        className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${theme.iconWrapper}`}
      >
        <Icon size={32} className={theme.icon} />
      </div>

      <h2 className={`text-lg font-bold ${theme.heading}`}>
        No {name} Found
      </h2>

      <p
        className={`mt-1 text-sm xs:px-9 xxs:px-0 ${theme.description}`}
      >
        Try adjusting your search or filters
      </p>
    </div>
  );
}