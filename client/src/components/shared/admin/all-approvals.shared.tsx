import { getAllApprovalsTheme } from "@/helpers/common.helper";
import type { AllApprovalsProps } from "@/types/admin";
import { Building } from "lucide-react";

export function AllApprovals({
  icon: Icon = Building,
  name,
  isDark,
}: AllApprovalsProps) {
  const theme = getAllApprovalsTheme(isDark);

  return (
    <div
      className={`flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed ${theme.container}`}
    >
      <div
        className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${theme.iconWrapper}`}
      >
        <Icon size={32} className={theme.icon} />
      </div>

      <h2 className={`text-lg font-bold ${theme.heading}`}>No {name} Found</h2>

      <p className={`mt-1 text-sm xs:px-9 xxs:px-0 ${theme.description}`}>
        Try adjusting your search or filters
      </p>
    </div>
  );
}
