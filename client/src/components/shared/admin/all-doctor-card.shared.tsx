import type { DoctorDetailsCardInfo } from "@/types/doctor";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "@/store";

interface AllDoctorCardProps {
  doctorInfo: DoctorDetailsCardInfo;
  isDark: boolean;
}

export const AllDoctorCard = ({ doctorInfo, isDark }: AllDoctorCardProps) => {
  const navigate = useNavigate();

  const { user, doctor, doctorClinicDetails } = doctorInfo;

  const isBlocked = user?.isBlocked;
  const isActive = user?.isActive;

  const accountStatus = isBlocked
    ? "Blocked"
    : !isActive
      ? "Inactive"
      : "Active";

  const doctorStatus = doctor?.status;

  const theme = {
    card: isDark ? "border-white/8 bg-[#0d1a27]" : "border-gray-200 bg-white",
    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-600",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    label: isDark ? "text-[#607086]" : "text-gray-400",
    divider: isDark ? "border-white/5" : "border-gray-100",
    clinicCard: isDark
      ? "border-white/5 bg-white/[0.02]"
      : "border-gray-100 bg-gray-50",
    footer: isDark
      ? "border-white/5 bg-black/10"
      : "border-gray-100 bg-gray-50",
    viewButton: isDark
      ? "border-white/10 text-[#c1ccd9] hover:bg-white/5 hover:text-white"
      : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    iconBackground: isDark ? "bg-primary/10" : "bg-primary-50",
  };

  return (
    <div
      className={`group overflow-hidden rounded-2xl border transition-all duration-200 hover:border-[#1dc465]/40 ${theme.card}`}
    >
      {/* Doctor information */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#1dc465]/20 bg-[#1dc465]/10">
              {doctor?.profilePicture?.url ? (
                <img
                  src={doctor.profilePicture.url}
                  alt={doctor.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={20} className="text-[#1dc465]" />
              )}
            </div>

            <div className="min-w-0">
              <h3 className={`truncate text-sm font-semibold ${theme.heading}`}>
                {doctor?.displayName ?? "Unnamed Doctor"}
              </h3>

              <div className={`mt-1 flex items-center gap-1.5 ${theme.muted}`}>
                <Building2 size={12} />

                <p className="truncate text-xs">
                  {doctorClinicDetails.length
                    ? doctorClinicDetails
                        .map(({ clinic }) => clinic?.name)
                        .filter(Boolean)
                        .join(", ")
                    : "Clinic not provided"}
                </p>
              </div>
            </div>
          </div>

          <span
            className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              isBlocked || !isActive
                ? "bg-red-500/15 text-red-500 dark:text-red-400"
                : "bg-blue-500/15 text-blue-500 dark:text-blue-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isBlocked || !isActive ? "bg-red-400" : "bg-blue-400"
              }`}
            />
            {accountStatus}
          </span>
        </div>

        {/* Doctor approval status */}
        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              doctorStatus === "APPROVED"
                ? "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400"
                : doctorStatus === "REJECTED"
                  ? "bg-red-500/15 text-red-500 dark:text-red-400"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
            }`}
          >
            {doctorStatus === "APPROVED" ? (
              <CheckCircle size={12} />
            ) : (
              <Clock size={12} />
            )}

            {doctorStatus ?? "PENDING"}
          </span>
        </div>
      </div>

      {/* Clinic details */}
      <div className="px-5">
        <div className={`border-t ${theme.divider}`} />

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconBackground}`}
            >
              <Phone size={13} className="text-primary" />
            </div>

            <div className="min-w-0">
              <p
                className={`text-[10px] uppercase tracking-wide ${theme.label}`}
              >
                Phone
              </p>

              <p className={`mt-0.5 text-xs ${theme.text}`}>
                {user?.phone ?? "Not available"}
              </p>
            </div>
          </div>

          {doctorClinicDetails.map((doctorClinicDetail) => {
            const { clinic, clinicAddress, ...doctorClinic } =
              doctorClinicDetail;

            const isAddressComplete =
              clinicAddress?.country ||
              clinicAddress?.state ||
              clinicAddress?.city ||
              clinicAddress?.pincode;

            return (
              <div
                key={doctorClinic.id}
                className={`space-y-3 rounded-xl border p-3 ${theme.clinicCard}`}
              >
                <div className="flex items-center gap-2 text-primary">
                  <Building2 size={14} />

                  <p
                    className={`truncate text-xs font-semibold ${theme.heading}`}
                  >
                    {clinic?.name ?? "Clinic not provided"}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconBackground}`}
                  >
                    <MapPin size={13} className="text-primary " />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] uppercase tracking-wide ${theme.label}`}
                    >
                      Location
                    </p>

                    <p className={`mt-0.5 truncate text-xs ${theme.text}`}>
                      {isAddressComplete
                        ? `${clinicAddress?.city ?? "-"}, ${
                            clinicAddress?.state ?? "-"
                          }, ${clinicAddress?.country ?? "-"}`
                        : "Location not provided"}
                    </p>
                  </div>
                </div>

                {/* Consultation type */}
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconBackground}`}
                  >
                    <Activity size={13} className="text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] uppercase tracking-wide ${theme.label}`}
                    >
                      Consultation
                    </p>

                    <p className={`mt-0.5 text-xs ${theme.text}`}>
                      {doctorClinic.type ?? "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Consultation fee */}
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconBackground}`}
                  >
                    <IndianRupee size={13} className="text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] uppercase tracking-wide ${theme.label}`}
                    >
                      Consultation Fee
                    </p>

                    <div className="mt-0.5 flex items-center gap-0.5">
                      {doctorClinic.consultationFee ? (
                        <>
                          <IndianRupee size={12} className="text-emerald-500" />
                          <span className="text-xs font-semibold text-emerald-500">
                            {doctorClinic.consultationFee}
                          </span>
                        </>
                      ) : (
                        <span className={`text-xs ${theme.muted}`}>
                          Not available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t px-5 py-3.5 ${theme.footer} ${theme.divider}`}>
        <div className="flex items-center justify-end">
          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, {
                state: doctorInfo,
              })
            }
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${theme.viewButton}`}
          >
            View
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
