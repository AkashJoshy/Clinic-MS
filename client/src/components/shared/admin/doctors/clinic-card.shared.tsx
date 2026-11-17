
import { Activity, Building2, FileText, MapPin } from "lucide-react";

import { DoctorScheduleCard } from "./schedule-card.shared";
import { DocumentRow } from "./document-row.shared";
import { Field } from "./field.shared";

import type { DoctorClinicContextDto, VerifyPlainUrl } from "@/types/common";
import type { DoctorStatus } from "@/types/doctor";

import { STATUS_STYLES } from "@/data/admin.data";
import { useAuthStore } from "@/store";

type DocField = "registrationDoc" | "establishmentLicenceDoc";

export interface DoctorClinicCardProps {
  doctorClinicDetails: DoctorClinicContextDto[];
  onViewDocument: (url: string) => void;
  onDocumentAction?: (
    name: string,
    action: "VERIFY" | "REJECT",
    id: string,
    documentRelatedTo: "CLINIC",
    documentField: DocField,
    url: string,
  ) => void;
}

export const statusStyle = (status?: DoctorStatus) =>
  STATUS_STYLES[status ?? "PENDING"];

export const statusLabel = (status?: DoctorStatus) =>
  status === "APPROVED"
    ? "Verified"
    : status === "REJECTED"
      ? "Rejected"
      : "Pending";

export const DoctorClinicCard = ({
  doctorClinicDetails,
  onViewDocument,
  onDocumentAction,
}: DoctorClinicCardProps) => {
  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const theme = {
    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    headerDivider: isDark ? "border-white/10" : "border-gray-200",
    divider: isDark ? "border-white/5" : "border-gray-200",

    card: isDark
      ? "border-white/8 bg-[#0d1a27]"
      : "border-gray-200 bg-white shadow-sm",

    innerCard: isDark
      ? "border-white/5 bg-white/[0.02]"
      : "border-gray-200 bg-gray-50",

    emptyCard: isDark
      ? "border-white/8 bg-[#0d1a27]"
      : "border-gray-200 bg-white",

    dashedCard: isDark ? "border-white/10" : "border-gray-300",

    emptyIcon: isDark ? "text-[#64748b]" : "text-gray-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b pb-4 ${theme.headerDivider}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
            <Building2 size={22} className="text-primary" />
          </div>

          <div>
            <h2 className={`text-xl font-bold ${theme.heading}`}>
              Clinic Consultation Profiles
            </h2>

            <p className={`text-xs ${theme.muted}`}>
              {doctorClinicDetails.length} registered{" "}
              {doctorClinicDetails.length === 1 ? "clinic" : "clinics"} for this
              doctor
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!doctorClinicDetails.length && (
        <div
          className={`rounded-2xl border p-8 text-center ${theme.emptyCard}`}
        >
          <Building2 size={22} className={`mx-auto mb-3 ${theme.muted}`} />

          <h3 className={`text-sm font-semibold ${theme.heading}`}>
            No Clinics Registered
          </h3>

          <p className={`mt-1 text-xs ${theme.muted}`}>
            This doctor has not registered with any clinic yet.
          </p>
        </div>
      )}

      {/* Clinic Profiles */}
      {doctorClinicDetails.map((entry) => {
        const { clinic, clinicAddress: address } = entry;

        const docs = [
          clinic?.registrationDoc?.url && {
            title: "Registration Certificate",
            field: "registrationDoc" as const,
            doc: clinic.registrationDoc,
          },
          clinic?.establishmentLicenceDoc?.url && {
            title: "Establishment Licence",
            field: "establishmentLicenceDoc" as const,
            doc: clinic.establishmentLicenceDoc,
          },
        ].filter(Boolean) as {
          title: string;
          field: DocField;
          doc: VerifyPlainUrl;
        }[];

        const s = statusStyle(clinic?.status);
        const canAct = clinic?.status === "PENDING";

        return (
          <div
            key={entry.id}
            className={`overflow-hidden rounded-2xl border ${theme.card}`}
          >
            {/* Clinic Header */}
            <div
              className={`flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-start sm:justify-between ${theme.divider}`}
            >
              <div>
                <h3 className={`text-base font-bold ${theme.heading}`}>
                  {clinic?.name || "Unnamed Clinic"}
                </h3>

                {clinic?.about && (
                  <p className={`mt-1 max-w-2xl text-xs ${theme.muted}`}>
                    {clinic.about}
                  </p>
                )}
              </div>

              {clinic?.status && (
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${s.badge}`}
                >
                  <span className={`size-1.5 rounded-full ${s.dot}`} />
                  {clinic.status}
                </span>
              )}
            </div>

            {/* Clinic Information */}
            <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">
              {/* Consultation Details */}
              <div className={`rounded-xl border p-4 ${theme.innerCard}`}>
                <div className="mb-3 flex items-center gap-2">
                  <Activity size={15} className="text-primary" />

                  <h4 className={`text-sm font-semibold ${theme.heading}`}>
                    Consultation Details
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Consultation Fee"
                    value={
                      entry.consultationFee !== undefined
                        ? `₹${entry.consultationFee}`
                        : "₹0"
                    }
                    highlight
                    isDark={isDark}
                  />

                  <Field
                    label="Mode"
                    value={entry.type || "N/A"}
                    isDark={isDark}
                  />

                  <Field
                    label="Slot Duration"
                    value={
                      entry.slotRules?.sessionDuration
                        ? `${entry.slotRules.sessionDuration} mins`
                        : "N/A"
                    }
                    isDark={isDark}
                  />

                  <Field
                    label="Status"
                    value={entry.isActive ? "Active" : "Inactive"}
                    isDark={isDark}
                  />
                </div>
              </div>

              {/* Clinic Location */}
              <div className={`rounded-xl border p-4 ${theme.innerCard}`}>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin size={15} className="text-primary" />

                  <h4 className={`text-sm font-semibold ${theme.heading}`}>
                    Clinic Location
                  </h4>
                </div>

                {address ? (
                  <div className="space-y-3">
                    <Field
                      label="Street Address"
                      value={address.addressLine || "Not provided"}
                      full
                      isDark={isDark}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="City"
                        value={address.city || "Not provided"}
                        isDark={isDark}
                      />

                      <Field
                        label="State / Region"
                        value={address.state || "Not provided"}
                        isDark={isDark}
                      />

                      <Field
                        label="Country"
                        value={address.country || "Not provided"}
                        isDark={isDark}
                      />

                      <Field
                        label="Pincode"
                        value={address.pincode || "Not provided"}
                        mono
                        isDark={isDark}
                      />
                    </div>
                  </div>
                ) : (
                  <p className={`text-xs ${theme.muted}`}>
                    No address details registered.
                  </p>
                )}
              </div>
            </div>

            {/* Verification Documents */}
            <div className={`border-t p-5 ${theme.divider}`}>
              <p
                className={`mb-3 text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
              >
                Verification Documents
              </p>

              {docs.length ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {docs.map(({ title, field, doc }) => (
                    <DocumentRow
                      key={field}
                      title={title}
                      doc={doc}
                      canAct={canAct}
                      isDark={isDark}
                      onView={() => onViewDocument(doc.url)}
                      onAction={
                        onDocumentAction
                          ? (action) =>
                              onDocumentAction(
                                title,
                                action,
                                clinic?.id!,
                                "CLINIC",
                                field,
                                doc.url,
                              )
                          : undefined
                      }
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={`rounded-xl border border-dashed py-6 text-center ${theme.dashedCard}`}
                >
                  <FileText
                    size={20}
                    className={`mx-auto mb-2 ${theme.emptyIcon}`}
                  />

                  <p className={`text-xs ${theme.muted}`}>
                    No verification documents available.
                  </p>
                </div>
              )}
            </div>

            <DoctorScheduleCard
              schedule={entry?.weeklySchedule}
              isDark={isDark}
            />
          </div>
        );
      })}
    </div>
  );
};
