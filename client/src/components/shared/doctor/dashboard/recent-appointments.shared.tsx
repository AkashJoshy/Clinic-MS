import React from "react";
import {
  Building2,
  CalendarDays,
  Video,
} from "lucide-react";

import type {
  AppointmentStatus,
  RecentAppointment as RecentAppointmentType,
} from "@/types/doctor-dashboard";

interface RecentAppointmentsProps {
  appointments: RecentAppointmentType[];
}

const statusStyles: Record<AppointmentStatus, string> = {
  CONFIRMED: "bg-emerald-500/10 text-emerald-400",
  COMPLETED: "bg-blue-500/10 text-blue-400",
  PENDING: "bg-amber-500/10 text-amber-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
  appointments,
}) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Recent Appointments
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Your latest patient appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
          <div className="mb-3 rounded-full bg-white/5 p-4">
            <CalendarDays className="size-6 text-slate-500" />
          </div>

          <p className="font-medium text-slate-300">
            No recent appointments
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your recent appointments will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs text-slate-500">
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
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-4 text-sm font-medium text-white">
                      {appointment.patient}
                    </td>

                    <td className="py-4 text-sm text-slate-400">
                      {appointment.date}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
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

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">
                      {appointment.patient}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {appointment.date}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
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