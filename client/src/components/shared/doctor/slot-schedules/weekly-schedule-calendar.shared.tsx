import { useMemo, useState } from "react";

import { addDays, getMonday } from "@/helpers/session-slot.helper";
import type {  SlotStatus } from "@/types/doctor-clinic";
import type { ServiceMode } from "@/types/common";

import WeeklyScheduleCalendarControls from "./weekly-schedule-calendar-controls";
import WeeklyScheduleCalendarGrid from "./weekly-schedule-calendar-grid";
import { getLocalDateString } from "@/helpers/doctor-calendar.helper";
import type { WeeklyScheduleCalendarProps } from "@/types/doctor-dashboard";
import { STATUS_ORDER } from "@/constants/doctor-dashboard.constant";

const WeeklyScheduleCalendar = ({
  slots,
  clinics,
  weekDates,
  handleSlotByWeek,
  ishandleSlotByWeek,
  isDark,
  onSlotClick,
}: WeeklyScheduleCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(() => getMonday(new Date()));

  const [selectedClinic, setSelectedClinic] = useState("ALL");

  const [selectedStatus, setSelectedStatus] = useState<SlotStatus | "ALL">(
    "ALL",
  );

  // Clinic color lookup
  const clinicColorMap = useMemo(() => {
    return new Map(clinics.map((clinic) => [clinic.id, clinic.color]));
  }, [clinics]);

  // Filter slots by clinic and status
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchesClinic =
        selectedClinic === "ALL" || slot.clinicId === selectedClinic;

      const matchesStatus =
        selectedStatus === "ALL" || slot.status === selectedStatus;

      return matchesClinic && matchesStatus;
    });
  }, [slots, selectedClinic, selectedStatus]);

  // Generate unique time rows
  const timeSlots = useMemo(() => {
    const uniqueSlots = new Set<string>();

    filteredSlots.forEach((slot) => {
      uniqueSlots.add(`${slot.startTime}-${slot.endTime}`);
    });

    return Array.from(uniqueSlots)
      .map((slot) => {
        const [startTime, endTime] = slot.split("-");

        return { startTime, endTime };
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [filteredSlots]);

  const getSlotsForCell = (date: Date, startTime: string, endTime: string) => {
    const dateString = getLocalDateString(date);

    return filteredSlots.filter(
      (slot) =>
        slot.date === dateString &&
        slot.startTime === startTime &&
        slot.endTime === endTime,
    );
  };

  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => addDays(prev, -7));

    const prevStartDate = new Date(currentWeek);
    prevStartDate.setDate(currentWeek.getDate() - 1);
    prevStartDate.setHours(0, 0, 0, 0);

    const weekStartDate = new Date(prevStartDate);
    weekStartDate.setDate(prevStartDate.getDate() - 7);
    weekStartDate.setHours(12, 0, 0, 0);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    weekEndDate.setHours(12, 0, 0, 0);

    handleSlotByWeek(weekStartDate, weekEndDate);
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => addDays(prev, 7));

    const prevStartDate = new Date(currentWeek);
    prevStartDate.setDate(currentWeek.getDate() - 1);
    prevStartDate.setHours(0, 0, 0, 0);

    const weekStartDate = new Date(prevStartDate);
    weekStartDate.setDate(prevStartDate.getDate() + 7);
    weekStartDate.setHours(12, 0, 0, 0);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    weekEndDate.setHours(12, 0, 0, 0);

    handleSlotByWeek(weekStartDate, weekEndDate);
  };

  const goToToday = () => {
    setCurrentWeek(getMonday(new Date()));
  };

  const clearFilters = () => {
    setSelectedClinic("ALL");
    setSelectedStatus("ALL");
  };

  return (
    <div className="w-full min-w-0 space-y-5">
      <WeeklyScheduleCalendarControls
        clinics={clinics}
        selectedClinic={selectedClinic}
        selectedStatus={selectedStatus}
        statusOrder={STATUS_ORDER}
        weekDates={weekDates}
        filteredSlotsCount={filteredSlots.length}
        setSelectedClinic={setSelectedClinic}
        setSelectedStatus={setSelectedStatus}
        clearFilters={clearFilters}
        goToToday={goToToday}
        goToPreviousWeek={goToPreviousWeek}
        goToNextWeek={goToNextWeek}
        isDark={isDark}
      />

      <WeeklyScheduleCalendarGrid
        slots={filteredSlots}
        clinics={clinics}
        weekDates={weekDates}
        timeSlots={timeSlots}
        statusOrder={STATUS_ORDER}
        clinicColorMap={clinicColorMap}
        getSlotsForCell={getSlotsForCell}
        onSlotClick={onSlotClick}
        isDark={isDark}
      />
    </div>
  );
};

export default WeeklyScheduleCalendar;
