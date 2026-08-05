import React from "react";
import { Award, Briefcase, FileText, ExternalLink } from "lucide-react";

interface DoctorQualificationsCardProps {
  doctor: any;
  onViewDocument: (url: string) => void;
  formatDate: (date: any) => string;
}

export const DoctorQualificationsCard = ({
  doctor,
  onViewDocument,
  formatDate,
}: DoctorQualificationsCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
        <Award size={18} className="text-[#1dc465]" />
        Qualifications & Credentials
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Specialization</p>
          <p className="text-white font-medium text-sm capitalize">{doctor.specialization || "N/A"}</p>
        </div>

        <div>
          <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Qualification</p>
          <p className="text-white font-medium text-sm">{doctor.qualification || "N/A"}</p>
        </div>

        <div>
          <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Experience</p>
          <p className="text-white font-medium text-sm flex items-center gap-1">
            <Briefcase size={14} className="text-[#1dc465]" />
            {doctor.experienceYears} Years
          </p>
        </div>


        <div>
          <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Gender</p>
          <p className="text-white font-medium text-sm capitalize">{doctor.gender?.toLowerCase() || "N/A"}</p>
        </div>

        <div>
          <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Registered On</p>
          <p className="text-white font-medium text-sm">{formatDate(doctor.createdAt)}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/5 pt-5">
        <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-3">Verification Documents</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {doctor.registrationDoc?.url && (
            <button
              onClick={() => onViewDocument(doctor.registrationDoc.url)}
              className="flex items-center justify-between p-3.5 bg-white/3 border border-white/8 rounded-xl hover:border-[#1dc465]/40 hover:bg-[#1dc465]/5 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="text-[#1dc465] shrink-0" size={20} />
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">Registration Certificate</p>
                  <p className="text-[#8b9ab0] text-[10px]">Click to view full doc</p>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#8b9ab0] group-hover:text-white shrink-0" />
            </button>
          )}

          {doctor.medicalLicenceDoc?.url && (
            <button
              onClick={() => onViewDocument(doctor.medicalLicenceDoc.url)}
              className="flex items-center justify-between p-3.5 bg-white/3 border border-white/8 rounded-xl hover:border-[#1dc465]/40 hover:bg-[#1dc465]/5 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="text-[#1dc465] shrink-0" size={20} />
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">Medical Licence Certificate</p>
                  <p className="text-[#8b9ab0] text-[10px]">Click to view full doc</p>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#8b9ab0] group-hover:text-white shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
