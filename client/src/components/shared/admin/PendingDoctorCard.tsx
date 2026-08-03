import type { DoctorInfo, DoctorStatusUpdateDto } from "@/types/doctor";
import {
  Activity,
  Building2,
  Check,
  Clock,
  FileText,
  MapPin,
  Phone,
  X,
} from "lucide-react";

interface PendingDoctorCardProps {
  doctorInfo: DoctorInfo;
  onApprove: (data: DoctorStatusUpdateDto) => void;
  onReject: (doctor: DoctorInfo) => void;
  setPreviewImage: (doc: string) => void;
}

export const PendingDoctorCard = ({
  doctorInfo,
  onApprove,
  onReject,
  setPreviewImage,
}: PendingDoctorCardProps) => {
  const { doctor, clinic, user, address, doctorClinic } = doctorInfo;

  const submittedDate = String(doctor.createdAt).split("T")[0];

  return (
    <div className="bg-[#0d1a27] border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          {doctor.profilePicture?.url ? (
            <img
              src={doctor.profilePicture.url}
              alt={doctor.displayName}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Building2 size={18} className="text-amber-400" />
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400">
          <Clock size={11} /> {doctor.status}
        </span>
      </div>

      <h3 className="text-white text-sm font-semibold mb-1">
        {doctor.displayName}
      </h3>

      <p className="text-[#8b9ab0] text-xs mb-3">{clinic?.name ?? "--"}</p>

      <div className="space-y-1.5 mb-4">
        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <MapPin size={12} className="text-[#1dc465]" />
          {address
            ? `${address.city} ${address.state} ${address.country}`
            : "--"}
        </p>

        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <Phone size={12} className="text-[#1dc465]" />
          {user?.phone ?? "--"}
        </p>

        <p className="flex items-center gap-2 text-[#8b9ab0] text-xs">
          <Activity size={12} className="text-[#1dc465]" />
          {doctorClinic?.type ?? "--"}
        </p>

        <div className="flex items-center gap-3 pt-0.5">
          <button
            onClick={() => setPreviewImage(doctor.registrationDoc.url)}
            className="flex items-center gap-1 text-[#1dc465] text-xs hover:underline"
          >
            <FileText size={11} />
            <span className="sm:hidden">Reg. Doc</span>
            <span className="hidden sm:inline">Registration</span>
          </button>

          <span className="text-[#8b9ab0]/40 text-xs">·</span>

          <button
            onClick={() => setPreviewImage(doctor.medicalLicenceDoc.url)}
            className="flex items-center gap-1 text-[#1dc465] text-xs hover:underline"
          >
            <FileText size={11} />
            Licence
          </button>

          <span className="text-[#8b9ab0]/40 text-xs">·</span>

          <button
            onClick={() => setPreviewImage(doctor.profilePicture.url)}
            className="flex items-center gap-1 text-[#1dc465] text-xs hover:underline"
          >
            <FileText size={11} />
            Profile
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5">
        <p className="text-[#4a5568] text-[11px] mb-3">
          Submitted: {submittedDate}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (doctor.id) {
                onApprove({
                  id: doctor.id,
                  reviewMessage:
                    "Your doctor registration has been reviewed and approved.",
                });
              }
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl cursor-pointer
                       bg-[#1dc465]/15 text-[#1dc465] text-xs font-semibold border border-[#1dc465]/25
                       hover:bg-[#1dc465] hover:text-[#080d14] transition-all duration-150"
          >
            <Check size={13} /> Approve
          </button>

          <button
            onClick={() => onReject(doctorInfo)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl cursor-pointer
                       bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20
                       hover:bg-rose-500 hover:text-white transition-all duration-150"
          >
            <X size={13} /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};
