import type { DoctorDetailsCardInfo, DoctorInfo } from "@/types/doctor";
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

interface AllDoctorCardProps {
  doctorInfo: DoctorDetailsCardInfo;
}

export const AllDoctorCard = ({ doctorInfo }: AllDoctorCardProps) => {
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

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/8 bg-[#0d1a27] transition-all duration-200 hover:border-[#1dc465]/30">

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
              <h3 className="truncate text-sm font-semibold text-white">
                {doctor?.displayName ?? "Unnamed Doctor"}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-[#8b9ab0]">
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
                ? "bg-red-500/15 text-red-400"
                : "bg-blue-500/15 text-blue-400"
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

        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              doctorStatus === "APPROVED"
                ? "bg-emerald-500/15 text-emerald-400"
                : doctorStatus === "REJECTED"
                  ? "bg-red-500/15 text-red-400"
                  : "bg-amber-500/15 text-amber-400"
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

      <div className="px-5">
        <div className="border-t border-white/5" />

        <div className="space-y-4 py-4">
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
                className="space-y-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-[#1dc465]" />

                  <p className="truncate text-xs font-semibold text-white">
                    {clinic?.name ?? "Clinic not provided"}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
                    <MapPin size={13} className="text-[#1dc465]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                      Location
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#c1ccd9]">
                      {isAddressComplete
                        ? `${clinicAddress?.city ?? "-"}, ${
                            clinicAddress?.state ?? "-"
                          }, ${clinicAddress?.country ?? "-"}`
                        : "Location not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
                    <Activity size={13} className="text-[#1dc465]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                      Consultation
                    </p>

                    <p className="mt-0.5 text-xs text-[#c1ccd9]">
                      {doctorClinic.type ?? "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
                    <IndianRupee size={13} className="text-[#1dc465]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                      Consultation Fee
                    </p>

                    <div className="mt-0.5 flex items-center gap-0.5">
                      {doctorClinic.consultationFee ? (
                        <>
                          <IndianRupee size={12} className="text-[#1dc465]" />
                          <span className="text-xs font-semibold text-[#1dc465]">
                            {doctorClinic.consultationFee}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-[#8b9ab0]">
                          Not available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
              <Phone size={13} className="text-[#1dc465]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                Phone
              </p>

              <p className="mt-0.5 text-xs text-[#c1ccd9]">
                {user?.phone ?? "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/10 px-5 py-3.5">
        <div className="flex items-center justify-end">
          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, {
                state: doctorInfo,
              })
            }
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#c1ccd9] transition-all hover:bg-white/5 hover:text-white"
          >
            View
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
