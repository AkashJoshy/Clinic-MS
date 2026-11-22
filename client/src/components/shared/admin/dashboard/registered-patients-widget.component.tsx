import React from "react";
import { Link } from "react-router-dom";
import { Users, ArrowUpRight, ExternalLink, ShieldAlert, CheckCircle2 } from "lucide-react";
import type { PatientBasicInfo } from "@/types/patient";

interface RegisteredPatientsWidgetProps {
  patients: PatientBasicInfo[];
  isDark: boolean;
}

export const RegisteredPatientsWidget: React.FC<RegisteredPatientsWidgetProps> = ({
  patients,
  isDark,
}) => {
  return (
    <div
      className={`p-5 lg:p-6 rounded-2xl border transition-all ${
        isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2
              className={`text-base font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Registered Patients
            </h2>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                isDark
                  ? "bg-sky-500/15 text-sky-400 border border-sky-500/25"
                  : "bg-sky-50 text-sky-700 border border-sky-200"
              }`}
            >
              {patients.length} Registered
            </span>
          </div>
          <p
            className={`text-xs mt-0.5 ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
            Recently registered patients and health profile overview
          </p>
        </div>

        <Link
          to="/admin/patients"
          className="text-primary hover:underline text-xs font-semibold flex items-center gap-1 shrink-0"
        >
          View All <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Patient List */}
      {patients.length === 0 ? (
        <div className="text-center py-10">
          <Users className="mx-auto size-10 text-gray-500 mb-2 opacity-40" />
          <p className="text-sm font-medium text-gray-400">
            No registered patients yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {patients.slice(0, 5).map((item, idx) => {
            const pt = item.patient;
            const user = item.user;
            const isBlocked = user?.isBlocked || false;

            const initials =
              pt?.displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "PT";

            return (
              <div
                key={pt?.id || idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                  isDark
                    ? "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                    : "bg-gray-50/70 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                {/* Patient Avatar and Details */}
                <div className="flex items-center gap-3">
                  {pt?.imageUrl?.url ? (
                    <img
                      src={pt.imageUrl.url}
                      alt={pt.displayName}
                      className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-500 font-bold text-xs shrink-0">
                      {initials}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {pt?.displayName || "Patient Member"}
                      </p>
                      {pt?.patientNumber && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isDark
                              ? "bg-white/5 text-[#8b9ab0]"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {pt.patientNumber}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8b9ab0]">
                      <span className="capitalize">{pt?.gender?.toLowerCase() || "Individual"}</span>
                      <span>•</span>
                      <span>{user?.email || user?.phone || "Account verified"}</span>
                    </div>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                      isBlocked
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                    }`}
                  >
                    {isBlocked ? (
                      <>
                        <ShieldAlert size={12} /> Blocked
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={12} /> Active
                      </>
                    )}
                  </span>

                  <Link
                    to={pt?.id ? `/admin/patients/${pt.id}` : "/admin/patients"}
                    className={`px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                      isDark
                        ? "border-white/10 hover:border-primary/40 hover:text-primary text-gray-300"
                        : "border-gray-300 hover:border-primary/40 hover:text-primary text-gray-700"
                    }`}
                  >
                    Details <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
