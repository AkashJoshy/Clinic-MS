import React from "react";
import { Building2, Calendar, Clock, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store";
import DoctorAccountInfoSkeleton from "../../skeletons/doctor-account-info.skeleton";
import { formatDate } from "@/helpers/wallet.helper";
import type { DoctorAccountInfoProps } from "@/types/common";

const daysAgo = (value?: string) => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

const DoctorAccountInfo: React.FC<DoctorAccountInfoProps> = ({
  department,
  isDark,
}) => {
  const doctorProfile = useAuthStore((state) => state.doctor);
  const { primaryColor } = useAuthStore((state) => state.platform);

  if (!doctorProfile) return <DoctorAccountInfoSkeleton />;

  const lastUpdatedDate =
    new Date(doctorProfile.doctor?.updatedAt!).getTime() <
    new Date(doctorProfile.doctorClinicDetails[0]?.updatedAt!).getTime()
      ? doctorProfile.doctorClinicDetails[0]?.updatedAt
      : doctorProfile.doctor?.updatedAt!;

  const lastUpdated = daysAgo(String(lastUpdatedDate));

  return (
    <div
      className={`rounded-2xl border p-6 shadow-lg transition-shadow duration-200 ${
        isDark
          ? "border-none bg-[#0d1a27] shadow-black/20"
          : "border-none bg-white shadow-slate-200/70"
      }`}
    >
      <h3
        className={`mb-4 flex items-center gap-2 text-base font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        <ShieldCheck className="h-5 w-5" style={{ color: primaryColor }} />
        Account info
      </h3>

      <div className="space-y-4">
        {department ? (
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <span
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-[#8b9ab0]" : "text-slate-600"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Department
            </span>
            <span
              className={`text-sm font-medium capitalize ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {department?.name}
            </span>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-red-600">No Department Found!</h2>
          </div>
        )}

        <div
          className={`flex items-center justify-between border-b pb-3 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <span
            className={`flex items-center gap-2 text-sm ${
              isDark ? "text-[#8b9ab0]" : "text-slate-600"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Member since
          </span>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {formatDate(String(doctorProfile.doctor?.createdAt))}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`flex items-center gap-2 text-sm ${
              isDark ? "text-[#8b9ab0]" : "text-slate-600"
            }`}
          >
            <Clock className="h-4 w-4" />
            Last updated
          </span>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {lastUpdated !== null ? `${lastUpdated} days ago` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorAccountInfo;
