import { Stethoscope, Star, Clock, ShieldAlert, ExternalLink, MapPin, Droplet, HeartPulse, User } from "lucide-react";
import type { PatientPersonalInformation } from "@/types/patient";

export const PersonalInformation = ({
  patient,
  address
}: PatientPersonalInformation) => {
  
   const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const calculateAge = (dobString: string) => {
    if (!dobString) return "";
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return "";
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    return `${years} years`;
  };
  
  return (
    <div className="lg:col-span-8 space-y-6">
      <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
        <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
          <User size={18} className="text-[#1dc465]" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">
              Gender
            </p>
            <p className="text-white font-medium capitalize text-sm">
              {patient.gender.toLowerCase()}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">
              Date of Birth
            </p>
            <p className="text-white font-medium text-sm">
              {formatDate(patient.dateOfBirth)}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">
              Age
            </p>
            <p className="text-white font-medium text-sm">
              {calculateAge(patient.dateOfBirth) || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
        <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
          <HeartPulse size={18} className="text-[#1dc465]" />
          Medical Profile
        </h3>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
              <Droplet size={18} className="text-rose-400" />
            </div>
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                Blood Group
              </p>
              <p className="text-white font-bold text-base">
                {patient.medicalInformation?.bloodGroup || "Not Specified"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-2">
                Allergies
              </p>
              {patient.medicalInformation?.allergies &&
              patient.medicalInformation.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {patient.medicalInformation.allergies.map(
                    (allergy, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400"
                      >
                        {allergy}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-white text-sm bg-white/5 px-3 py-2 rounded-xl border border-white/5 inline-block font-medium">
                  No Allergies Reported
                </p>
              )}
            </div>

            <div>
              <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-2">
                Chronic Conditions
              </p>
              {patient.medicalInformation?.chronicConditions &&
              patient.medicalInformation.chronicConditions.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {patient.medicalInformation.chronicConditions.map(
                    (condition, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400"
                      >
                        {condition}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-white text-sm bg-white/5 px-3 py-2 rounded-xl border border-white/5 inline-block font-medium">
                  No Chronic Conditions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
          <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-[#1dc465]" />
            Primary Address
          </h3>

          {address ? (
            <div className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                  Street Address
                </p>
                <p className="text-white font-medium">{address.addressLine}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                    City
                  </p>
                  <p className="text-white font-medium">{address.city}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                    State / Region
                  </p>
                  <p className="text-white font-medium">{address.state}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                    Country
                  </p>
                  <p className="text-white font-medium">{address.country}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                    Pincode
                  </p>
                  <p className="text-white font-medium">{address.pincode}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-xl bg-white/2 text-[#8b9ab0] text-center">
              <MapPin size={24} className="opacity-40 mb-2" />
              <p className="text-xs font-semibold">
                No Address Details Registered
              </p>
            </div>
          )}
        </div>

        <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
          <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
            <ShieldAlert size={18} className="text-[#1dc465]" />
            Emergency Contact
          </h3>

          {patient.emergencyContact?.name ? (
            <div className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                  Contact Name
                </p>
                <p className="text-white font-medium text-base">
                  {patient.emergencyContact.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                    Relationship
                  </p>
                  <span className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white capitalize mt-1 inline-block">
                    {patient.emergencyContact.relationship || "Guardian"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">
                    Phone Number
                  </p>
                  <a
                    href={`tel:${patient.emergencyContact.phone}`}
                    className="text-[#1dc465] hover:text-[#159a4e] font-semibold transition-colors flex items-center gap-1 mt-1 group w-fit"
                  >
                    {patient.emergencyContact.phone}
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-xl bg-white/2 text-[#8b9ab0] text-center">
              <ShieldAlert size={24} className="opacity-40 mb-2" />
              <p className="text-xs font-semibold">
                No Emergency Contact Registered
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8b9ab0]">
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-[#1dc465]" />
          Profile Created: {formatDate(patient.createdAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-[#1dc465]" />
          Last Updated: {formatDate(patient.updatedAt)}
        </span>
      </div>
    </div>
  );
};
