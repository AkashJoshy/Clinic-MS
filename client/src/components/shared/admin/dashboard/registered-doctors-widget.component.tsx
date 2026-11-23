import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import type { DoctorDetailsCardInfo } from "@/types/doctor";
import { getRegisteredDoctorsWidgetTheme } from "@/helpers/admin/dashboard.helper";

interface RegisteredDoctorsWidgetProps {
  doctors: DoctorDetailsCardInfo[];
  isDark: boolean;
}


export const RegisteredDoctorsWidget: React.FC<
  RegisteredDoctorsWidgetProps
> = ({ doctors, isDark }) => {
  const theme = getRegisteredDoctorsWidgetTheme(isDark);

  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");

  const filteredDoctors = doctors.filter((doc) => {
    if (filter === "PENDING") return doc.doctor?.status === "PENDING";
    if (filter === "APPROVED") return doc.doctor?.status === "APPROVED";
    return true;
  });

  return (
    <div
      className={`p-5 lg:p-6 rounded-2xl border transition-all ${theme.container}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`text-base font-bold ${theme.heading}`}>
              Registered Doctors
            </h2>

            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${theme.registeredBadge}`}
            >
              {doctors.length} Registered
            </span>
          </div>

          <p className={`text-xs mt-0.5 ${theme.description}`}>
            Review applications and status updates for medical staff
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter */}
          <div
            className={`flex items-center p-0.5 rounded-xl border text-xs ${theme.filterContainer}`}
          >
            {(["ALL", "PENDING", "APPROVED"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filter === tab
                    ? theme.filterActive
                    : theme.filterInactive
                }`}
              >
                {tab === "ALL"
                  ? "All"
                  : tab === "PENDING"
                    ? "Pending"
                    : "Active"}
              </button>
            ))}
          </div>

          <Link to="/admin/doctors" className={theme.manageLink}>
            Manage <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Doctor List */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-10">
          <Stethoscope
            className={`mx-auto size-10 mb-2 opacity-40 ${theme.emptyIcon}`}
          />
          <p className={`text-sm font-medium ${theme.emptyMessage}`}>
            No doctors found matching this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDoctors.slice(0, 5).map((item, idx) => {
            const doc = item.doctor;
            const user = item.user;
            const dept = item.department;
            const status = doc?.status || "PENDING";
            const isPending = status === "PENDING";
            const isApproved = status === "APPROVED";

            const initials =
              doc?.displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "DR";

            return (
              <div
                key={doc?.id || idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${theme.doctorCard}`}
              >
                {/* Doctor Avatar and Details */}
                <div className="flex items-center gap-3">
                  {doc?.profilePicture?.url ? (
                    <img
                      src={doc.profilePicture.url}
                      alt={doc.displayName}
                      className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-500 font-bold text-xs shrink-0">
                      {initials}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-bold ${theme.doctorName}`}>
                        Dr. {doc?.displayName || "Medical Specialist"}
                      </p>

                      {doc?.doctorCode && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${theme.doctorCode}`}
                        >
                          {doc.doctorCode}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8b9ab0]">
                      <span>{dept?.name || "General Medicine"}</span>
                      <span>•</span>
                      <span>{user?.email || "Email verified"}</span>
                    </div>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                      isPending
                        ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                        : isApproved
                          ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                          : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {isPending ? (
                      <Clock size={12} />
                    ) : isApproved ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {status}
                  </span>

                  {isPending ? (
                    <Link to="/admin/doctors" className={theme.reviewButton}>
                      <ShieldCheck size={14} /> Review
                    </Link>
                  ) : (
                    <Link
                      to={
                        doc?.id ? `/admin/doctors/${doc.id}` : "/admin/doctors"
                      }
                      className={`px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${theme.profileButton}`}
                    >
                      Profile <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};