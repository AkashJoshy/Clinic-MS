import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bell, ClipboardList, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DoctorPageHeader from "@/components/shared/page-header.shared";
import type {
  DashboardOverview,
  GetDoctorCalendarData,
} from "@/types/doctor-dashboard";
import {
  getCalendarSlotsByDate,
  getDashboardOverview,
} from "@/services/doctor.service";
import DoctorDashboardStats from "@/components/shared/doctor/dashboard/doctor-dashboard-stats.shared";
import WeeklyScheduleCalendar from "@/components/shared/doctor/slot-schedules/weekly-schedule-calendar.shared";
import RecentAppointments from "@/components/shared/doctor/dashboard/recent-appointments.shared";
import { useMutate } from "@/hooks/use-mutate.hook";
import {
  mapCalendarClinics,
  mapCalendarSlots,
} from "@/helpers/doctor-calendar.helper";

const DoctorDashboardPage: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardOverview | null>(null);
  const [scheduleSlot, setScheduleSlot] =
    useState<GetDoctorCalendarData | null>(null);
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardOverview();
      if (response.data) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard overview:", error);
      toast.error("Unable to load dashboard data");
    }
  };

  const fetchSlotsByweek = async (from: Date, to: Date) => {
    mutate({ from, to });
  };

  const { mutate, isPending } = useMutate(getCalendarSlotsByDate, {
    onSuccess(data) {
      const res = data.data;
      if (res) {
        console.log(`Result from the Calendar API`);
        setScheduleSlot(res);
        console.log(res.slots);
        const weekSlotKeys = Object.keys(res.slots).map((s) => new Date(s));

        setWeekDates(weekSlotKeys);
      }
    },
  });

  useEffect(() => {
    fetchDashboard();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = today.getDay();

    const from = new Date(today);
    from.setDate(today.getDate() - diff);

    const to = new Date(today);
    to.setDate(to.getDate() - diff + 7);

    fetchSlotsByweek(from, to);
  }, []);

  const calendarSlots = useMemo(
    () => mapCalendarSlots(scheduleSlot),
    [scheduleSlot],
  );

  const calendarClinics = useMemo(
    () => mapCalendarClinics(scheduleSlot),
    [scheduleSlot],
  );

  return (
    <div className="relative min-h-full space-y-6 border border-white/10 bg-white/[0.02] p-6 shadow-2xs lg:p-8">
      <DoctorPageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        description="Overview of your appointments, schedule and earnings"
      />

      {/* Dashboard Statistics */}
      <DoctorDashboardStats data={dashboard} />

      {/* Session Calendar */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Session Calendar</h2>

          <p className="mt-1 text-sm text-slate-400">
            View and manage your weekly sessions
          </p>
        </div>

        {weekDates.length > 0 && (
          <WeeklyScheduleCalendar
            slots={calendarSlots}
            clinics={calendarClinics}
            weekDates={weekDates}
            handleSlotByWeek={fetchSlotsByweek}
            ishandleSlotByWeek={isPending}
            onSlotClick={(slot, date) => {
              console.log("Selected appointment:", slot);
              console.log("Selected date:", date);
            }}
          />
        )}
      </section>

      {/* Recent Appointments */}
      <RecentAppointments appointments={dashboard?.recentAppointments ?? []} />

      {/* Quick Actions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>

          <p className="mt-1 text-sm text-slate-400">
            Quickly access your frequently used features
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/doctor/session-management"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.04]"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/10 p-3">
                <ClipboardList className="size-6 text-emerald-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Manage Sessions</h3>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your weekly schedule and slots
                </p>
              </div>
            </div>

            <ArrowRight className="size-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
          </Link>

          <Link
            to="/doctor/notifications"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.04]"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/10 p-3">
                <Bell className="size-6 text-emerald-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Notifications</h3>

                <p className="mt-1 text-sm text-slate-400">
                  Check your latest updates and alerts
                </p>
              </div>
            </div>

            <ArrowRight className="size-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboardPage;
