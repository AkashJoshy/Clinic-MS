import type {
  DoctorCompleteInfo,
  DoctorDetailsCardInfo,
  DoctorInfo,
  DoctorStatusUpdateDto,
} from "@/types/doctor";
import {
  Activity,
  ArrowRight,
  Building2,
  Check,
  FileText,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentVerificationModal from "../../document-verification-modal.shared";

interface PendingDoctorCardProps {
  doctorInfo: DoctorDetailsCardInfo;
  onApprove: (data: DoctorStatusUpdateDto) => void;
  onReject: (doctor: DoctorDetailsCardInfo) => void;
  setPreviewImage: (doc: string) => void;
}

export const PendingDoctorCard = ({
  doctorInfo,
  onApprove,
  onReject,
  setPreviewImage,
}: PendingDoctorCardProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState<{
    name: string;
    action: "VERIFY" | "REJECT";
    id: string;
    documentRelatedTo: "CLINIC" | "DOCTOR";
  } | null>(null);

  const { doctor, department, doctorClinicDetails, user } = doctorInfo;

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
      reviewMessage:
        "Your doctor registration has been reviewed and approved.",
    });
  };

  const onUpdateDocument = () => {
    console.log("On Update Document Data:", selectedDocument);
    setSelectedDocument(null);
  };

  const isClinicDocsPending = doctorClinicDetails.some(
    ({ clinic }) =>
      clinic?.establishmentLicenceDoc.status === "PENDING" ||
      clinic?.registrationDoc.status === "PENDING"
  );

  const isDocVerifyPending =
    doctor.medicalLicenceDoc.status === "PENDING" ||
    doctor.registrationDoc.status === "PENDING" ||
    isClinicDocsPending;

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

  return (
    <div className="group overflow-hidden rounded-2xl border border-amber-500/20 bg-[#0d1a27] transition-all duration-200 hover:border-amber-500/40">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/10">
              {doctor?.profilePicture?.url ? (
                <img
                  src={doctor.profilePicture.url}
                  alt={doctor.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={20} className="text-amber-400" />
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
                        .map((dc) => dc.clinic?.name)
                        .filter(Boolean)
                        .join(", ")
                    : "Clinic not provided"}
                </p>
              </div>
            </div>
          </div>

          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Pending
          </span>
        </div>
      </div>

      {/* Clinic Details */}
      <div className="px-5">
        <div className="border-t border-white/5" />

        <div className="space-y-5 py-4">
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
                  <Building2 size={14} className="text-[#1dc465]" />

                  <p className="text-xs font-semibold text-white">
                    {clinic?.name ?? "Clinic not provided"}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
                    <MapPin size={13} className="text-[#1dc465]" />
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
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
                    <Activity size={13} className="text-[#1dc465]" />
                  </div>

                  <div>
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
                    Clinic Documents
                  </p>

                  <div className="grid grid-cols-2 gap-1.5">
                    {clinicDocuments.map(({ label, key }) => {
                      const document = clinic?.[key];

                      return (
                        <button
                          key={key}
                          disabled={!document?.url}
                          onClick={() =>
                            document?.url && setPreviewImage(document.url)
                          }
                          className="group flex h-8 min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-medium text-[#9aa9bb] transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FileText
                            size={13}
                            strokeWidth={1.8}
                            className="shrink-0 transition-colors group-hover:text-[#1dc465]"
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

      {/* Doctor Documents */}
      <div className="px-5 pb-4">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-[#607086]">
          Doctor's Documents
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          {[
            {
              label: "Registration",
              url: doctor?.registrationDoc?.url,
            },
            {
              label: "Licence",
              url: doctor?.medicalLicenceDoc?.url,
            },
          ].map(({ label, url }) => (
            <button
              key={label}
              disabled={!url}
              onClick={() => url && setPreviewImage(url)}
              className="group flex h-8 min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-medium text-[#9aa9bb] transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-[#1dc465]"
              />

              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        {isDocVerifyPending && (
          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, {
                state: doctorInfo,
              })
            }
            className="group relative mt-3 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-[#f5b942]/40 bg-gradient-to-r from-[#f5b942]/10 via-[#ffd873]/15 to-[#f5b942]/10 px-4 py-2 text-xs font-semibold text-[#f5b942] transition-all duration-300 hover:border-[#f5b942]/70 hover:text-white hover:shadow-[0_0_18px_rgba(245,185,66,0.45)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative z-10">Verify Now</span>
            <ArrowRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        )}
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

          {!isDocVerifyPending && (
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
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleApprove}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#1dc465]/25 bg-[#1dc465]/15 py-2.5 text-xs font-semibold text-[#1dc465] transition-all duration-150 hover:bg-[#1dc465] hover:text-[#080d14]"
          >
            <Check size={14} />
            Approve
          </button>

          <button
            onClick={() => onReject(doctorInfo)}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 py-2.5 text-xs font-semibold text-rose-400 transition-all duration-150 hover:bg-rose-500 hover:text-white"
          >
            <X size={14} />
            Reject
          </button>
        </div>
      </div>

      {isOpen && selectedDocument && (
        <DocumentVerificationModal
          documentName={selectedDocument.name}
          action={selectedDocument.action}
          service={onUpdateDocument}
          onClose={() => setSelectedDocument(null)}
          isLoading={false}
        />
      )}
    </div>
  );
};