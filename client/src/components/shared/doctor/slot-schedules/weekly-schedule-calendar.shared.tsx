import { useMemo, useState } from "react";

import { addDays, getMonday } from "@/helpers/session-slot.helper";

import type { CalendarClinicDetails, SlotStatus } from "@/types/doctor-clinic";

import type { ServiceMode } from "@/types/common";

import WeeklyScheduleCalendarControls from "./weekly-schedule-calendar-controls";
import WeeklyScheduleCalendarGrid from "./weekly-schedule-calendar-grid";
import { getLocalDateString } from "@/helpers/doctor-calendar.helper";

export interface CalendarSlot {
  id: string | null;
  doctorId: string | null;
  clinicId: string | null;
  clinicName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  mode: ServiceMode;
  patientName?: string;
}

interface WeeklyScheduleCalendarProps {
  slots: CalendarSlot[];
  clinics: CalendarClinicDetails[];
  weekDates: Date[];
  handleSlotByWeek: (from: Date, to: Date) => void;
  ishandleSlotByWeek: boolean;
  onSlotClick?: (slot: CalendarSlot, date: Date) => void;
}

const STATUS_ORDER: SlotStatus[] = [
  "AVAILABLE",
  "REPLACEABLE",
  "BOOKED",
  "APPROVED",
  "CANCELLED",
  "EXPIRED",
];

const WeeklyScheduleCalendar = ({
  slots,
  clinics,
  weekDates,
  handleSlotByWeek,
  ishandleSlotByWeek,
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

        return {
          startTime,
          endTime,
        };
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [filteredSlots]);

  // Get slots for a particular calendar cell
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

    console.log(`Current Week: `);
    console.log(currentWeek);

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
    setCurrentWeek((prev) => {
      const newPrev = new Date(prev);
      newPrev.setDate(prev.getDate());
      newPrev.setHours(0, 0, 0, 0);
      const newWeek = addDays(newPrev, 7);
      return newWeek;
    });

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
      />
    </div>
  );
};

export default WeeklyScheduleCalendar;
