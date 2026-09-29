import {
  Activity,
  Building2,
  ExternalLink,
  FileText,
  MapPin,
} from "lucide-react";
import { DoctorScheduleCard } from "./schedule-card.shared";
import type { DoctorClinicContextDto, VerifyPlainUrl } from "@/types/common";
import type { DoctorStatus } from "@/types/doctor";
import { STATUS_STYLES } from "@/data/admin.data";
import { DocumentRow } from "./document-row.shared";
import { Field } from "./field.shared";

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


export const statusStyle = (status?: DoctorStatus) => STATUS_STYLES[status ?? "PENDING"];
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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#1dc465]/10">
            <Building2 size={22} className="text-[#1dc465]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Clinic Consultation Profiles
            </h2>
            <p className="text-xs text-[#8b9ab0]">
              {doctorClinicDetails.length} registered{" "}
              {doctorClinicDetails.length === 1 ? "clinic" : "clinics"} for this
              doctor
            </p>
          </div>
        </div>
      </div>

      {!doctorClinicDetails.length && (
        <div className="rounded-2xl border border-white/8 bg-[#0d1a27] p-8 text-center">
          <Building2 size={22} className="mx-auto mb-3 text-[#8b9ab0]" />
          <h3 className="text-sm font-semibold text-white">
            No Clinics Registered
          </h3>
          <p className="mt-1 text-xs text-[#8b9ab0]">
            This doctor has not registered with any clinic yet.
          </p>
        </div>
      )}

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
          title: string,
          field: DocField,
          doc: VerifyPlainUrl
        }[]

        const s = statusStyle(clinic?.status);
        const canAct = clinic?.status === "PENDING";

        return (
          <div
            key={entry.id}
            className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d1a27]"
          >
            <div className="flex flex-col gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {clinic?.name || "Unnamed Clinic"}
                </h3>
                {clinic?.about && (
                  <p className="mt-1 max-w-2xl text-xs text-[#8b9ab0]">
                    {clinic?.about}
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

            <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-white/2 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Activity size={15} className="text-[#1dc465]" />
                  <h4 className="text-sm font-semibold text-white">
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
                  />
                  <Field label="Mode" value={entry.type || "N/A"} />
                  <Field
                    label="Slot Duration"
                    value={
                      entry.slotDuration ? `${entry.slotDuration} mins` : "N/A"
                    }
                  />
                  <Field
                    label="Status"
                    value={entry.isActive ? "Active" : "Inactive"}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/2 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin size={15} className="text-[#1dc465]" />
                  <h4 className="text-sm font-semibold text-white">
                    Clinic Location
                  </h4>
                </div>
                {address ? (
                  <div className="space-y-3">
                    <Field
                      label="Street Address"
                      value={address.addressLine || "Not provided"}
                      full
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="City"
                        value={address.city || "Not provided"}
                      />
                      <Field
                        label="State / Region"
                        value={address.state || "Not provided"}
                      />
                      <Field
                        label="Country"
                        value={address.country || "Not provided"}
                      />
                      <Field
                        label="Pincode"
                        value={address.pincode || "Not provided"}
                        mono
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#8b9ab0]">
                    No address details registered.
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-white/5 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
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
                <div className="rounded-xl border border-dashed border-white/10 py-6 text-center">
                  <FileText size={20} className="mx-auto mb-2 text-[#64748b]" />
                  <p className="text-xs text-[#8b9ab0]">
                    No verification documents available.
                  </p>
                </div>
              )}
            </div>

            <DoctorScheduleCard schedule={entry?.schedule} />
          </div>
        );
      })}
    </div>
  );
};

