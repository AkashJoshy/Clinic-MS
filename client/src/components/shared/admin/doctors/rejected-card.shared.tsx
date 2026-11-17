import type { DoctorDetailsCardInfo, RejectedDoctor } from "@/types/doctor";
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
import { useAuthStore } from "@/store";

interface RejectedDoctorCardProps {
  doctorInfo: DoctorDetailsCardInfo;
  setPreviewImage: (doc: string) => void;
  onReconsider?: (doctor: DoctorDetailsCardInfo) => void;
  isDark: boolean
}

export const RejectedDoctorCard = ({
  doctorInfo,
  setPreviewImage,
  onReconsider,
  isDark
}: RejectedDoctorCardProps) => {
  const navigate = useNavigate();

  const theme = {
    card: isDark
      ? "border-rose-500/20 bg-[#0d1a27] hover:border-rose-500/40"
      : "border-rose-200 bg-white hover:border-rose-300",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    label: isDark ? "text-[#607086]" : "text-gray-400",

    divider: isDark ? "border-white/5" : "border-gray-100",

    clinicCard: isDark
      ? "border-white/5 bg-white/[0.02]"
      : "border-gray-100 bg-gray-50",

    iconWrapper: isDark ? "bg-white/4" : "bg-gray-100",

    documentButton: isDark
      ? "border-white/10 bg-white/3 text-[#9aa9bb] hover:border-white/20 hover:bg-white/6 hover:text-white"
      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900",

    footer: isDark ? "bg-black/10" : "bg-gray-50",

    footerButton: isDark
      ? "border-white/10 text-[#c1ccd9] hover:bg-white/5 hover:text-white"
      : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900",

    reconsiderButton: isDark
      ? "border-white/10 bg-white/4 text-[#c1ccd9] hover:bg-white/8 hover:text-white"
      : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };

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
    <div
      className={`group overflow-hidden rounded-2xl border transition-all duration-200 ${theme.card}`}
    >
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

          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-rose-500/15 px-2.5 py-1 text-[11px] font-semibold text-rose-500">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Rejected
          </span>
        </div>
      </div>

      {/* Clinic Details */}
      <div className="px-5">
        <div className={`border-t ${theme.divider}`} />

        <div className="space-y-4 py-4">
          {doctorClinicDetails.map((doctorClinicDetail) => {
            const { clinic, clinicAddress, ...doctorClinic } =
              doctorClinicDetail;

            return (
              <div
                key={doctorClinic.id}
                className={`space-y-3 rounded-xl border p-3 ${theme.clinicCard}`}
              >
                {/* Clinic Name */}
                <div className="flex items-center gap-2">
                  <Building2 size={14} className={theme.muted} />

                  <p className={`text-xs font-semibold ${theme.heading}`}>
                    {clinic?.name ?? "Clinic not provided"}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconWrapper}`}
                  >
                    <MapPin size={13} className={theme.muted} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] uppercase tracking-wide ${theme.label}`}
                    >
                      Location
                    </p>

                    <p className={`mt-0.5 truncate text-xs ${theme.text}`}>
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
                  <div
                    className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconWrapper}`}
                  >
                    <Activity size={13} className={theme.muted} />
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

                {/* Clinic Documents */}
                <div>
                  <p
                    className={`mb-2 text-[10px] uppercase tracking-wide ${theme.label}`}
                  >
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
                          className={`group flex h-8 min-w-0 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${theme.documentButton}`}
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
          <div
            className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconWrapper}`}
          >
            <Phone size={13} className={theme.muted} />
          </div>

          <div className="min-w-0">
            <p className={`text-[10px] uppercase tracking-wide ${theme.label}`}>
              Phone
            </p>

            <p className={`mt-0.5 text-xs ${theme.text}`}>
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
            <p className="text-[10px] uppercase tracking-wide text-rose-500">
              Rejection Reason
            </p>

            <p className={`mt-0.5 wrap-break-word text-xs ${theme.text}`}>
              {rejectionReason}
            </p>
          </div>
        </div>
      </div>

      {/* Doctor Documents */}
      <div className="px-5 pb-4">
        <p
          className={`mb-2 text-[10px] uppercase tracking-wide ${theme.label}`}
        >
          Doctor's Documents
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          {doctorDocuments.map(({ label, url }) => (
            <button
              key={label}
              disabled={!url}
              onClick={() => url && setPreviewImage(url)}
              className={`group flex h-8 min-w-0 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${theme.documentButton}`}
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
      <div className={`border-t px-5 py-4 ${theme.divider} ${theme.footer}`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className={`text-[10px] uppercase tracking-wide ${theme.label}`}>
              Submitted
            </p>

            <p className={`mt-0.5 text-xs ${theme.muted}`}>{submittedDate}</p>
          </div>

          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, {
                state: doctorInfo,
              })
            }
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${theme.footerButton}`}
          >
            View Details
            <ArrowRight size={13} />
          </button>
        </div>

        {onReconsider && (
          <button
            onClick={() => onReconsider(doctorInfo)}
            className={`flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-all duration-150 ${theme.reconsiderButton}`}
          >
            <RotateCcw size={14} />
            Reconsider Application
          </button>
        )}
      </div>
    </div>
  );
};
