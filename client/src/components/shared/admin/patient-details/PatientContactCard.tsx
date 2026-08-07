import { Mail, Phone, Calendar } from "lucide-react";

interface DoctorContactCardProps {
  email?: string;
  phone?: string;
  createdAt?: Date;
}

export const PatientContactCard = ({
  email,
  phone,
  createdAt,
}: DoctorContactCardProps) => {
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

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 space-y-4">
      <h3 className="text-white text-sm font-semibold border-b border-white/5 pb-2">
        Quick Contacts
      </h3>

      <div className="space-y-3.5">
        <div className="flex items-start gap-3">
          <Mail size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">
              Email Address
            </p>
            <p className="text-white text-sm break-all font-medium">
              {email || "No Email Provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">
              Phone Number
            </p>
            <p className="text-white text-sm font-medium">
              {phone || "No Phone Provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">
              Joined Date
            </p>
            <p className="text-white text-sm font-medium">
              {formatDate(String(createdAt))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
