import { Clock3, Video, MapPin } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LegendItem } from "./legend-item.shared";

import { formatTime, isSameDay } from "@/helpers/session-slot.helper";

import {
  CALENDAR_STATUS_PARTS,
  STATUS_LABELS,
} from "@/constants/doctor-dashboard.constant";

import type { SlotStatus } from "@/types/doctor-clinic";
import type { ServiceMode } from "@/types/common";
import type {
  CalendarSlot,
  WeeklyScheduleCalendarGridProps,
} from "@/types/doctor-dashboard";

const DEFAULT_PATIENT_NAME = "No-Name";

const getPatientName = (slot: CalendarSlot) =>
  slot.patientName?.trim() || DEFAULT_PATIENT_NAME;

const WeeklyScheduleCalendarGrid = ({
  clinics,
  weekDates,
  timeSlots,
  statusOrder,
  clinicColorMap,
  getSlotsForCell,
  onSlotClick,
  isDark,
}: WeeklyScheduleCalendarGridProps) => {
  const borderClass = isDark ? "border-white/8" : "border-slate-200";
  const mutedTextClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";
  const primaryTextClass = isDark ? "text-white" : "text-slate-800";

  return (
    <>
      {/* Calendar Grid */}
      <div
        className={`w-full min-w-0 overflow-hidden rounded-2xl border shadow-xl shadow-black/10 ${
          isDark ? "border-white/8 bg-[#0d1a27]" : "border-slate-200 bg-white"
        }`}
      >
        <ScrollArea className="h-120 w-full" type="always">
          <div className="min-w-255">
            {/* Week Header */}
            <div
              className={`sticky top-0 z-20 grid grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b ${borderClass} ${
                isDark ? "bg-[#0d1a27]" : "bg-white"
              }`}
            >
              <div className={`border-r ${borderClass} p-4`} />

              {weekDates.map((date) => {
                const today = isSameDay(date, new Date());

                return (
                  <div
                    key={date.toISOString()}
                    className={`relative border-r ${borderClass} p-3 text-center transition-colors last:border-r-0 ${
                      today
                        ? "bg-primary/10 shadow-[inset_0_-2px_0_var(--primary)]"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-[11px] font-semibold tracking-wider ${
                        today ? "text-primary" : mutedTextClass
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
                            ? "bg-primary text-primary-foreground shadow-[0_0_14px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
                            : primaryTextClass
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

            {/* Time Slots */}
            <div className="relative">
              {timeSlots.length === 0 ? (
                <div className="flex min-h-50 flex-col items-center justify-center gap-3 text-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      isDark ? "bg-white/5" : "bg-slate-100"
                    }`}
                  >
                    <Clock3
                      size={22}
                      className={isDark ? "text-[#66758a]" : "text-slate-400"}
                    />
                  </div>

                  <div>
                    <p className={`text-sm font-medium ${primaryTextClass}`}>
                      No slots found
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        isDark ? "text-[#66758a]" : "text-slate-500"
                      }`}
                    >
                      Try changing your clinic or status filters.
                    </p>
                  </div>
                </div>
              ) : (
                timeSlots.map((timeSlot) => (
                  <div
                    key={`${timeSlot.startTime}-${timeSlot.endTime}`}
                    className={`grid min-h-[100px] grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b last:border-b-0 ${
                      isDark ? "border-white/6" : "border-slate-200"
                    }`}
                  >
                    {/* Time Column */}
                    <div
                      className={`flex items-center border-r ${borderClass} px-3`}
                    >
                      <div
                        className={`rounded-lg border px-2.5 py-1.5 shadow-inner ${
                          isDark
                            ? "border-white/5 bg-white/[0.025] shadow-black/20"
                            : "border-slate-200 bg-slate-50 shadow-slate-200/50"
                        }`}
                      >
                        <p
                          className={`text-xs font-semibold ${primaryTextClass}`}
                        >
                          {formatTime(timeSlot.startTime)}
                        </p>

                        <p
                          className={`mt-0.5 text-[11px] ${
                            isDark ? "text-[#66758a]" : "text-slate-400"
                          }`}
                        >
                          {formatTime(timeSlot.endTime)}
                        </p>
                      </div>
                    </div>

                    {/* Day Columns */}
                    {weekDates.map((date) => {
                      const daySlots = getSlotsForCell(
                        date,
                        timeSlot.startTime,
                        timeSlot.endTime,
                      );

                      return (
                        <div
                          key={`${date.toISOString()}-${timeSlot.startTime}`}
                          className={`flex min-w-0 flex-col justify-center gap-1.5 border-r ${borderClass} p-2 last:border-r-0 ${
                            isSameDay(date, new Date())
                              ? "bg-primary/[0.025]"
                              : ""
                          }`}
                        >
                          {daySlots.length === 0 ? (
                            <span
                              className={`mx-auto text-xs ${
                                isDark ? "text-white/10" : "text-slate-300"
                              }`}
                            >
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

                                  {/* Slot Tooltip */}
                                  <TooltipContent
                                    side="top"
                                    className={`border p-3 shadow-xl ${
                                      isDark
                                        ? "border-white/10 bg-[#142334]"
                                        : "border-slate-200 bg-white"
                                    }`}
                                  >
                                    <div className="space-y-2">
                                      <div>
                                        <p
                                          className={`font-semibold ${
                                            isDark
                                              ? "text-white"
                                              : "text-slate-900"
                                          }`}
                                        >
                                          {patientName}
                                        </p>

                                        <p
                                          className={`mt-0.5 text-xs ${mutedTextClass}`}
                                        >
                                          {slot.clinicName}
                                        </p>
                                      </div>

                                      <div
                                        className={`flex items-center gap-2 text-xs ${mutedTextClass}`}
                                      >
                                        {slot.mode === "ONLINE" ? (
                                          <Video size={13} />
                                        ) : (
                                          <MapPin size={13} />
                                        )}

                                        {slot.mode === "ONLINE"
                                          ? "Online Consultation"
                                          : "Offline Consultation"}
                                      </div>

                                      <p
                                        className={`text-xs ${mutedTextClass}`}
                                      >
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

            <span className={`text-xs ${mutedTextClass}`}>{clinic.name}</span>
          </div>
        ))}
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
        {statusOrder.map((status) => (
          <LegendItem
            key={status}
            className={CALENDAR_STATUS_PARTS[status].dot}
            label={STATUS_LABELS[status]}
          />
        ))}
      </div>
    </>
  );
};

export default WeeklyScheduleCalendarGrid;
