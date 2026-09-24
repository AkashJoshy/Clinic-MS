import { Award, Briefcase, FileText, ExternalLink } from "lucide-react";

import type { DoctorQualificationsCardProps } from "@/types/doctor";

export const DoctorQualificationsCard = ({
  doctor,
  onViewDocument,
  formatDate,
  onDocumentAction,
}: DoctorQualificationsCardProps) => {
  const getStatusStyles = (status?: string) => {
    if (status === "APPROVED") {
      return {
        wrapper: "border-[#1dc465]/20 bg-[#1dc465]/10 text-[#1dc465]",
        dot: "bg-[#1dc465]",
        label: "Verified",
      };
    }

    if (status === "REJECTED") {
      return {
        wrapper: "border-red-400/20 bg-red-400/10 text-red-400",
        dot: "bg-red-400",
        label: "Rejected",
      };
    }

    return {
      wrapper: "border-amber-400/20 bg-amber-400/10 text-amber-400",
      dot: "bg-amber-400",
      label: "Pending",
    };
  };

  const registrationStatus = getStatusStyles(
    doctor.registrationDoc?.status,
  );

  const medicalLicenceStatus = getStatusStyles(
    doctor.medicalLicenceDoc?.status,
  );

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1a27] p-4 sm:p-5 md:p-6">
      <h3 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 text-base font-semibold text-white">
        <Award size={18} className="text-[#1dc465]" />
        Qualifications & Credentials
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
            Specialization
          </p>
          <p className="text-sm font-medium capitalize text-white">
            {doctor.specialization || "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
            Qualification
          </p>
          <p className="text-sm font-medium text-white">
            {doctor.qualification || "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
            Experience
          </p>
          <p className="flex items-center gap-1 text-sm font-medium text-white">
            <Briefcase size={14} className="text-[#1dc465]" />
            {doctor.experienceYears} Years
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
            Gender
          </p>
          <p className="text-sm font-medium capitalize text-white">
            {doctor.gender?.toLowerCase() || "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
            Registered On
          </p>
          <p className="text-sm font-medium text-white">
            {formatDate(doctor.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/5 pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
          Verification Documents
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {doctor.registrationDoc?.url && (
            <div className="group rounded-xl border border-white/8 bg-white/[0.03] p-3.5 transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/[0.03]">
              <button
                onClick={() =>
                  onViewDocument(doctor.registrationDoc!.url)
                }
                className="flex w-full min-w-0 cursor-pointer items-center justify-between text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText
                    className="shrink-0 text-[#1dc465]"
                    size={20}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      Registration Certificate
                    </p>

                    <p className="text-[10px] text-[#8b9ab0]">
                      Click to view full doc
                    </p>
                  </div>
                </div>

                <ExternalLink
                  size={14}
                  className="shrink-0 text-[#8b9ab0] transition-colors group-hover:text-white"
                />
              </button>

              {
                doctor.status === "PENDING" && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                <span
                  className={`inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold tracking-wide ${registrationStatus.wrapper}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${registrationStatus.dot}`}
                  />

                  {registrationStatus.label}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={
                      doctor.registrationDoc.status === "APPROVED"
                    }
                    onClick={() => {
                      onDocumentAction?.("Registration Document", "VERIFY", doctor.id!, "DOCTOR", "registrationDoc", doctor.registrationDoc.url)
                    }
                    }
                    className="h-7 rounded-md border border-[#1dc465]/20 bg-[#1dc465]/5 px-2.5 text-[10px] font-semibold text-[#1dc465] transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {doctor.registrationDoc.status === "REJECTED"
                      ? "Re-verify"
                      : "Verify"}
                  </button>

                  <button
                    disabled={
                      doctor.registrationDoc.status === "REJECTED"
                    }
                    onClick={() => onDocumentAction?.("Registration Document", "REJECT", doctor.id!, "DOCTOR", "registrationDoc", doctor.registrationDoc.url)}
                    className="h-7 rounded-md border border-red-400/20 bg-red-400/5 px-2.5 text-[10px] font-semibold text-red-400 transition-all hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Reject
                  </button>
                </div>
                
              </div>

                )
              }
              
            </div>
          )}

          {/* Medical Licence */}
          {doctor.medicalLicenceDoc?.url && (
            <div className="group rounded-xl border border-white/8 bg-white/[0.03] p-3.5 transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/[0.03]">
              <button
                onClick={() =>
                  onViewDocument(doctor.medicalLicenceDoc!.url)
                }
                className="flex w-full min-w-0 cursor-pointer items-center justify-between text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText
                    className="shrink-0 text-[#1dc465]"
                    size={20}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      Medical Licence Certificate
                    </p>

                    <p className="text-[10px] text-[#8b9ab0]">
                      Click to view full doc
                    </p>
                  </div>
                </div>

                <ExternalLink
                  size={14}
                  className="shrink-0 text-[#8b9ab0] transition-colors group-hover:text-white"
                />
              </button>

                {
                  doctor.status === "PENDING" && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                <span
                  className={`inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold tracking-wide ${medicalLicenceStatus.wrapper}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${medicalLicenceStatus.dot}`}
                  />

                  {medicalLicenceStatus.label}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={
                      doctor.medicalLicenceDoc.status === "APPROVED"
                    }
                    onClick={() => onDocumentAction?.("Medical Licence Document", "VERIFY", doctor.id!, "DOCTOR", "medicalLicenceDoc", doctor.medicalLicenceDoc.url)}
                    className="h-7 rounded-md border border-[#1dc465]/20 bg-[#1dc465]/5 px-2.5 text-[10px] font-semibold text-[#1dc465] transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {doctor.medicalLicenceDoc.status === "REJECTED"
                      ? "Re-verify"
                      : "Verify"}
                  </button>

                  <button
                    disabled={
                      doctor.medicalLicenceDoc.status === "REJECTED"
                    }
                    onClick={() => onDocumentAction?.("Medical Licence Doc", "REJECT", doctor.id!, "DOCTOR", "medicalLicenceDoc", doctor.medicalLicenceDoc.url)}
                    className="h-7 rounded-md border border-red-400/20 bg-red-400/5 px-2.5 text-[10px] font-semibold text-red-400 transition-all hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Reject
                  </button>
                </div>
              </div>
                  )
                }

            </div>
          )}
        </div>
        
      </div>
      
    </div>
  );
};