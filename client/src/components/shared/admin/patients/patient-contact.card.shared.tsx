
import { Mail, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PatientContactCardProps } from "@/types/patient";

export const PatientContactCard = ({
  email,
  phone,
  createdAt,
  isDark,
}: PatientContactCardProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const theme = {
    card: isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200",

    heading: isDark
      ? "text-white border-white/5"
      : "text-gray-900 border-gray-100",

    label: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    value: isDark ? "text-white" : "text-gray-900",
  };

  return (
    <div className={cn("rounded-2xl border p-6 space-y-4", theme.card)}>
      <h3 className={cn("border-b pb-2 text-sm font-semibold", theme.heading)}>
        Quick Contacts
      </h3>

      <div className="space-y-3.5">
        <div className="flex items-start gap-3">
          <Mail size={16} className="mt-0.5 shrink-0 text-primary" />

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                theme.label,
              )}
            >
              Email Address
            </p>

            <p className={cn("break-all text-sm font-medium", theme.value)}>
              {email || "No Email Provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={16} className="mt-0.5 shrink-0 text-primary" />

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                theme.label,
              )}
            >
              Phone Number
            </p>

            <p className={cn("text-sm font-medium", theme.value)}>
              {phone || "No Phone Provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={16} className="mt-0.5 shrink-0 text-primary" />

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                theme.label,
              )}
            >
              Joined Date
            </p>

            <p className={cn("text-sm font-medium", theme.value)}>
              {formatDate(createdAt ? String(createdAt) : null)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
