import React from "react";
import { Building2, CalendarDays, Video } from "lucide-react";
import type { RecentAppointmentsProps } from "@/types/doctor-dashboard";
import { statusStyles } from "@/constants/doctor-dashboard.constant";

const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
  appointments,
  isDark,
}) => {
  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";
  const primaryTextClass = isDark ? "text-white" : "text-slate-900";

  return (
    <section
      className={`rounded-2xl border p-5 ${
        isDark
          ? "border-white/10 bg-white/3"
          : "border-slate-200 bg-white shadow-sm"
      }`}
    >
      <div className="mb-5">
        <h2 className={`text-lg font-semibold ${primaryTextClass}`}>
          Recent Appointments
        </h2>

        <p className={`mt-1 text-sm ${mutedTextClass}`}>
          Your latest patient appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="flex min-h-45 flex-col items-center justify-center text-center">
          <div
            className={`mb-3 rounded-full p-4 ${
              isDark ? "bg-white/5" : "bg-slate-100"
            }`}
          >
            <CalendarDays
              className={`size-6 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            />
          </div>

          <p
            className={`font-medium ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            No recent appointments
          </p>

          <p className={`mt-1 text-sm ${mutedTextClass}`}>
            Your recent appointments will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr
                  className={`border-b text-xs ${
                    isDark
                      ? "border-white/10 text-slate-500"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className={`border-b last:border-0 ${
                      isDark ? "border-white/5" : "border-slate-100"
                    }`}
                  >
                    <td
                      className={`py-4 text-sm font-medium ${primaryTextClass}`}
                    >
                      {appointment.patient}
                    </td>

                    <td className={`py-4 text-sm ${mutedTextClass}`}>
                      {appointment.date}
                    </td>

                    <td className="py-4">
                      <div
                        className={`flex items-center gap-2 text-sm ${mutedTextClass}`}
                      >
                        {appointment.type === "ONLINE" ? (
                          <Video className="size-4" />
                        ) : (
                          <Building2 className="size-4" />
                        )}

                        {appointment.type}
                      </div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`rounded-xl border p-4 ${
                  isDark
                    ? "border-white/10 bg-white/2"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`font-medium ${primaryTextClass}`}>
                      {appointment.patient}
                    </p>

                    <p className={`mt-1 text-xs ${mutedTextClass}`}>
                      {appointment.date}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div
                  className={`mt-3 flex items-center gap-2 text-xs ${mutedTextClass}`}
                >
                  {appointment.type === "ONLINE" ? (
                    <Video className="size-4" />
                  ) : (
                    <Building2 className="size-4" />
                  )}

                  {appointment.type}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default RecentAppointments;
