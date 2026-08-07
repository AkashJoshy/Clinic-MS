import type { DoctorProfileCardProps } from "@/types/patient";
import { User } from "lucide-react";


export const PatientProfileCard = ({
  patient,
  isActive,
  isEmailVerified
}: DoctorProfileCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 text-center space-y-4">
      <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-[#1dc465]/10 border-2 border-[#1dc465]/35 flex items-center justify-center">
        {patient.imageUrl?.url ? (
          <img
            src={patient.imageUrl.url}
            alt={patient.displayName}
            className="w-full h-full object-cover animate-fade-in"
          />
        ) : (
          <User size={56} className="text-[#1dc465]" />
        )}
      </div>

      <div className="space-y-1">
        <h2 className="text-white text-xl font-bold tracking-tight">
          {patient.displayName}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#8b9ab0]">
            {patient.patientNumber}
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#8b9ab0] capitalize">
            {patient.relation === "Self"
              ? "Primary Patient"
              : `Relation: ${patient.relation}`}
          </span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8b9ab0]">Account Status</span>
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
              isActive
                ? "bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465]"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
            }`}
          >
            {isActive ? "Active" : "Blocked"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8b9ab0]">Email Verification</span>
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
              isEmailVerified
                ? "bg-sky-500/10 border border-sky-500/20 text-sky-400"
                : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
            }`}
          >
            {isEmailVerified ? "Verified" : "Unverified"}
          </span>
        </div>
      </div>
    </div>
  );
};
