import type { DoctorInfo, DoctorStatusUpdateDto } from "@/types/doctor";
import {
  Activity,
  ArrowRight,
  Building2,
  Check,
  Clock,
  FileText,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const { doctor, clinic, user, address, doctorClinic } = doctorInfo;

  const submittedDate = doctor?.createdAt
    ? new Date(doctor.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const handleApprove = () => {
    if (!doctor?.id) return;

    onApprove({
      id: doctor.id,
      reviewMessage: "Your doctor registration has been reviewed and approved.",
    });
  };

  return (
    <div className="group bg-[#0d1a27] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-200">
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {doctor?.profilePicture?.url ? (
                <img
                  src={doctor.profilePicture.url}
                  alt={doctor.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserRound size={20} className="text-amber-400" />
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

          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-amber-500/15 text-amber-400 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Pending
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
                {address?.city
                  ? `${address.city}, ${address.state ?? "-"}, ${address.country ?? "-"}`
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

      <div className="px-5 pb-4">
        <p className="text-[10px] uppercase tracking-wide text-[#607086] mb-2">
          Documents
        </p>

        <div className="grid grid-cols-3 gap-2">
          <button
            disabled={!doctor?.registrationDoc?.url}
            onClick={() =>
              doctor?.registrationDoc?.url &&
              setPreviewImage(doctor.registrationDoc.url)
            }
            className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border border-white/8 bg-white/[0.02] text-[#8b9ab0] text-[11px] font-medium hover:border-[#1dc465]/30 hover:text-[#1dc465] hover:bg-[#1dc465]/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FileText size={12} />
            Registration
          </button>

          <button
            disabled={!doctor?.medicalLicenceDoc?.url}
            onClick={() =>
              doctor?.medicalLicenceDoc?.url &&
              setPreviewImage(doctor.medicalLicenceDoc.url)
            }
            className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border border-white/8 bg-white/[0.02] text-[#8b9ab0] text-[11px] font-medium hover:border-[#1dc465]/30 hover:text-[#1dc465] hover:bg-[#1dc465]/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FileText size={12} />
            Licence
          </button>

        </div>
      </div>

      <div className="px-5 py-4 border-t border-white/5 bg-black/10">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#607086]">
              Submitted
            </p>

            <p className="text-xs text-[#8b9ab0] mt-0.5">{submittedDate}</p>
          </div>

          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, {
                state: doctorInfo,
              })
            }
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-[#c1ccd9] text-xs font-medium hover:bg-white/5 hover:text-white transition-all cursor-pointer"
          >
            View Details
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleApprove}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl cursor-pointer bg-[#1dc465]/15 text-[#1dc465] text-xs font-semibold border border-[#1dc465]/25 hover:bg-[#1dc465] hover:text-[#080d14] transition-all duration-150"
          >
            <Check size={14} />
            Approve
          </button>

          <button
            onClick={() => onReject(doctorInfo)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl cursor-pointer bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all duration-150"
          >
            <X size={14} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
