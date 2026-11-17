import { Mail, Phone, Languages, MapPin } from "lucide-react";
import type { BaseAddress } from "@/types/patient";
import { useAuthStore } from "@/store";
import type { RouteRoleProps } from "@/types/auth";

interface DoctorContactCardProps {
  email?: string;
  phone?: string;
  languages?: string[];
  address: BaseAddress | null;
  role: RouteRoleProps;
}

export const DoctorContactCard = ({
  email,
  phone,
  languages,
  address,
  role,
}: DoctorContactCardProps) => {
  const user = useAuthStore((state) => state.users[role]);
  const isDark = user?.theme === "DARK";

  const theme = {
    card: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    divider: isDark ? "border-white/5" : "border-gray-200",
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    breakAll = false,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    breakAll?: boolean;
  }) => (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-primary" />

      <div className="min-w-0 flex-1">
        <p
          className={`${theme.muted} text-[10px] font-semibold tracking-wider uppercase`}
        >
          {label}
        </p>

        <p
          className={`${theme.text} mt-0.5 text-sm font-medium ${
            breakAll ? "break-all" : "break-words"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  const AddressItem = ({
    label,
    value,
    mono = false,
  }: {
    label: string;
    value: string;
    mono?: boolean;
  }) => (
    <div className="min-w-0">
      <p className={`${theme.muted} text-xs font-medium`}>{label}</p>
      <p
        className={`${theme.text} mt-0.5 break-words text-xs ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );

  return (
    <div className={`space-y-4 rounded-2xl border p-6 ${theme.card}`}>
      <h3
        className={`${theme.heading} border-b pb-2 text-sm font-semibold ${theme.divider}`}
      >
        Contact Channels
      </h3>

      <div className="space-y-3.5">
        <InfoItem
          icon={Mail}
          label="Email Address"
          value={email || "No Email Provided"}
          breakAll
        />

        <InfoItem
          icon={Phone}
          label="Phone Number"
          value={phone || "No Phone Provided"}
        />

        {languages && languages.length > 0 && (
          <InfoItem
            icon={Languages}
            label="Languages Spoken"
            value={languages.join(", ")}
          />
        )}

        <div className="mt-10">
          <h4
            className={`${theme.heading} mb-2 flex items-center gap-1.5 border-b pb-1.5 text-sm font-semibold ${theme.divider}`}
          >
            <MapPin size={15} className="text-primary" />
            Doctor Location
          </h4>

          {address ? (
            <div className="space-y-3.5 text-xs leading-normal">
              <AddressItem
                label="Street Address"
                value={address.addressLine || "Address Line not provided"}
              />

              <div className="grid grid-cols-2 gap-3 pt-1">
                <AddressItem
                  label="City"
                  value={address.city || "City not provided"}
                />

                <AddressItem
                  label="State / Region"
                  value={address.state || "State/Region not provided"}
                />

                <AddressItem
                  label="Country"
                  value={address.country || "Country not provided"}
                />

                <AddressItem
                  label="Pincode"
                  value={address.pincode || "Pincode not provided"}
                  mono
                />
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center py-8 text-center ${theme.muted}`}
            >
              <MapPin size={24} className="mb-2 opacity-40" />
              <p className="text-xs">No address details registered.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
