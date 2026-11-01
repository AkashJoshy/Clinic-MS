import React from "react";
import { Building2, Clock3, Video } from "lucide-react";
import type {
  AppointmentStatus,
  TodayAppointment,
} from "@/types/doctor-dashboard";

interface TodayScheduleProps {
  appointments: TodayAppointment[];
}

const statusStyles: Record<AppointmentStatus, string> = {
  CONFIRMED: "bg-emerald-500/10 text-emerald-400",
  COMPLETED: "bg-blue-500/10 text-blue-400",
  PENDING: "bg-amber-500/10 text-amber-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

const TodaySchedule: React.FC<TodayScheduleProps> = ({ appointments }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Today's Schedule</h2>
          <p className="mt-1 text-sm text-slate-400">
            Your appointments for today
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          {appointments.length} Appointments
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
          <div className="mb-3 rounded-full bg-white/5 p-4">
            <Clock3 className="size-6 text-slate-500" />
          </div>

          <p className="font-medium text-slate-300">
            No appointments scheduled
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your appointments for today will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  {appointment.type === "ONLINE" ? (
                    <Video className="size-5 text-emerald-400" />
                  ) : (
                    <Building2 className="size-5 text-emerald-400" />
                  )}
                </div>

                <div>
                  <p className="font-medium text-white">
                    {appointment.patient}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 className="size-3.5" />
                    <span>{appointment.time}</span>
                    <span>·</span>
                    <span>{appointment.type}</span>
                  </div>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}
              >
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodaySchedule;
