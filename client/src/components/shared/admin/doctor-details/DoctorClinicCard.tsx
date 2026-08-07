import type { DoctorClinicCardProps } from "@/types/doctor";
import { Building2, Activity, MapPin } from "lucide-react";


export const DoctorClinicCard = ({ clinic, doctorClinic, address }: DoctorClinicCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 space-y-6">
      <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 flex items-center gap-2">
        <Building2 size={18} className="text-[#1dc465]" />
        Clinic Consultation Profile
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">Clinic Name</p>
            <p className="text-white font-bold text-base">{clinic?.name || "Not Specified"}</p>
            {clinic?.about && (
              <p className="text-[#8b9ab0] text-xs leading-relaxed mt-1">{clinic.about}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">Consulting Fee</p>
              <p className="text-[#1dc465] font-bold text-lg">
                {doctorClinic?.consultationFee ? `₹${doctorClinic.consultationFee}` : "₹0"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">Consultation Mode</p>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold mt-1">
                <Activity size={12} className="text-[#1dc465]" />
                {doctorClinic?.type || "N/A"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-0.5">Slot Duration</p>
              <p className="text-white text-sm font-semibold">
                {doctorClinic?.slotDuration ? `${doctorClinic.slotDuration} mins` : "N/A"}
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

            {address ? (
              <div className="space-y-3.5 text-xs leading-normal">
                <div>
                  <p className="text-[#8b9ab0] font-medium">Street Address</p>
                  <p className="text-white mt-0.5">{clinic?.clinicAddress?.addressLine || "No address line provided"}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <p className="text-[#8b9ab0] font-medium">City</p>
                    <p className="text-white mt-0.5">{clinic?.clinicAddress?.city || "--"}</p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">State / Region</p>
                    <p className="text-white mt-0.5">{clinic?.clinicAddress?.state || "--"}</p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">Country</p>
                    <p className="text-white mt-0.5">{clinic?.clinicAddress?.country || "--"}</p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">Pincode</p>
                    <p className="text-white font-mono mt-0.5">{clinic?.clinicAddress?.pincode || "--"}</p>
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
    </div>
  );
};
