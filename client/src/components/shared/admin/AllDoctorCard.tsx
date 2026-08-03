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

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            doctor?.status === "APPROVED"
              ? "bg-[#1dc465]/15 text-[#1dc465]"
              : doctor?.status === "REJECTED"
              ? "bg-red-600 text-white"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {doctor?.status === "APPROVED" ? (
            <CheckCircle size={11} />
          ) : (
            <Clock size={11} />
          )}
          {doctor?.status}
        </span>
      </div>

      <h3 className="text-white text-sm font-semibold">
        {doctor?.displayName}
      </h3>

      <p className="text-[#8b9ab0] text-xs mb-3">
        {clinic?.name ?? "--"}
      </p>

      <div className="space-y-1.5">
        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <MapPin size={12} className="text-[#1dc465]" />
          {address
            ? `${address.city}, ${address.state}, ${address.country}`
            : "--"}
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
        <p className="text-[#8b9ab0] text-xs">
          {doctorClinic?.consultationFee
            ? `₹${doctorClinic.consultationFee}`
            : ""}
        </p>

        <button
          onClick={() =>
            navigate(`/admin/doctor/${doctor?.id}/details`, {
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