
import {
  Clock,
  ShieldAlert,
  ExternalLink,
  MapPin,
  Droplet,
  HeartPulse,
  User,
} from "lucide-react";
import type { PatientPersonalInformation } from "@/types/patient";
import { cn } from "@/lib/utils";

export const PersonalInformation = ({
  patient,
  address,
  isDark,
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
  };

  const calculateAge = (dobString: string) => {
    if (!dobString) return "";

    const dob = new Date(dobString);

    if (isNaN(dob.getTime())) return "";

    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);

    return `${years} years`;
  };

  const theme = {
    card: isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200",
    heading: isDark
      ? "text-white border-white/5"
      : "text-gray-900 border-gray-100",
    label: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    value: isDark ? "text-white" : "text-gray-900",
    divider: isDark ? "border-white/5" : "border-gray-100",
    empty: isDark
      ? "border-white/10 bg-white/2 text-[#8b9ab0]"
      : "border-gray-200 bg-gray-50 text-gray-500",
    emptyBadge: isDark
      ? "border-white/5 bg-white/5 text-white"
      : "border-gray-200 bg-gray-50 text-gray-700",
  };

  return (
    <div className="space-y-6 lg:col-span-8">
      <div className={cn("rounded-2xl border p-6", theme.card)}>
        <h3
          className={cn(
            "mb-4 flex items-center gap-2 border-b pb-3 text-base font-semibold",
            theme.heading,
          )}
        >
          <User size={18} className="text-primary" />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p
              className={cn(
                "mb-1 text-xs font-semibold uppercase tracking-wider",
                theme.label,
              )}
            >
              Gender
            </p>
            <p className={cn("text-sm font-medium capitalize", theme.value)}>
              {patient.gender.toLowerCase()}
            </p>
          </div>

          <div>
            <p
              className={cn(
                "mb-1 text-xs font-semibold uppercase tracking-wider",
                theme.label,
              )}
            >
              Date of Birth
            </p>
            <p className={cn("text-sm font-medium", theme.value)}>
              {formatDate(patient.dateOfBirth)}
            </p>
          </div>

          <div>
            <p
              className={cn(
                "mb-1 text-xs font-semibold uppercase tracking-wider",
                theme.label,
              )}
            >
              Age
            </p>
            <p className={cn("text-sm font-medium", theme.value)}>
              {calculateAge(patient.dateOfBirth) || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className={cn("rounded-2xl border p-6", theme.card)}>
        <h3
          className={cn(
            "mb-4 flex items-center gap-2 border-b pb-3 text-base font-semibold",
            theme.heading,
          )}
        >
          <HeartPulse size={18} className="text-primary" />
          Medical Profile
        </h3>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
              <Droplet size={18} className="text-rose-400" />
            </div>

            <div>
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider",
                  theme.label,
                )}
              >
                Blood Group
              </p>
              <p className={cn("text-base font-bold", theme.value)}>
                {patient.medicalInformation?.bloodGroup || "Not Specified"}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-2",
              theme.divider,
            )}
          >
            <div>
              <p
                className={cn(
                  "mb-2 text-xs font-semibold uppercase tracking-wider",
                  theme.label,
                )}
              >
                Allergies
              </p>

              {patient.medicalInformation?.allergies &&
              patient.medicalInformation.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {patient.medicalInformation.allergies.map(
                    (allergy, index) => (
                      <span
                        key={index}
                        className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-400"
                      >
                        {allergy}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p
                  className={cn(
                    "inline-block rounded-xl border px-3 py-2 text-sm font-medium",
                    theme.emptyBadge,
                  )}
                >
                  No Allergies Reported
                </p>
              )}
            </div>

            <div>
              <p
                className={cn(
                  "mb-2 text-xs font-semibold uppercase tracking-wider",
                  theme.label,
                )}
              >
                Chronic Conditions
              </p>

              {patient.medicalInformation?.chronicConditions &&
              patient.medicalInformation.chronicConditions.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {patient.medicalInformation.chronicConditions.map(
                    (condition, index) => (
                      <span
                        key={index}
                        className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400"
                      >
                        {condition}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p
                  className={cn(
                    "inline-block rounded-xl border px-3 py-2 text-sm font-medium",
                    theme.emptyBadge,
                  )}
                >
                  No Chronic Conditions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className={cn("rounded-2xl border p-6", theme.card)}>
          <h3
            className={cn(
              "mb-4 flex items-center gap-2 border-b pb-3 text-base font-semibold",
              theme.heading,
            )}
          >
            <MapPin size={18} className="text-primary" />
            Primary Address
          </h3>

          {address ? (
            <div className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider",
                    theme.label,
                  )}
                >
                  Street Address
                </p>
                <p className={cn("font-medium", theme.value)}>
                  {address.addressLine || "Address Line not provided"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      theme.label,
                    )}
                  >
                    City
                  </p>
                  <p className={cn("font-medium", theme.value)}>
                    {address.city || "City not provided"}
                  </p>
                </div>

                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      theme.label,
                    )}
                  >
                    State / Region
                  </p>
                  <p className={cn("font-medium", theme.value)}>
                    {address.state || "State/Region not provided"}
                  </p>
                </div>

                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      theme.label,
                    )}
                  >
                    Country
                  </p>
                  <p className={cn("font-medium", theme.value)}>
                    {address.country || "Country not provided"}
                  </p>
                </div>

                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      theme.label,
                    )}
                  >
                    Pincode
                  </p>
                  <p className={cn("font-medium", theme.value)}>
                    {address.pincode || "Pincode not provided"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center",
                theme.empty,
              )}
            >
              <MapPin size={24} className="mb-2 opacity-40" />
              <p className="text-xs font-semibold">
                No Address Details Registered
              </p>
            </div>
          )}
        </div>

        <div className={cn("rounded-2xl border p-6", theme.card)}>
          <h3
            className={cn(
              "mb-4 flex items-center gap-2 border-b pb-3 text-base font-semibold",
              theme.heading,
            )}
          >
            <ShieldAlert size={18} className="text-primary" />
            Emergency Contact
          </h3>

          {patient.emergencyContact?.name ? (
            <div className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider",
                    theme.label,
                  )}
                >
                  Contact Name
                </p>
                <p className={cn("text-base font-medium", theme.value)}>
                  {patient.emergencyContact.name}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      theme.label,
                    )}
                  >
                    Relationship
                  </p>

                  <span
                    className={cn(
                      "mt-1 inline-block rounded-lg border px-2.5 py-1.5 text-[11px] font-bold capitalize",
                      theme.emptyBadge,
                    )}
                  >
                    {patient.emergencyContact.relationship || "Guardian"}
                  </span>
                </div>

                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      theme.label,
                    )}
                  >
                    Phone Number
                  </p>

                  <a
                    href={`tel:${patient.emergencyContact.phone}`}
                    className="group mt-1 flex w-fit items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {patient.emergencyContact.phone}

                    <ExternalLink
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center",
                theme.empty,
              )}
            >
              <ShieldAlert size={24} className="mb-2 opacity-40" />
              <p className="text-xs font-semibold">
                No Emergency Contact Registered
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col items-center justify-between gap-4 rounded-2xl border p-4 text-xs sm:flex-row",
          theme.card,
          theme.label,
        )}
      >
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-primary" />
          Profile Created: {formatDate(patient.createdAt)}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-primary" />
          Last Updated: {formatDate(patient.updatedAt)}
        </span>
      </div>
    </div>
  );
};
