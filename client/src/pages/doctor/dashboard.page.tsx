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
import RecentAppointments from "@/components/shared/doctor/dashboard/recent-appointments.shared";
import { useMutate } from "@/hooks/use-mutate.hook";
import {
  mapCalendarClinics,
  mapCalendarSlots,
} from "@/helpers/doctor-calendar.helper";
import WeeklyScheduleCalendar from "@/components/shared/doctor/slot-schedules/weekly-schedule-calendar.shared";
import { useAuthStore } from "@/store";
import { QuickActions } from "@/components/shared/doctor/dashboard/quick-actions.shared";

const DoctorDashboardPage: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardOverview | null>(null);
  const [scheduleSlot, setScheduleSlot] =
    useState<GetDoctorCalendarData | null>(null);
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  const doctor = useAuthStore((state) => state.users.doctor);
  const isDark = doctor?.theme === "DARK";

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
        setScheduleSlot(res);

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
    to.setDate(today.getDate() - diff + 7);

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

  const headingClass = isDark ? "text-white" : "text-slate-900";

  const descriptionClass = isDark ? "text-slate-400" : "text-slate-500";

  const cardClass = isDark
    ? "border-white/10 bg-white/[0.03] hover:border-primary/30 hover:bg-primary/[0.04]"
    : "border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/[0.03]";

  const iconWrapperClass = isDark ? "bg-primary/10" : "bg-primary/10";

  const arrowClass = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <div
      className={`relative min-h-full space-y-6 border p-4 shadow-2xs sm:p-6 lg:p-8 ${
        isDark
          ? "border-white/10 bg-white/[0.02]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <DoctorPageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        description="Overview of your appointments, schedule and earnings"
        isDark={isDark}
      />

      <DoctorDashboardStats data={dashboard} isDark={isDark} />

      <section className="space-y-4">
        <div>
          <h2 className={`text-lg font-semibold ${headingClass}`}>
            Session Calendar
          </h2>

          <p className={`mt-1 text-sm ${descriptionClass}`}>
            View and manage your weekly sessions
          </p>
        </div>

        {weekDates.length > 0 && (
          <WeeklyScheduleCalendar
            isDark={isDark}
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

      <RecentAppointments
        appointments={dashboard?.recentAppointments ?? []}
        isDark={isDark}
      />

      <QuickActions isDark={isDark} />
    </div>
  );
};

export default DoctorDashboardPage;
