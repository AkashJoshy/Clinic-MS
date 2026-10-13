import { useMemo, useState } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  LockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LegendItem } from "./legend-item.shared";
import { DAY_NAMES, STATUS_STYLES } from "@/constants/doctor.constant";
import type { WeeklyScheduleCalendarProps } from "@/types/doctor";
import {
  addDays,
  formatDate,
  formatTime,
  formatTimeRange,
  getMonday,
  isSameDay,
} from "@/helpers/session-slot.helper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const WeeklyScheduleCalendar = ({
  weeklySchedule,
  onSessionClick,
}: WeeklyScheduleCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(() => getMonday(new Date()));

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => addDays(currentWeek, index));
  }, [currentWeek]);

  const timeSlots = useMemo(() => {
    const slots = new Set<string>();

    weeklySchedule.forEach((day) => {
      day.sessions.forEach((session) => {
        if (session.status !== "DAY_OFF") {
          slots.add(`${session.startTime}-${session.endTime}`);
        }
      });
    });

    return Array.from(slots)
      .map((slot) => {
        const [startTime, endTime] = slot.split("-");

        return {
          startTime,
          endTime,
        };
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [weeklySchedule]);

  const getScheduleForDay = (date: Date) => {
    const dayName = DAY_NAMES[date.getDay() === 0 ? 6 : date.getDay() - 1];

    return weeklySchedule.find((schedule) => schedule.dayOfWeek === dayName);
  };

  const getSession = (date: Date, startTime: string, endTime: string) => {
    const schedule = getScheduleForDay(date);

    if (!schedule) return undefined;

    return schedule.sessions.find(
      (session) =>
        session.startTime === startTime && session.endTime === endTime,
    );
  };

  const isDayOff = (date: Date) => {
    const schedule = getScheduleForDay(date);

    return schedule?.sessions.some((session) => session.status === "DAY_OFF");
  };

  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => addDays(prev, 7));
  };

  const goToToday = () => {
    setCurrentWeek(getMonday(new Date()));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center">
            <CalendarClock size={20} className="text-[#1dc465]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              Session Management
            </h1>
            <h6 className="text-sm text-[#8b9ab0]">
              Manage your weekly appointment slots
            </h6>
          </div>
        </div>

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

      <div className="text-center">
        <span className="text-sm font-medium text-[#8b9ab0]">
          {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d1a27]">
        <ScrollArea className="w-full">
          <div className="min-w-225">
            <div className="grid grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b border-white/8">
              <div className="border-r border-white/8 p-4" />

              {weekDates.map((date, index) => {
                const today = isSameDay(date, new Date());

                return (
                  <div
                    key={date.toISOString()}
                    className={`relative border-r border-white/8 p-3 text-center last:border-r-0 ${
                      today ? "bg-[#1dc465]/5" : ""
                    }`}
                  >
                    <p
                      className={`text-[11px] font-semibold tracking-wider ${
                        today ? "text-[#1dc465]" : "text-[#8b9ab0]"
                      }`}
                    >
                      {DAY_NAMES[index]}
                    </p>

                    <p
                      className={`mt-1 text-lg font-semibold ${
                        today ? "text-[#1dc465]" : "text-white"
                      }`}
                    >
                      {date.getDate()}
                    </p>

                    {today && (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1dc465]" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className={`relative overflow-hidden}`}>
              {timeSlots.length === 0 ? (
                <>
                  <div className="h-64 select-none blur-[5px]">
                    {Array.from({ length: 3 }).map((_, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="grid min-h-20.5 grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b border-white/6"
                      >
                        <div className="flex items-center border-r border-white/8 px-3">
                          <div className="space-y-1">
                            <div className="h-3 w-10 rounded " />
                            <div className="h-2.5 w-8 rounded " />
                          </div>
                        </div>

                        {weekDates.map((date) => (
                          <div
                            key={date.toISOString()}
                            className="relative flex items-center border-r border-white/8 p-2 last:border-r-0"
                          >
                            <div className="h-10 w-full rounded-lg bg-white/5" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center  backdrop-blur-[2px]">
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-[#2a3545] bg-[#0d1a27]/90 px-3 py-2.5 text-sm text-[#8b9ab0] shadow-lg transition-colors hover:text-primary "
                    >
                      <LockIcon size={18} />
                      <span>Unlock Schedule</span>
                    </button>
                  </div>
                </>
              ) : (
                timeSlots.map((timeSlot, rowIndex) => (
                  <div
                    key={`${timeSlot.startTime}-${timeSlot.endTime}`}
                    className="grid min-h-20.5 grid-cols-[100px_repeat(7,minmax(120px,1fr))] border-b border-white/6 last:border-b-0"
                  >
                    <div className="flex items-center border-r border-white/8 px-3">
                      <div>
                        <p className="text-xs font-medium text-white">
                          {formatTime(timeSlot.startTime)}
                        </p>

                        <p className="text-[11px] text-[#66758a]">
                          {formatTime(timeSlot.endTime)}
                        </p>
                      </div>
                    </div>

                    {weekDates.map((date) => {
                      const session = getSession(
                        date,
                        timeSlot.startTime,
                        timeSlot.endTime,
                      );

                      const dayOff = isDayOff(date);

                      return (
                        <div
                          key={`${date.toISOString()}-${timeSlot.startTime}`}
                          className="relative flex items-center border-r border-white/8 p-2 last:border-r-0"
                        >
                          {!dayOff && session && (
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  type="button"
                                  disabled={!onSessionClick}
                                  onClick={() =>
                                    onSessionClick?.(session, date)
                                  }
                                  className={`w-full rounded-lg border px-2.5 py-3 text-left text-xs font-medium transition-all ${
                                    STATUS_STYLES[session.status]
                                  } ${
                                    onSessionClick
                                      ? "cursor-pointer"
                                      : "cursor-default"
                                  }`}
                                >
                                  {formatTimeRange(session)}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="">
                                <p className={`text-white`}>{session.status}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {!dayOff && !session && (
                            <span className="mx-auto text-xs text-white/10">
                              —
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}

              {timeSlots.length > 0 &&
                weekDates.map((date, index) => {
                  if (!isDayOff(date)) return null;
                  return (
                    <div
                      key={`day-off-${date.toISOString()}`}
                      className="pointer-events-none absolute bottom-0 top-0 border-r border-red-500/10 bg-red-500/[0.04]"
                      style={{
                        left: `calc(100px + ((100% - 100px) / 7) * ${index})`,
                        width: `calc((100% - 100px) / 7)`,
                      }}
                    >
                      <div className="flex h-full items-center justify-center">
                        <div className="-rotate-90 whitespace-nowrap text-[10px] font-semibold tracking-[0.2em] text-red-400/50">
                          DAY OFF
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
        <LegendItem className="bg-emerald-400" label="Available" />
        <LegendItem className="bg-yellow-400" label="Upcoming" />
        <LegendItem className="bg-orange-400" label="Booked" />
        <LegendItem className="bg-white/30" label="Expired" />
        <LegendItem className="bg-red-400" label="Day Off" />

        <LegendItem className="bg-blue-400" label="Pending" />
        <LegendItem className="bg-red-400" label="Cancelled" />
        <LegendItem className="bg-teal-400" label="Completed" />
        <LegendItem className="bg-slate-400" label="Unavailable" />
        <LegendItem className="bg-cyan-400" label="Confirmed" />
        <LegendItem className="bg-violet-400" label="Live" />
        <LegendItem className="bg-rose-400" label="Missed" />
      </div>
    </div>
  );
};

export default WeeklyScheduleCalendar;
