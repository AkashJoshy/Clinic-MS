import type { PatientProfileCardProps } from "@/types/patient";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPatientProfileCardTheme } from "@/helpers/admin/patients.helper";

export const PatientProfileCard = ({
  patient,
  isActive,
  isBlocked,
  isEmailVerified,
  isDark,
}: PatientProfileCardProps) => {
  const theme = getPatientProfileCardTheme(isDark);

  return (
    <div
      className={cn("rounded-2xl border p-6 text-center space-y-4", theme.card)}
    >
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-primary/35 bg-primary/10">
        {patient.imageUrl?.url ? (
          <img
            src={patient.imageUrl.url}
            alt={patient.displayName}
            className="h-full w-full animate-fade-in object-cover"
          />
        ) : (
          <User size={56} className="text-primary" />
        )}
      </div>

      <div className="space-y-1">
        <h2 className={cn("text-xl font-bold tracking-tight", theme.name)}>
          {patient.displayName}
        </h2>

        <div className="flex items-center justify-center gap-2">
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[11px] font-bold",
              theme.badge,
            )}
          >
            {patient.patientNumber}
          </span>

          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[11px] font-bold capitalize",
              theme.badge,
            )}
          >
            {patient.relation === "Self"
              ? "Primary Patient"
              : `Relation: ${patient.relation}`}
          </span>
        </div>
      </div>

      <div className={cn("flex flex-col gap-2 border-t pt-4", theme.divider)}>
        <div className="flex items-center justify-between text-xs">
          <span className={theme.description}>Account Status</span>

          <span
            className={cn(
              "rounded-md border px-2.5 py-1 text-[11px] font-bold",
              isBlocked
                ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                : isActive
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-400",
            )}
          >
            {isBlocked ? "Blocked" : isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className={theme.description}>Email Verification</span>

          <span
            className={cn(
              "rounded-md border px-2.5 py-1 text-[11px] font-bold",
              isEmailVerified
                ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400",
            )}
          >
            {isEmailVerified ? "Verified" : "Unverified"}
          </span>
        </div>
      </div>
    </div>
  );
};
