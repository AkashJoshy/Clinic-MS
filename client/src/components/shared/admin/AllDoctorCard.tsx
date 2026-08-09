import type { DoctorInfo } from "@/types/doctor";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Building2,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";

interface AllDoctorCardProps {
  doctorInfo: DoctorInfo;
}

export const AllDoctorCard = ({ doctorInfo }: AllDoctorCardProps) => {
  const navigate = useNavigate();

  const { clinic, address, user, doctor, doctorClinic } = doctorInfo;

  const isAddressComplete =
    address?.country || address?.state || address?.city || address?.pincode;

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-5 hover:border-[#1dc465]/30 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#1dc465]/10 border border-[#1dc465]/20 flex items-center justify-center flex-shrink-0">
          {doctor?.profilePicture?.url ? (
            <img
              src={doctor.profilePicture.url}
              alt={doctor.displayName}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Building2 size={18} className="text-primary-400" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              doctor?.status === "APPROVED"
                ? "bg-emerald-500/15 text-emerald-400"
                : doctor?.status === "REJECTED"
                  ? "bg-red-500/15 text-red-400"
                  : "bg-amber-500/15 text-amber-400"
            }`}
          >
            {doctor?.status === "APPROVED" ? (
              <CheckCircle size={12} />
            ) : (
              <Clock size={12} />
            )}
            {doctor?.status}
          </span>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              user?.isBlocked || !user?.isActive
                ? "bg-red-500/15 text-red-400"
                : "bg-blue-500/15 text-blue-400"
            }`}
          >
            <span
              className={`mr-1.5 h-2 w-2 rounded-full ${
                user?.isBlocked || !user?.isActive
                  ? "bg-red-400"
                  : "bg-blue-400"
              }`}
            />
            {user?.isBlocked || !user?.isActive ? "Blocked" : "Active"}
          </span>
        </div>
      </div>

      <h3 className="text-white text-sm font-semibold">
        {doctor?.displayName}
      </h3>

      <p className="text-[#8b9ab0] text-xs mb-3">{clinic?.name ?? "--"}</p>

      <div className="space-y-1.5">
        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <MapPin size={12} className="text-[#1dc465]" />
          {isAddressComplete
            ? `${address.city ?? "-"}, ${address.state ?? "-"}, ${address.country ?? "-"}`
            : "Location not provided"}
        </p>

        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <Activity size={12} className="text-[#1dc465]" />
          {doctorClinic?.type ?? "--"}
        </p>

        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <Phone size={12} className="text-[#1dc465]" />
          {user?.phone ?? "--"}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
        <p className="text-primary text-[14px] font-bold">
          {doctorClinic?.consultationFee
            ? `₹${doctorClinic.consultationFee}`
            : "Not available"}
        </p>

        <button
          onClick={() =>
            navigate(`/admin/doctors/${doctor?.id}`, {
              state: doctorInfo,
            })
          }
          className="text-xs font-medium text-[#1dc465] hover:underline cursor-pointer"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};
