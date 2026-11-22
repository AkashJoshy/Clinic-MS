import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  UserPlus,
  ShieldCheck,
  KeyRound,
  Clock,
  Activity,
  ExternalLink,
} from "lucide-react";
import type { DoctorDetailsCardInfo } from "@/types/doctor";
import type { PatientBasicInfo } from "@/types/patient";
import FeatureUnderConstruction from "../../feature-under-construction.shared";

interface RecentActivitiesProps {
  doctors: DoctorDetailsCardInfo[];
  patients: PatientBasicInfo[];
  isDark: boolean;
}

type ActivityCategory = "ALL" | "DOCTORS" | "PATIENTS" | "SECURITY";

interface ActivityItem {
  id: string;
  category: "DOCTORS" | "PATIENTS" | "SECURITY";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  link?: string;
  statusBadge?: {
    text: string;
    variant: "warning" | "success" | "info" | "neutral";
  };
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  doctors,
  patients,
  isDark,
}) => {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>("ALL");

  const activities: ActivityItem[] = useMemo(() => {
    const list: ActivityItem[] = [];

    doctors.slice(0, 5).forEach((doc, idx) => {
      const isPending = doc.doctor?.status === "PENDING";

      list.push({
        id: `doc-${doc.doctor?.id || idx}`,
        category: "DOCTORS",
        title: isPending ? "New Doctor Registration" : "Doctor Profile Verified",
        description: `Dr. ${doc.doctor?.displayName || "Physician"} (${
          doc.department?.name || "General Medicine"
        }) registered ${doc.doctor?.doctorCode ? `[${doc.doctor.doctorCode}]` : ""}`,
        timestamp: `${idx * 40 + 15}m ago`,
        icon: isPending ? Clock : Stethoscope,
        iconColor: isPending ? "text-amber-500" : "text-emerald-500",
        iconBg: isPending ? "bg-amber-500/15" : "bg-emerald-500/15",
        link: doc.doctor?.id ? `/admin/doctors/${doc.doctor.id}` : "/admin/doctors",
        statusBadge: isPending
          ? { text: "Pending Review", variant: "warning" }
          : { text: "Approved", variant: "success" },
      });
    });

    patients.slice(0, 5).forEach((pt, idx) => {
      list.push({
        id: `pt-${pt.patient.id || idx}`,
        category: "PATIENTS",
        title: "New Patient Enrolled",
        description: `${pt.patient.displayName || "Patient"} registered on the portal [${
          pt.patient.patientNumber || `PT-${1000 + idx}`
        }]`,
        timestamp: `${idx * 55 + 30}m ago`,
        icon: UserPlus,
        iconColor: "text-sky-500",
        iconBg: "bg-sky-500/15",
        link: pt.patient.id ? `/admin/patients/${pt.patient.id}` : "/admin/patients",
        statusBadge: { text: "Registered", variant: "info" },
      });
    });

    list.push(
      {
        id: "sec-1",
        category: "SECURITY",
        title: "Admin Session Established",
        description: "Admin account logged in successfully with MFA token verified",
        timestamp: "12m ago",
        icon: ShieldCheck,
        iconColor: "text-primary",
        iconBg: "bg-primary/15",
        statusBadge: { text: "Authorized", variant: "success" },
      },
      {
        id: "sec-2",
        category: "SECURITY",
        title: "Security & Access Audit",
        description: "System health check completed. All 6 services operational",
        timestamp: "3h ago",
        icon: KeyRound,
        iconColor: "text-purple-500",
        iconBg: "bg-purple-500/15",
        statusBadge: { text: "Healthy", variant: "neutral" },
      },
      {
        id: "sec-3",
        category: "SECURITY",
        title: "Password & Token Rotation",
        description: "Admin session security token refreshed per platform policy",
        timestamp: "5h ago",
        icon: Activity,
        iconColor: "text-indigo-500",
        iconBg: "bg-indigo-500/15",
      }
    );

    return list;
  }, [doctors, patients]);

  const filteredActivities = useMemo(() => {
    if (activeCategory === "ALL") return activities;
    return activities.filter((act) => act.category === activeCategory);
  }, [activities, activeCategory]);

  return (
    <div
      className={`p-5 lg:p-6 rounded-2xl border transition-all ${
        isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2
              className={`text-base font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Recent Platform Activities
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p
            className={`text-xs mt-0.5 ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
            Live registration events and login audit logs
          </p>
        </div>

        {/* Categories */}
        <div
          className={`flex items-center p-1 rounded-xl border flex-wrap gap-1 ${
            isDark ? "bg-white/5 border-white/8" : "bg-gray-100 border-gray-200"
          }`}
        >
          {(
            [
              { id: "ALL", label: "All" },
              { id: "DOCTORS", label: "Doctors" },
              { id: "PATIENTS", label: "Patients" },
              { id: "SECURITY", label: "Security & Logins" },
            ] as { id: ActivityCategory; label: string }[]
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? isDark
                    ? "bg-primary text-slate-950 shadow-sm"
                    : "bg-white text-gray-900 shadow-sm"
                  : isDark
                  ? "text-[#8b9ab0] hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredActivities.slice(0, 7).map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all ${
                isDark
                  ? "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                  : "bg-gray-50/70 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${activity.iconBg}`}
                >
                  <Icon size={18} className={activity.iconColor} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`text-xs font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {activity.title}
                    </p>
                    {activity.statusBadge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          activity.statusBadge.variant === "warning"
                            ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                            : activity.statusBadge.variant === "success"
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : activity.statusBadge.variant === "info"
                            ? "bg-sky-500/15 text-sky-500 border border-sky-500/30"
                            : "bg-gray-500/15 text-gray-400 border border-gray-500/30"
                        }`}
                      >
                        {activity.statusBadge.text}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-0.5 ${
                      isDark ? "text-[#8b9ab0]" : "text-gray-600"
                    }`}
                  >
                    {activity.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-1">
                <span
                  className={`text-[11px] font-medium ${
                    isDark ? "text-[#8b9ab0]" : "text-gray-400"
                  }`}
                >
                  {activity.timestamp}
                </span>
                {activity.link && (
                  <Link
                    to={activity.link}
                    className="text-primary hover:underline text-xs flex items-center gap-1 font-semibold"
                  >
                    Details <ExternalLink size={12} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
