import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Clock3,
  Video,
  MapPin,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LegendItem } from "./legend-item.shared";

import {
  addDays,
  formatDate,
  formatTime,
  getMonday,
  isSameDay,
} from "@/helpers/session-slot.helper";

import {
  CALENDAR_STATUS_PARTS,
  STATUS_LABELS,
} from "@/constants/doctor-dashboard.constant";

import type { CalendarClinicDetails, SlotStatus } from "@/types/doctor-clinic";
import type { ServiceMode } from "@/types/common";

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
  ishandleSlotByWeek: boolean,
  onSlotClick?: (slot: CalendarSlot, date: Date) => void;
}

const DEFAULT_PATIENT_NAME = "No-Name";
const PRIMARY_COLOR = "#38A8FF";

const STATUS_ORDER: SlotStatus[] = [
  "AVAILABLE",
  "REPLACEABLE",
  "BOOKED",
  "APPROVED",
  "CANCELLED",
  "EXPIRED",
];

const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPatientName = (slot: CalendarSlot) =>
  slot.patientName?.trim() || DEFAULT_PATIENT_NAME;

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
      {/* Filters and Navigation */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-[#8b9ab0]">
            <Filter size={16} />
            <span className="text-xs font-medium">Filters</span>
          </div>

          {/* Clinic Filter */}
          <div className="relative">
            <Building2
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9ab0]"
            />

            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className="h-10 min-w-[155px] appearance-none rounded-lg border border-white/10 bg-[#0d1a27] pl-9 pr-8 text-sm text-white outline-none transition-colors hover:border-white/20 focus:border-[#38A8FF]/50"
            >
              <option value="ALL">All Clinics</option>

              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id ?? "noId"}>
                  {clinic.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as SlotStatus | "ALL")
              }
              className="h-10 min-w-[155px] appearance-none rounded-lg border border-white/10 bg-[#0d1a27] px-3 pr-8 text-sm text-white outline-none transition-colors hover:border-white/20 focus:border-[#38A8FF]/50"
            >
              <option value="ALL">All Statuses</option>

              {STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          {(selectedClinic !== "ALL" || selectedStatus !== "ALL") && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-[#38A8FF] transition-colors hover:text-[#38A8FF]/70"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Week Navigation */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Today
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goToPreviousWeek}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goToNextWeek}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Calendar Information */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-[#8b9ab0]">
          {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </span>

        <span className="text-xs text-[#66758a]">
          {filteredSlots.length} slots
        </span>
      </div>

      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/8 bg-[#0d1a27] shadow-xl shadow-black/10">
        <ScrollArea className="h-120 w-full" type="always">
          <div className="min-w-255">
            <div className="sticky top-0 z-20 grid grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b border-white/8 bg-[#0d1a27]">
              <div className="border-r border-white/8 p-4" />

              {weekDates.map((date) => {
                const today = isSameDay(date, new Date());

                return (
                  <div
                    key={date.toISOString()}
                    className={`relative border-r border-white/8 p-3 text-center last:border-r-0 transition-colors ${
                      today
                        ? "bg-primary-800/10 shadow-[inset_0_-2px_0_#38A8FF]"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-[11px] font-semibold tracking-wider ${
                        today ? "text-primary" : "text-[#8b9ab0]"
                      }`}
                    >
                      {date
                        .toLocaleDateString("en-US", {
                          weekday: "short",
                        })
                        .toUpperCase()}
                    </p>

                    <div className="mt-1 flex justify-center">
                      <span
                        className={`flex h-8 min-w-8 items-center justify-center rounded-full text-lg font-bold transition-all ${
                          today
                            ? "bg-primary text-[#071522] shadow-[0_0_14px_rgba(56,168,255,0.35)]"
                            : "text-white"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                    </div>

                    {today && (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="relative">
              {timeSlots.length === 0 ? (
                <div className="flex min-h-50 flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                    <Clock3 size={22} className="text-[#66758a]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      No slots found
                    </p>

                    <p className="mt-1 text-xs text-[#66758a]">
                      Try changing your clinic or status filters.
                    </p>
                  </div>
                </div>
              ) : (
                timeSlots.map((timeSlot) => (
                  <div
                    key={`${timeSlot.startTime}-${timeSlot.endTime}`}
                    className="grid min-h-[100px] grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b border-white/6 last:border-b-0"
                  >
                    <div className="flex items-center border-r border-white/8 px-3">
                      <div className="rounded-lg border border-white/5 bg-white/[0.025] px-2.5 py-1.5 shadow-inner shadow-black/20">
                        <p className="text-xs font-semibold text-white">
                          {formatTime(timeSlot.startTime)}
                        </p>

                        <p className="mt-0.5 text-[11px] text-[#66758a]">
                          {formatTime(timeSlot.endTime)}
                        </p>
                      </div>
                    </div>

                    {weekDates.map((date) => {
                      const daySlots = getSlotsForCell(
                        date,
                        timeSlot.startTime,
                        timeSlot.endTime,
                      );

                      return (
                        <div
                          key={`${date.toISOString()}-${timeSlot.startTime}`}
                          className={`flex min-w-0 flex-col justify-center gap-1.5 border-r border-white/8 p-2 last:border-r-0 ${
                            isSameDay(date, new Date())
                              ? "bg-primary/[0.025]"
                              : ""
                          }`}
                        >
                          {daySlots.length === 0 ? (
                            <span className="mx-auto text-xs text-white/10">
                              —
                            </span>
                          ) : (
                            daySlots.map((slot) => {
                              const parts = CALENDAR_STATUS_PARTS[slot.status];
                              const patientName = getPatientName(slot);
                              const isExpired = slot.status === "EXPIRED";

                              const clinicColor =
                                (slot.clinicId &&
                                  clinicColorMap.get(slot.clinicId)) ||
                                "#8b9ab0";

                              return (
                                <Tooltip
                                  key={
                                    slot.id ??
                                    `${slot.clinicId}-${slot.date}-${slot.startTime}`
                                  }
                                >
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      aria-label={`${patientName}, ${STATUS_LABELS[slot.status]}, ${slot.clinicName}`}
                                      onClick={() => {
                                        if (!isExpired) {
                                          onSlotClick?.(slot, date);
                                        }
                                      }}
                                      className={`
                                        relative isolate w-full min-w-0
                                        overflow-hidden rounded-lg
                                        border-y border-r border-l-[3px]
                                        px-2.5 py-2 text-left
                                        shadow-[0_2px_0_rgba(0,0,0,0.25),0_3px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]
                                        transition-all duration-200
                                        ${parts.card}
                                        ${
                                          isExpired
                                            ? "cursor-not-allowed"
                                            : onSlotClick
                                              ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_0_rgba(0,0,0,0.25),0_7px_14px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.1)] active:translate-y-0 active:shadow-[0_1px_0_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]"
                                              : "cursor-default"
                                        }
                                      `}
                                      style={{
                                        borderLeftColor: clinicColor,
                                      }}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                      />

                                      <p className="relative truncate text-xs font-bold tracking-tight">
                                        {patientName}
                                      </p>

                                      <div className="relative mt-1 flex min-w-0 items-center gap-1 opacity-80">
                                        {slot.mode === "ONLINE" ? (
                                          <Video
                                            size={11}
                                            className="shrink-0"
                                          />
                                        ) : (
                                          <MapPin
                                            size={11}
                                            className="shrink-0"
                                          />
                                        )}

                                        <span className="truncate text-[10px] font-medium">
                                          {slot.clinicName}
                                        </span>
                                      </div>
                                    </button>
                                  </TooltipTrigger>

                                  <TooltipContent
                                    side="top"
                                    className="border border-white/10 bg-[#142334] p-3 shadow-xl"
                                  >
                                    <div className="space-y-2">
                                      <div>
                                        <p className="font-semibold text-white">
                                          {patientName}
                                        </p>

                                        <p className="mt-0.5 text-xs text-[#8b9ab0]">
                                          {slot.clinicName}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-2 text-xs text-[#8b9ab0]">
                                        {slot.mode === "ONLINE" ? (
                                          <Video size={13} />
                                        ) : (
                                          <MapPin size={13} />
                                        )}

                                        {slot.mode === "ONLINE"
                                          ? "Online Consultation"
                                          : "Offline Consultation"}
                                      </div>

                                      <p className="text-xs text-[#8b9ab0]">
                                        {formatTime(slot.startTime)} –{" "}
                                        {formatTime(slot.endTime)}
                                      </p>

                                      <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${parts.badge}`}
                                      >
                                        <span
                                          className={`h-1.5 w-1.5 rounded-full ${parts.dot}`}
                                        />

                                        {STATUS_LABELS[slot.status]}
                                      </span>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              );
                            })
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>

          <ScrollBar orientation="horizontal" className="h-1.5" />
          <ScrollBar orientation="vertical" className="w-1.5" />
        </ScrollArea>
      </div>

      {/* Clinic Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: clinic.color,
              }}
            />

            <span className="text-xs text-[#8b9ab0]">{clinic.name}</span>
          </div>
        ))}
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
        {STATUS_ORDER.map((status) => (
          <LegendItem
            key={status}
            className={CALENDAR_STATUS_PARTS[status].dot}
            label={STATUS_LABELS[status]}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyScheduleCalendar;
