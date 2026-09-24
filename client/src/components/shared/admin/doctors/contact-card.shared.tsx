import { Mail, Phone, Languages, MapPin } from "lucide-react";
import type { BaseAddress } from "@/types/patient";

interface DoctorContactCardProps {
  email?: string;
  phone?: string;
  languages?: string[];
  address: BaseAddress | null;
}

export const DoctorContactCard = ({ email, phone, languages, address }: DoctorContactCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 space-y-4">
      <h3 className="text-white text-sm font-semibold border-b border-white/5 pb-2">
        Contact Channels
      </h3>
      <div className="space-y-3.5">
        <div className="flex items-start gap-3">
          <Mail size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">Email Address</p>
            <p className="text-white text-sm break-all font-medium">{email || "No Email Provided"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">Phone Number</p>
            <p className="text-white text-sm font-medium">{phone || "No Phone Provided"}</p>
          </div>
        </div>

        {languages && languages.length > 0 && (
          <div className="flex items-start gap-3">
            <Languages size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">Languages Spoken</p>
              <p className="text-white text-sm font-medium">{languages.join(", ")}</p>
            </div>
          </div>
        )}

        <div className="mt-10">
            <h4 className="text-white text-sm font-semibold border-b border-white/5 pb-1.5 mb-2 flex items-center gap-1.5">
              <MapPin size={15} className="text-[#1dc465]" />
              Doctor Location
            </h4>

            {address ? (
              <div className="space-y-3.5 text-xs leading-normal">
                <div>
                  <p className="text-[#8b9ab0] font-medium">Street Address</p>
                  <p className="text-white mt-0.5">
                    {address.addressLine
                      ? address.addressLine
                      : "Address Line not provided"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <p className="text-[#8b9ab0] font-medium">City</p>
                    <p className="text-white mt-0.5">
                      {" "}
                      {address.city ? address.city : "City not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">State / Region</p>
                    <p className="text-white mt-0.5">
                      {address.state
                        ? address.state
                        : "State/Region not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">Country</p>
                    <p className="text-white mt-0.5">
                      {address.country
                        ? address.country
                        : "Country not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b9ab0] font-medium">Pincode</p>
                    <p className="text-white font-mono mt-0.5">
                      {address.pincode
                        ? address.pincode
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
  );
};
