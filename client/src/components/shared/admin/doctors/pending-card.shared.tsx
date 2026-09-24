import type { DoctorInfo, DoctorStatusUpdateDto } from "@/types/doctor";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    name: string;
    action: "VERIFY" | "REJECT";
    id: string;
    documentRelatedTo: "CLINIC" | "DOCTOR";
  } | null>(null);
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

  const onUpdateDocument = () => {
    console.log(`On Update Document Data: `);
    console.log(selectedDocument);
    setSelectedDocument(null);
  };

  let isDocVerifyPending =
    doctor.medicalLicenceDoc.status === "PENDING" ||
    doctor.registrationDoc.status === "PENDING" ||
    clinic.establishmentLicenceDoc.status == "PENDING" ||
    clinic.registrationDoc.status === "PENDING";

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
              className="group flex min-w-[110px] flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/[0.03] text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-[#1dc465]"
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
              className="group flex min-w-[110px] flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/[0.03] text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-[#1dc465]"
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
              className="group flex min-w-[110px] flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/[0.03] text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-[#1dc465]"
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
              className="group flex min-w-[110px] flex-1 items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-white/[0.03] text-[#9aa9bb] text-[11px] font-medium transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText
                size={13}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-[#1dc465]"
              />
              <span className="truncate">Licence</span>
            </button>
          </div>
        </div>

        {isDocVerifyPending && (
          <button
            onClick={() =>
              navigate(`/admin/doctors/${doctor?.id}`, { state: doctorInfo })
            }
            className="group mt-3 relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-[#f5b942]/40 bg-gradient-to-r from-[#f5b942]/10 via-[#ffd873]/15 to-[#f5b942]/10 px-4 py-2 text-xs font-semibold text-[#f5b942] shadow-[0_0_0_rgba(245,185,66,0)] transition-all duration-300 hover:border-[#f5b942]/70 hover:text-white hover:shadow-[0_0_18px_rgba(245,185,66,0.45)]"
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

      <div className="px-5 py-4 border-t border-white/5 bg-black/10">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#607086]">
              Submitted
            </p>

            <p className="text-xs text-[#8b9ab0] mt-0.5">{submittedDate}</p>
          </div>

          {!isDocVerifyPending && (
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
          )}
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

      {isOpen &&
        (selectedDocument ? (
          <DocumentVerificationModal
            documentName={selectedDocument.name}
            action={selectedDocument.action}
            service={onUpdateDocument}
            onClose={() => setSelectedDocument(null)}
            isLoading={false}
          />
        ) : null)}
    </div>
  );
};
