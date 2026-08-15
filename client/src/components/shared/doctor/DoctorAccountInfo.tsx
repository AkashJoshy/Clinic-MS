import React from "react";
import { Building2, Calendar, Clock, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store";
import type { DepartmentData } from "@/types/admin";

interface DoctorAccountInfoProps {
  department: Pick<DepartmentData, "id" | "name"> | null;
}

const formatDate = (value?: string) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const daysAgo = (value?: string) => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

const DoctorAccountInfo: React.FC<DoctorAccountInfoProps> = ({
  department,
}) => {
  const doctorProfile = useAuthStore((state) => state.doctor);

  if (!doctorProfile) return <h2>Loading...</h2>;

  const lastUpdatedDate =
    new Date(doctorProfile.doctor?.updatedAt!).getTime() <
    new Date(doctorProfile.doctorClinic?.updatedAt!).getTime()
      ? doctorProfile.doctorClinic?.updatedAt
      : doctorProfile.doctor?.updatedAt!
  const lastUpdated = daysAgo(String(lastUpdatedDate));

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-[#1dc465]" />
        Account info
      </h3>

      <div className="space-y-4">
        {department ? (
          <div className="flex justify-between items-center pb-3 border-b border-white/8">
            <span className="text-[#8b9ab0] text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Department
            </span>
            <span className="text-white font-medium text-sm capitalize">
              {department?.name}
            </span>
          </div>
        ) : (
          <div>
            <h2 className="text-red-600 text-center">No Department Found!</h2>
          </div>
        )}

        <div className="flex justify-between items-center pb-3 border-b border-white/8">
          <span className="text-[#8b9ab0] text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Member since
          </span>
          <span className="text-white font-medium text-sm">
            {formatDate(String(doctorProfile.doctor?.createdAt))}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#8b9ab0] text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" /> Last updated
          </span>
          <span className="text-white font-medium text-sm">
            {lastUpdated !== null ? `${lastUpdated} days ago` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorAccountInfo;
