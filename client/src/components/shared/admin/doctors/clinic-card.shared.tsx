import { useAuthStore } from "@/store";
import type { DoctorClinicCardProps } from "@/types/doctor";
import {
  Building2,
  Activity,
  MapPin,
  FileText,
  ExternalLink,
} from "lucide-react";

export const DoctorClinicCard = ({
  clinic,
  doctor,
  onViewDocument,
  doctorClinic,
  onDocumentAction,
}: DoctorClinicCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 space-y-6">
      <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 flex items-center gap-2">
        <Building2 size={18} className="text-[#1dc465]" />
        Clinic Consultation Profile
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">
              Clinic Name
            </p>
            <p className="text-white font-bold text-base">
              {clinic?.name || "Not Specified"}
            </p>
            {clinic?.about && (
              <p className="text-[#8b9ab0] text-xs leading-relaxed mt-1">
                {clinic.about}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">
                Consulting Fee
              </p>
              <p className="text-[#1dc465] font-bold text-lg">
                {doctorClinic?.consultationFee
                  ? `₹${doctorClinic.consultationFee}`
                  : "₹0"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">
                Consultation Mode
              </p>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold mt-1">
                <Activity size={12} className="text-[#1dc465]" />
                {doctorClinic?.type || "N/A"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">
                Slot Duration
              </p>
              <p className="text-white text-sm font-semibold">
                {doctorClinic?.slotDuration
                  ? `${doctorClinic.slotDuration} mins`
                  : "N/A"}
              </p>
            </div>
            {/* <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">Clinic Status</p>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md mt-1 ${
                  clinic?.status
                    ? "bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465]"
                    : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                }`}
              >
                {doctorClinic?.isActive ? "Active" : "Closed"}
              </span>
            </div> */}
          </div>
        </div>

        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-white text-sm font-semibold border-b border-white/5 pb-1.5 mb-2 flex items-center gap-1.5">
              <MapPin size={15} className="text-[#1dc465]" />
              Clinic Location
            </h4>

            {clinic.clinicAddress ? (
              <div className="space-y-3.5 text-xs leading-normal">
                <div>
                  <p className="text-[#8b9ab0] font-medium">Street Address</p>
                  <p className="text-white mt-0.5">
                    {clinic.clinicAddress.addressLine
                      ? clinic.clinicAddress.addressLine
                      : "No address line provided"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <p className="text-[#8b9ab0] font-medium">City</p>
                    <p className="text-white mt-0.5">
                      {clinic.clinicAddress.city
                        ? clinic.clinicAddress.city
                        : "City not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">State / Region</p>
                    <p className="text-white mt-0.5">
                      {clinic.clinicAddress.state
                        ? clinic.clinicAddress.state
                        : "State/Region not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">Country</p>
                    <p className="text-white mt-0.5">
                      {clinic.clinicAddress.country
                        ? clinic.clinicAddress.country
                        : "Country not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">Pincode</p>
                    <p className="text-white font-mono mt-0.5">
                      {clinic.clinicAddress.pincode
                        ? clinic.clinicAddress.pincode
                        : "Pincode not provided"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-[#8b9ab0] text-center">
                <MapPin size={24} className="opacity-40 mb-2" />
                <p className="text-xs">No address details registered.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8b9ab0]">
          Verification Documents
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {clinic.registrationDoc?.url && (
            <div className="group rounded-xl border border-white/8 bg-white/3 p-3.5 transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/5">
              <button
                onClick={() => onViewDocument(clinic.registrationDoc.url)}
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="shrink-0 text-[#1dc465]" size={20} />

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

              {doctor.status !== "SUSPENDED" &&
                doctor.status !== "REJECTED" &&
                clinic.status === "PENDING" && (
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                    <span
                      className={`inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold tracking-wide ${
                        clinic.registrationDoc.status === "APPROVED"
                          ? "border-[#1dc465]/20 bg-[#1dc465]/10 text-[#1dc465]"
                          : clinic.registrationDoc.status === "REJECTED"
                            ? "border-red-400/20 bg-red-400/10 text-red-400"
                            : "border-amber-400/20 bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${
                          clinic.registrationDoc.status === "APPROVED"
                            ? "bg-[#1dc465]"
                            : clinic.registrationDoc.status === "REJECTED"
                              ? "bg-red-400"
                              : "bg-amber-400"
                        }`}
                      />

                      {clinic.registrationDoc.status === "APPROVED"
                        ? "Verified"
                        : clinic.registrationDoc.status === "REJECTED"
                          ? "Rejected"
                          : "Pending"}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        disabled={clinic.registrationDoc.status === "APPROVED"}
                        onClick={() =>
                          onDocumentAction?.(
                            "Clinic Registration Document",
                            "VERIFY",
                            clinic.id!,
                            "CLINIC",
                            "registrationDoc",
                            clinic.registrationDoc.url,
                          )
                        }
                        className="h-7 rounded-md border border-[#1dc465]/20 bg-[#1dc465]/5 px-2.5 text-[10px] font-semibold text-[#1dc465] transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/10 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        {clinic.registrationDoc.status === "REJECTED"
                          ? "Re-verify"
                          : "Verify"}
                      </button>

                      <button
                        disabled={clinic.registrationDoc.status === "REJECTED"}
                        onClick={() =>
                          onDocumentAction?.(
                            "Clinic Registration Document",
                            "REJECT",
                            clinic.id!,
                            "CLINIC",
                            "registrationDoc",
                            clinic.registrationDoc.url,
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

          {clinic.establishmentLicenceDoc.url && (
            <div className="group rounded-xl border border-white/8 bg-white/3 p-3.5 transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/5">
              <button
                onClick={() =>
                  onViewDocument(clinic.establishmentLicenceDoc.url)
                }
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="shrink-0 text-[#1dc465]" size={20} />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      Establishment Licence Certificate
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

              {doctor.status !== "SUSPENDED" &&
                doctor.status !== "REJECTED" &&
                clinic.status === "PENDING" && (
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                    <span
                      className={`inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold tracking-wide ${
                        clinic.establishmentLicenceDoc.status === "APPROVED"
                          ? "border-[#1dc465]/20 bg-[#1dc465]/10 text-[#1dc465]"
                          : clinic.establishmentLicenceDoc.status === "REJECTED"
                            ? "border-red-400/20 bg-red-400/10 text-red-400"
                            : "border-amber-400/20 bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${
                          clinic.establishmentLicenceDoc.status === "APPROVED"
                            ? "bg-[#1dc465]"
                            : clinic.establishmentLicenceDoc.status ===
                                "REJECTED"
                              ? "bg-red-400"
                              : "bg-amber-400"
                        }`}
                      />

                      {clinic.establishmentLicenceDoc.status === "APPROVED"
                        ? "Verified"
                        : clinic.establishmentLicenceDoc.status === "REJECTED"
                          ? "Rejected"
                          : "Pending"}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        disabled={
                          clinic.establishmentLicenceDoc.status === "APPROVED"
                        }
                        onClick={() =>
                          onDocumentAction?.(
                            "Establishment Licence",
                            "VERIFY",
                            clinic.id!,
                            "CLINIC",
                            "establishmentLicenceDoc",
                            clinic.establishmentLicenceDoc.url,
                          )
                        }
                        className="h-7 rounded-md border border-[#1dc465]/20 bg-[#1dc465]/5 px-2.5 text-[10px] font-semibold text-[#1dc465] transition-all hover:border-[#1dc465]/40 hover:bg-[#1dc465]/10 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        {clinic.establishmentLicenceDoc.status === "REJECTED"
                          ? "Re-verify"
                          : "Verify"}
                      </button>

                      <button
                        disabled={
                          clinic.establishmentLicenceDoc.status === "REJECTED"
                        }
                        onClick={() =>
                          onDocumentAction?.(
                            "Establishment Licence",
                            "REJECT",
                            clinic.id!,
                            "CLINIC",
                            "establishmentLicenceDoc",
                            clinic.establishmentLicenceDoc.url,
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
