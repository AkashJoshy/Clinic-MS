import { Award, Briefcase, FileText, ExternalLink } from "lucide-react";

import type { DoctorQualificationsCardProps } from "@/types/doctor";
import { useAuthStore } from "@/store";
import {
  getDoctorQualificationsCardTheme,
  getDocumentStatusStyles,
} from "@/helpers/admin/doctors.helper";

export const DoctorQualificationsCard = ({
  doctor,
  role,
  onViewDocument,
  formatDate,
  onDocumentAction,
}: DoctorQualificationsCardProps) => {
  const user = useAuthStore((state) => state.users[role]);
  const isDark = user?.theme === "DARK";

  const theme = getDoctorQualificationsCardTheme(isDark);

  const registrationStatus = getDocumentStatusStyles(
    doctor.registrationDoc?.status,
  );

  const medicalLicenceStatus = getDocumentStatusStyles(
    doctor.medicalLicenceDoc?.status,
  );

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 md:p-6 ${theme.card}`}>
      <h3
        className={`mb-4 flex items-center gap-2 border-b pb-3 text-base font-semibold ${theme.heading} ${theme.divider}`}
      >
        <Award size={18} className="text-primary" />
        Qualifications & Credentials
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <div>
          <p
            className={`mb-1 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
          >
            Specialization
          </p>
          <p className={`text-sm font-medium capitalize ${theme.heading}`}>
            {doctor.specialization || "N/A"}
          </p>
        </div>

        <div>
          <p
            className={`mb-1 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
          >
            Qualification
          </p>
          <p className={`text-sm font-medium ${theme.heading}`}>
            {doctor.qualification || "N/A"}
          </p>
        </div>

        <div>
          <p
            className={`mb-1 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
          >
            Experience
          </p>
          <p
            className={`flex items-center gap-1 text-sm font-medium ${theme.heading}`}
          >
            <Briefcase size={14} className="text-primary" />
            {doctor.experienceYears} Years
          </p>
        </div>

        <div>
          <p
            className={`mb-1 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
          >
            Gender
          </p>
          <p className={`text-sm font-medium capitalize ${theme.heading}`}>
            {doctor.gender?.toLowerCase() || "N/A"}
          </p>
        </div>

        <div>
          <p
            className={`mb-1 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
          >
            Registered On
          </p>
          <p className={`text-sm font-medium ${theme.heading}`}>
            {formatDate(doctor.createdAt)}
          </p>
        </div>
      </div>

      <div className={`mt-6 border-t pt-5 ${theme.divider}`}>
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
        >
          Verification Documents
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Registration Document */}
          {doctor.registrationDoc?.url && (
            <div
              className={`group rounded-xl border p-3.5 transition-all hover:border-primary/40 ${theme.document} ${theme.documentHover}`}
            >
              <button
                onClick={() => onViewDocument(doctor.registrationDoc!.url)}
                className="flex w-full min-w-0 cursor-pointer items-center justify-between text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="shrink-0 text-primary" size={20} />

                  <div className="min-w-0">
                    <p
                      className={`truncate text-xs font-semibold ${theme.heading}`}
                    >
                      Registration Certificate
                    </p>

                    <p className={`text-[10px] ${theme.muted}`}>
                      Click to view full doc
                    </p>
                  </div>
                </div>

                <ExternalLink
                  size={14}
                  className={`shrink-0 ${theme.muted} transition-colors ${theme.iconHover}`}
                />
              </button>

              {doctor.status === "PENDING" && (
                <div
                  className={`mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 ${theme.divider}`}
                >
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
                      disabled={doctor.registrationDoc.status === "APPROVED"}
                      onClick={() =>
                        onDocumentAction?.(
                          "Registration Document",
                          "VERIFY",
                          doctor.id!,
                          "DOCTOR",
                          "registrationDoc",
                          doctor.registrationDoc.url,
                        )
                      }
                      className="h-7 rounded-md border border-primary/20 bg-primary/5 px-2.5 text-[10px] font-semibold text-primary transition-all hover:border-primary/40 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {doctor.registrationDoc.status === "REJECTED"
                        ? "Re-verify"
                        : "Verify"}
                    </button>

                    <button
                      disabled={doctor.registrationDoc.status === "REJECTED"}
                      onClick={() =>
                        onDocumentAction?.(
                          "Registration Document",
                          "REJECT",
                          doctor.id!,
                          "DOCTOR",
                          "registrationDoc",
                          doctor.registrationDoc.url,
                        )
                      }
                      className="h-7 rounded-md border border-red-400/20 bg-red-400/5 px-2.5 text-[10px] font-semibold text-red-400 transition-all hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Medical Licence Document */}
          {doctor.medicalLicenceDoc?.url && (
            <div
              className={`group rounded-xl border p-3.5 transition-all hover:border-primary/40 ${theme.document} ${theme.documentHover}`}
            >
              <button
                onClick={() => onViewDocument(doctor.medicalLicenceDoc!.url)}
                className="flex w-full min-w-0 cursor-pointer items-center justify-between text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="shrink-0 text-primary" size={20} />

                  <div className="min-w-0">
                    <p
                      className={`truncate text-xs font-semibold ${theme.heading}`}
                    >
                      Medical Licence Certificate
                    </p>

                    <p className={`text-[10px] ${theme.muted}`}>
                      Click to view full doc
                    </p>
                  </div>
                </div>

                <ExternalLink
                  size={14}
                  className={`shrink-0 ${theme.muted} transition-colors ${theme.iconHover}`}
                />
              </button>

              {doctor.status === "PENDING" && (
                <div
                  className={`mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 ${theme.divider}`}
                >
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
                      disabled={doctor.medicalLicenceDoc.status === "APPROVED"}
                      onClick={() =>
                        onDocumentAction?.(
                          "Medical Licence Document",
                          "VERIFY",
                          doctor.id!,
                          "DOCTOR",
                          "medicalLicenceDoc",
                          doctor.medicalLicenceDoc.url,
                        )
                      }
                      className="h-7 rounded-md border border-primary/20 bg-primary/5 px-2.5 text-[10px] font-semibold text-primary transition-all hover:border-primary/40 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {doctor.medicalLicenceDoc.status === "REJECTED"
                        ? "Re-verify"
                        : "Verify"}
                    </button>

                    <button
                      disabled={doctor.medicalLicenceDoc.status === "REJECTED"}
                      onClick={() =>
                        onDocumentAction?.(
                          "Medical Licence Document",
                          "REJECT",
                          doctor.id!,
                          "DOCTOR",
                          "medicalLicenceDoc",
                          doctor.medicalLicenceDoc.url,
                        )
                      }
                      className="h-7 rounded-md border border-red-400/20 bg-red-400/5 px-2.5 text-[10px] font-semibold text-red-400 transition-all hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
