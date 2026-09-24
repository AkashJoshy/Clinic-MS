import type { DoctorInfo, RejectedDoctor } from "@/types/doctor";
import {
  Activity,
  ArrowRight,
  Building2,
  FileText,
  MapPin,
  MessageSquareWarning,
  Phone,
  RotateCcw,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RejectedDoctorCardProps {
  doctorInfo: DoctorInfo;
  setPreviewImage: (doc: string) => void;
  onReconsider?: (doctor: DoctorInfo) => void;
}

export const RejectedDoctorCard = ({
  doctorInfo,
  setPreviewImage,
  onReconsider,
}: RejectedDoctorCardProps) => {
  const navigate = useNavigate();
  const { doctor, clinic, user, address, doctorClinic } = doctorInfo;

  const submittedDate = doctor?.reviewedAt
    ? new Date(doctor.reviewedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";
  const rejectionReason =
    (doctor as RejectedDoctor)?.reviewedReason ??
    (doctor as RejectedDoctor)?.reviewedMessage ??
    "No reason provided";

  return (
    <div className="group bg-[#0d1a27] border border-rose-500/20 rounded-2xl overflow-hidden hover:border-rose-500/40 transition-all duration-200">
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {doctor?.profilePicture?.url ? (
                <img
                  src={doctor.profilePicture.url}
                  alt={doctor.displayName}
                  className="w-full h-full object-cover grayscale opacity-70"
                />
              ) : (
                <UserRound size={20} className="text-rose-400" />
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

          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-rose-500/15 text-rose-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Rejected
          </span>
        </div>
      </div>

      <div className="px-5">
        <div className="border-t border-white/5" />

        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/4 flex items-center justify-center shrink-0">
              <MapPin size={13} className="text-[#8b9ab0]" />
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
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/4 flex items-center justify-center shrink-0">
              <Activity size={13} className="text-[#8b9ab0]" />
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
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/4 flex items-center justify-center shrink-0">
              <Phone size={13} className="text-[#8b9ab0]" />
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
        <div className="flex items-start gap-2.5 rounded-lg border border-rose-500/20 bg-rose-500/6 px-3 py-2.5">
          <MessageSquareWarning
            size={14}
            className="mt-0.5 shrink-0 text-rose-400"
          />

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-rose-400/80">
              Rejection Reason
            </p>
            <p className="text-xs text-[#c1ccd9] mt-0.5 wrap-break-word">
              {rejectionReason}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-4">
        <p className="text-[10px] uppercase tracking-wide text-[#607086] mb-2">
          Doctor's Documents
        </p>

        <div className="space-y-1.5">
          {/* Registration Document */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              disabled={!doctor?.registrationDoc?.url}
              onClick={() =>
                doctor?.registrationDoc?.url &&
                setPreviewImage(doctor.registrationDoc.url)
              }
              className="group flex min-w-27.5 flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/3 text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-rose-400"
              />
              <span className="truncate">Registration</span>
            </button>
          </div>

          {/* Medical Licence */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              disabled={!doctor?.medicalLicenceDoc?.url}
              onClick={() =>
                doctor?.medicalLicenceDoc?.url &&
                setPreviewImage(doctor.medicalLicenceDoc.url)
              }
              className="group flex min-w-27.5 flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/3 text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-rose-400"
              />
              <span className="truncate">Licence</span>
            </button>
          </div>

          <p className="mt-5 mb-2 text-[10px] uppercase tracking-wide text-[#607086]">
            Clinic's Documents
          </p>

          {/* Clinic Registration */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              disabled={!clinic?.registrationDoc?.url}
              onClick={() =>
                clinic?.registrationDoc?.url &&
                setPreviewImage(clinic.registrationDoc.url)
              }
              className="group flex min-w-27.5 flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/3 text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-rose-400"
              />
              <span className="truncate">Registration</span>
            </button>
          </div>

          {/* Establishment Licence */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              disabled={!clinic?.establishmentLicenceDoc?.url}
              onClick={() =>
                clinic?.establishmentLicenceDoc?.url &&
                setPreviewImage(clinic.establishmentLicenceDoc.url)
              }
              className="group flex min-w-27.5 flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/3 text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-rose-400"
              />
              <span className="truncate">Licence</span>
            </button>
          </div>
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
              navigate(`/admin/doctors/${doctor?.id}`, { state: doctorInfo })
            }
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-[#c1ccd9] text-xs font-medium hover:bg-white/5 hover:text-white transition-all cursor-pointer"
          >
            View Details
            <ArrowRight size={13} />
          </button>
        </div>

        {onReconsider && (
          <button
            onClick={() => onReconsider(doctorInfo)}
            className="flex w-full items-center justify-center gap-1.5 py-2.5 rounded-xl cursor-pointer bg-white/4 text-[#c1ccd9] text-xs font-semibold border border-white/10 hover:bg-white/8 hover:text-white transition-all duration-150"
          >
            <RotateCcw size={14} />
            Reconsider Application
          </button>
        )}
      </div>
    </div>
  );
};
