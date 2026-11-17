import React from "react";
import { Building2, Calendar, Clock, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store";
import type { DepartmentData } from "@/types/admin";
import DoctorAccountInfoSkeleton from "../../skeletons/doctor-account-info.skeleton";

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
  const { primaryColor } = useAuthStore((state) => state.platform);

  if (!doctorProfile) return <DoctorAccountInfoSkeleton />;

  const lastUpdatedDate =
    new Date(doctorProfile.doctor?.updatedAt!).getTime() <
    new Date(doctorProfile.doctorClinic?.updatedAt!).getTime()
      ? doctorProfile.doctorClinic?.updatedAt
      : doctorProfile.doctor?.updatedAt!;

  const lastUpdated = daysAgo(String(lastUpdatedDate));

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1a27] p-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
        <ShieldCheck className="h-5 w-5" style={{ color: primaryColor }} />
        Account info
      </h3>

      <div className="space-y-4">
        {department ? (
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <span className="flex items-center gap-2 text-sm text-[#8b9ab0]">
              <Building2 className="h-4 w-4" />
              Department
            </span>
            <span className="text-sm font-medium capitalize text-white">
              {department?.name}
            </span>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-red-600">No Department Found!</h2>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <span className="flex items-center gap-2 text-sm text-[#8b9ab0]">
            <Calendar className="h-4 w-4" />
            Member since
          </span>
          <span className="text-sm font-medium text-white">
            {formatDate(String(doctorProfile.doctor?.createdAt))}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-[#8b9ab0]">
            <Clock className="h-4 w-4" />
            Last updated
          </span>
          <span className="text-sm font-medium text-white">
            {lastUpdated !== null ? `${lastUpdated} days ago` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorAccountInfo;
