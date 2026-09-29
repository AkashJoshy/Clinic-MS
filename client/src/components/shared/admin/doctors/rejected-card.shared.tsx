
import type { AdminDoctorInfo, DoctorDetailsCardInfo, DoctorInfo, RejectedDoctor } from "@/types/doctor";
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
  doctorInfo: DoctorDetailsCardInfo;
  setPreviewImage: (doc: string) => void;
  onReconsider?: (doctor: DoctorDetailsCardInfo) => void;
}

export const RejectedDoctorCard = ({
  doctorInfo,
  setPreviewImage,
  onReconsider,
}: RejectedDoctorCardProps) => {
  const navigate = useNavigate();

  const { doctor, user, doctorClinicDetails } = doctorInfo;

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

  const clinicDocuments = [
    {
      label: "Registration",
      key: "registrationDoc" as const,
    },
    {
      label: "Licence",
      key: "establishmentLicenceDoc" as const,
    },
  ];

  const doctorDocuments = [
    {
      label: "Registration",
      url: doctor?.registrationDoc?.url,
    },
    {
      label: "Licence",
      url: doctor?.medicalLicenceDoc?.url,
    },
  ];

  return (
    <div className="group overflow-hidden rounded-2xl border border-rose-500/20 bg-[#0d1a27] transition-all duration-200 hover:border-rose-500/40">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-rose-500/20 bg-rose-500/10">
              {doctor?.profilePicture?.url ? (
                <img
                  src={doctor.profilePicture.url}
                  alt={doctor.displayName}
                  className="h-full w-full object-cover grayscale opacity-70"
                />
              ) : (
                <UserRound size={20} className="text-rose-400" />
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

          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-rose-500/15 px-2.5 py-1 text-[11px] font-semibold text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Rejected
          </span>
        </div>
      </div>

      {/* Clinic Details */}
      <div className="px-5">
        <div className="border-t border-white/5" />

        <div className="space-y-4 py-4">
          {doctorClinicDetails.map((doctorClinicDetail) => {
            const { clinic, clinicAddress, ...doctorClinic } =
              doctorClinicDetail;

            return (
              <div
                key={doctorClinic.id}
                className="space-y-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
              >
                {/* Clinic Name */}
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-[#8b9ab0]" />

                  <p className="text-xs font-semibold text-white">
                    {clinic?.name ?? "Clinic not provided"}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/4">
                    <MapPin size={13} className="text-[#8b9ab0]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-[#607086]">
                      Location
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#c1ccd9]">
                      {clinicAddress?.city
                        ? `${clinicAddress.city}, ${
                            clinicAddress.state ?? "-"
                          }, ${clinicAddress.country ?? "-"}`
                        : "Location not provided"}
                    </p>
                  </div>
                </div>

                {/* Consultation */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/4">
                    <Activity size={13} className="text-[#8b9ab0]" />
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

                {/* Clinic Documents */}
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-wide text-[#607086]">
                    Clinic's Documents
                  </p>

                  <div className="grid grid-cols-2 gap-1.5">
                    {clinicDocuments.map(({ label, key }) => {
                      const url = clinic?.[key]?.url;

                      return (
                        <button
                          key={key}
                          disabled={!url}
                          onClick={() => url && setPreviewImage(url)}
                          className="group flex h-8 min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/3 px-2.5 text-[11px] font-medium text-[#9aa9bb] transition-all hover:border-white/20 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FileText
                            size={13}
                            strokeWidth={1.8}
                            className="shrink-0 transition-colors group-hover:text-rose-400"
                          />

                          <span className="truncate">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phone */}
      <div className="px-5 pb-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/4">
            <Phone size={13} className="text-[#8b9ab0]" />
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

      {/* Rejection Reason */}
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

            <p className="mt-0.5 wrap-break-word text-xs text-[#c1ccd9]">
              {rejectionReason}
            </p>
          </div>
        </div>
      </div>

      {/* Doctor Documents */}
      <div className="px-5 pb-4">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-[#607086]">
          Doctor's Documents
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          {doctorDocuments.map(({ label, url }) => (
            <button
              key={label}
              disabled={!url}
              onClick={() => url && setPreviewImage(url)}
              className="group flex h-8 min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/3 px-2.5 text-[11px] font-medium text-[#9aa9bb] transition-all hover:border-white/20 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-rose-400"
              />

              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 bg-black/10 px-5 py-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#607086]">
              Submitted
            </p>

            <p className="mt-0.5 text-xs text-[#8b9ab0]">{submittedDate}</p>
          </div>

          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, {
                state: doctorInfo,
              })
            }
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#c1ccd9] transition-all hover:bg-white/5 hover:text-white"
          >
            View Details
            <ArrowRight size={13} />
          </button>
        </div>

        {onReconsider && (
          <button
            onClick={() => onReconsider(doctorInfo)}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/4 py-2.5 text-xs font-semibold text-[#c1ccd9] transition-all duration-150 hover:bg-white/8 hover:text-white"
          >
            <RotateCcw size={14} />
            Reconsider Application
          </button>
        )}
      </div>
    </div>
  );
};