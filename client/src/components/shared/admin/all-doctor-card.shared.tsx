import type { DoctorInfo } from "@/types/doctor";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Building2,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  UserRound,
  ArrowRight,
  IndianRupee,
  Ban,
  Unlock,
} from "lucide-react";

interface AllDoctorCardProps {
  doctorInfo: DoctorInfo;
}

export const AllDoctorCard = ({ doctorInfo }: AllDoctorCardProps) => {
  const navigate = useNavigate();

  const { clinic, address, user, doctor, doctorClinic } = doctorInfo;

  const isBlocked = user?.isBlocked;
  const isActive = user?.isActive;

  const accountStatus = isBlocked
    ? "Blocked"
    : !isActive
      ? "Inactive"
      : "Active";

  const isAddressComplete =
    address?.country ||
    address?.state ||
    address?.city ||
    address?.pincode;

  const doctorStatus = doctor?.status;

  const handleBlockToggle = () => {
    console.log(isBlocked ? "Unblock doctor" : "Block doctor", doctor?.id);
  };

  return (
    <div className="group bg-[#0d1a27] border border-white/8 rounded-2xl overflow-hidden hover:border-[#1dc465]/30 transition-all duration-200">
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#1dc465]/10 border border-[#1dc465]/20 flex items-center justify-center shrink-0 overflow-hidden">
              {doctor?.profilePicture?.url ? (
                <img
                  src={doctor.profilePicture.url}
                  alt={doctor.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserRound size={20} className="text-[#1dc465]" />
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-white text-sm font-semibold truncate">
                {doctor?.displayName ?? "Unnamed Doctor"}
              </h3>

              <div className="flex items-center gap-1.5 mt-1 text-[#8b9ab0]">
                <Building2 size={12} />
                <p className="text-xs truncate">
                  {clinic?.name ?? "Clinic not provided"}
                </p>
              </div>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold flex-shrink-0 ${
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

        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#1dc465]/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={13} className="text-[#1dc465]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                Location
              </p>

              <p className="text-xs text-[#c1ccd9] mt-0.5 truncate">
                {isAddressComplete
                  ? `${address?.city ?? "-"}, ${address?.state ?? "-"}, ${address?.country ?? "-"}`
                  : "Location not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#1dc465]/10 flex items-center justify-center flex-shrink-0">
              <Activity size={13} className="text-[#1dc465]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                Consultation
              </p>

              <p className="text-xs text-[#c1ccd9] mt-0.5">
                {doctorClinic?.type ?? "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#1dc465]/10 flex items-center justify-center flex-shrink-0">
              <Phone size={13} className="text-[#1dc465]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                Phone
              </p>

              <p className="text-xs text-[#c1ccd9] mt-0.5">
                {user?.phone ?? "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-white/5 bg-black/10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-shrink-0">
            <p className="text-[10px] uppercase tracking-wide text-[#607086]">
              Consultation Fee
            </p>

            <div className="flex items-center gap-0.5 mt-0.5">
              {doctorClinic?.consultationFee ? (
                <>
                  <IndianRupee size={13} className="text-[#1dc465]" />
                  <span className="text-sm font-bold text-[#1dc465]">
                    {doctorClinic.consultationFee}
                  </span>
                </>
              ) : (
                <span className="text-xs font-medium text-[#8b9ab0]">
                  Not available
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigate(`/admin/doctors/${doctor?.id}`, {
                  state: doctorInfo,
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-[#c1ccd9] text-xs font-medium hover:bg-white/5 hover:text-white transition-all cursor-pointer"
            >
              View
              <ArrowRight size={13} />
            </button>

           
          </div>
        </div>
      </div>
    </div>
  );
};