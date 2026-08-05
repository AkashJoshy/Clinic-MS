import React from "react";
import { Stethoscope, Star } from "lucide-react";

interface DoctorProfileCardProps {
  doctor: any;
  department: { id: string; name: string } | null;
  isBlocked: boolean;
}

export const DoctorProfileCard = ({ doctor, department, isBlocked }: DoctorProfileCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 text-center space-y-4">
      <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-[#1dc465]/10 border-2 border-[#1dc465]/35 flex items-center justify-center">
        {doctor.profilePicture?.url ? (
          <img
            src={doctor.profilePicture.url}
            alt={doctor.displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <Stethoscope size={56} className="text-[#1dc465]" />
        )}
      </div>

      <div className="space-y-1">
        <h2 className="text-white text-xl font-bold tracking-tight">
          {doctor.displayName}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#8b9ab0]">
            {doctor.doctorCode}
          </span>
          {department && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465] capitalize">
              {department.name}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-1.5 pt-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-white text-sm font-bold">{doctor.averageRating || "0.0"}</span>
          <span className="text-[#8b9ab0] text-xs">({doctor.totalReviews || 0} reviews)</span>
        </div>
      </div>

      {doctor.bio && (
        <p className="text-[#8b9ab0] text-xs leading-relaxed border-t border-white/5 pt-3">
          "{doctor.bio}"
        </p>
      )}

      <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8b9ab0]">Verification Status</span>
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
              doctor.status === "APPROVED"
                ? "bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465]"
                : doctor.status === "PENDING"
                ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
            }`}
          >
            {doctor.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8b9ab0]">Account Status</span>
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
              !isBlocked
                ? "bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465]"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
            }`}
          >
            {!isBlocked ? "Active" : "Blocked"}
          </span>
        </div>
      </div>
    </div>
  );
};
