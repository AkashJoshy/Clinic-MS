import { Stethoscope, Star } from "lucide-react";
import type { DoctorProfileCardProps } from "@/types/doctor";
import { useAuthStore } from "@/store";
import { getDoctorProfileCardTheme } from "@/helpers/admin/doctors.helper";

export const DoctorProfileCard = ({
  doctor,
  department,
  isBlocked,
  role,
}: DoctorProfileCardProps) => {
  const user = useAuthStore((state) => state.users[role]);
  const isDark = user?.theme === "DARK";

  const theme = getDoctorProfileCardTheme(isDark);

  return (
    <div
      className={`space-y-4 rounded-2xl border p-6 text-center ${theme.card}`}
    >
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-primary/35 bg-primary/10">
        {doctor.profilePicture?.url ? (
          <img
            src={doctor.profilePicture.url}
            alt={doctor.displayName}
            className="h-full w-full object-cover"
          />
        ) : (
          <Stethoscope size={56} className="text-primary" />
        )}
      </div>

      <div className="space-y-1">
        <h2 className={`${theme.heading} text-xl font-bold tracking-tight`}>
          {doctor.displayName}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span
            className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${theme.code}`}
          >
            {doctor.doctorCode}
          </span>

          {department && (
            <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold capitalize text-primary">
              {department.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />

          <span className={`${theme.heading} text-sm font-bold`}>
            {doctor.averageRating || "0.0"}
          </span>

          <span className={`${theme.muted} text-xs`}>
            ({doctor.totalReviews || 0} reviews)
          </span>
        </div>
      </div>

      {doctor.bio && (
        <p
          className={`${theme.muted} border-t pt-3 text-xs leading-relaxed ${theme.divider}`}
        >
          "{doctor.bio}"
        </p>
      )}

      <div className={`flex flex-col gap-2 border-t pt-4 ${theme.divider}`}>
        <div className="flex items-center justify-between text-xs">
          <span className={theme.muted}>Verification Status</span>

          <span
            className={`rounded-md border px-2.5 py-1 text-[11px] font-bold ${
              doctor.status === "APPROVED"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                : doctor.status === "PENDING"
                  ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                  : "border-rose-500/20 bg-rose-500/10 text-rose-500"
            }`}
          >
            {doctor.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className={theme.muted}>Account Status</span>

          <span
            className={`rounded-md border px-2.5 py-1 text-[11px] font-bold ${
              !isBlocked
                ? "border-blue-500/20 bg-blue-500/10 text-blue-500"
                : "border-rose-500/20 bg-rose-500/10 text-rose-500"
            }`}
          >
            {!isBlocked ? "Active" : "Blocked"}
          </span>
        </div>
      </div>
    </div>
  );
};
