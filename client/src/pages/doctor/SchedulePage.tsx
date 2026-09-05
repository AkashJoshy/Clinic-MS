import { Exceptions } from "@/components/shared/doctor/slot-schedules/Exceptions";
import { PreviewGeneratedSlots } from "@/components/shared/doctor/slot-schedules/PreviewGeneratedSlots";
import { SlotRulesPreferences } from "@/components/shared/doctor/slot-schedules/SlotRulesPreferences";
import { WeeklySchedule } from "@/components/shared/doctor/slot-schedules/WeeklySchedule";
import WeeklyScheduleCalendar from "@/components/shared/doctor/slot-schedules/WeeklyScheduleCalendar";
import { useAuthStore } from "@/store";
import type {
  ExceptionsData,
  ScheduleData,
  SlotRules,
  WeeklySchedule as WeeklyScheduleType,
} from "@/types/doctor-clinic";
import { CircleHelp } from "lucide-react";
import { useMemo, useState } from "react";

const SchedulePage = () => {
  const doctorDetails = useAuthStore((state) => state.doctor);

  const scheduleData: ScheduleData = {
    monday: [
      {
        id: "shift-1",
        startTime: "09:00",
        endTime: "13:00",
        mode: "OFFLINE",
      },
      {
        id: "shift-2",
        startTime: "14:00",
        endTime: "18:00",
        mode: "ONLINE",
      },
    ],
    tuesday: [
      {
        id: "shift-3",
        startTime: "09:00",
        endTime: "13:00",
        mode: "OFFLINE",
      },
    ],
    wednesday: [
      {
        id: "shift-4",
        startTime: "10:00",
        endTime: "14:00",
        mode: "ONLINE",
      },
    ],
    thursday: [
      {
        id: "shift-5",
        startTime: "09:00",
        endTime: "12:00",
        mode: "ONLINE",
      },
      {
        id: "shift-6",
        startTime: "15:00",
        endTime: "19:00",
        mode: "OFFLINE",
      },
    ],
    friday: [
      {
        id: "shift-7",
        startTime: "09:00",
        endTime: "13:00",
        mode: "OFFLINE",
      },
    ],
    saturday: [
      {
        id: "shift-8",
        startTime: "10:00",
        endTime: "14:00",
        mode: "ONLINE",
      },
    ],
    sunday: [],
  };

  const DEFAULT_SLOT_RULES: SlotRules = {
    sessionDuration: 30,
    bufferTime: 10,
    maxSessionsPerDay: 20,
    minAdvanceNotice: 2,
    bookingWindow: 30,
    slotInterval: "auto",
    bookingMode: "both",
    autoConfirmBookings: true,
    allowReschedule: true,
  };

  const DEFAULT_EXCEPTIONS_DATA: ExceptionsData = {
    breaks: [],
    vacations: [],
    blackouts: [],
    holidays: [],
    overrides: [],
  };

  const [schedule, setSchedule] = useState(scheduleData);
  const [slotRules, setSlotRules] = useState(DEFAULT_SLOT_RULES);
  const [exceptions, setExceptions] = useState(DEFAULT_EXCEPTIONS_DATA);
  const scheduleLength = useMemo(() => {
    const len = Object.keys(schedule).reduce((curr, elem) => {
      return curr + schedule[elem].length;
    }, 0);
    return len;
  }, [schedule]);

  const dummyWeeklySchedule: WeeklyScheduleType[] = [
    {
      dayOfWeek: "MONDAY",
      sessions: [
        {
          startTime: "09:00",
          endTime: "10:00",
          isActive: true,
          type: "ONLINE",
          status: "AVAILABLE",
        },
        {
          startTime: "10:15",
          endTime: "11:15",
          isActive: true,
          type: "ONLINE",
          status: "UPCOMING",
        },
        {
          startTime: "11:30",
          endTime: "12:30",
          isActive: true,
          type: "OFFLINE",
          status: "BOOKED",
        },
        {
          startTime: "12:45",
          endTime: "13:45",
          isActive: false,
          type: "ONLINE",
          status: "EXPIRED",
        },
        {
          startTime: "14:00",
          endTime: "15:00",
          isActive: true,
          type: "OFFLINE",
          status: "PENDING",
        },
        {
          startTime: "15:15",
          endTime: "16:15",
          isActive: true,
          type: "ONLINE",
          status: "CONFIRMED",
        },
      ],
    },

    {
      dayOfWeek: "TUESDAY",
      sessions: [
        {
          startTime: "09:00",
          endTime: "10:00",
          isActive: true,
          type: "ONLINE",
          status: "LIVE",
        },
        {
          startTime: "10:15",
          endTime: "11:15",
          isActive: true,
          type: "OFFLINE",
          status: "COMPLETED",
        },
        {
          startTime: "11:30",
          endTime: "12:30",
          isActive: false,
          type: "ONLINE",
          status: "CANCELLED",
        },
        {
          startTime: "12:45",
          endTime: "13:45",
          isActive: false,
          type: "ONLINE",
          status: "MISSED",
        },
        {
          startTime: "14:00",
          endTime: "15:00",
          isActive: false,
          type: "OFFLINE",
          status: "UNAVAILABLE",
        },
      ],
    },

    {
      dayOfWeek: "WEDNESDAY",
      sessions: [
        {
          startTime: "09:00",
          endTime: "18:00",
          isActive: false,
          type: "ONLINE",
          status: "DAY_OFF",
        },
      ],
    },

    {
      dayOfWeek: "THURSDAY",
      sessions: [
        {
          startTime: "09:00",
          endTime: "10:00",
          isActive: true,
          type: "ONLINE",
          status: "AVAILABLE",
        },
        {
          startTime: "10:15",
          endTime: "11:15",
          isActive: true,
          type: "OFFLINE",
          status: "PENDING",
        },
        {
          startTime: "11:30",
          endTime: "12:30",
          isActive: true,
          type: "ONLINE",
          status: "CONFIRMED",
        },
        {
          startTime: "12:45",
          endTime: "13:45",
          isActive: true,
          type: "ONLINE",
          status: "LIVE",
        },
        {
          startTime: "14:00",
          endTime: "15:00",
          isActive: false,
          type: "OFFLINE",
          status: "COMPLETED",
        },
      ],
    },

    {
      dayOfWeek: "FRIDAY",
      sessions: [
        {
          startTime: "09:00",
          endTime: "10:00",
          isActive: true,
          type: "ONLINE",
          status: "UPCOMING",
        },
        {
          startTime: "10:15",
          endTime: "11:15",
          isActive: true,
          type: "OFFLINE",
          status: "BOOKED",
        },
        {
          startTime: "11:30",
          endTime: "12:30",
          isActive: false,
          type: "ONLINE",
          status: "EXPIRED",
        },
        {
          startTime: "12:45",
          endTime: "13:45",
          isActive: false,
          type: "ONLINE",
          status: "CANCELLED",
        },
        {
          startTime: "14:00",
          endTime: "15:00",
          isActive: false,
          type: "OFFLINE",
          status: "MISSED",
        },
      ],
    },

    {
      dayOfWeek: "SATURDAY",
      sessions: [
        {
          startTime: "09:00",
          endTime: "10:00",
          isActive: true,
          type: "ONLINE",
          status: "AVAILABLE",
        },
        {
          startTime: "10:15",
          endTime: "11:15",
          isActive: false,
          type: "OFFLINE",
          status: "UNAVAILABLE",
        },
        {
          startTime: "11:30",
          endTime: "12:30",
          isActive: false,
          type: "ONLINE",
          status: "COMPLETED",
        },
        {
          startTime: "12:45",
          endTime: "13:45",
          isActive: true,
          type: "ONLINE",
          status: "BOOKED",
        },
      ],
    },

    {
      dayOfWeek: "SUNDAY",
      sessions: [],
    },
  ];

  return (
    <div className="min-h-full p-6 lg:p-8 space-y-6 relative border border-white/10 bg-white/2 shadow-2xs">
      <WeeklyScheduleCalendar
        weeklySchedule={dummyWeeklySchedule}
        onSessionClick={(session, date) => {
          console.log("Clicked session:", session);
          console.log("Date:", date);
        }}
      />

      <div className="flex mt-15 items-center">
        <h1 className="text-white font-bold text-[25px]">Session Schedule</h1>

        <CircleHelp className="ml-2 h-5 w-5 text-white/60 cursor-help" />
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 ">
        <div className="min-w-0">
          <WeeklySchedule
            schedule={schedule}
            onChange={(e) => {
              setSchedule(e);
            }}
          />
        </div>

        <div className="min-w-0">
          <SlotRulesPreferences
            rules={slotRules}
            onChange={(e) => {
              setSlotRules(e);
            }}
            disabled={scheduleLength === 0}
          />
        </div>

        <div className="min-w-0">
          <Exceptions
            exceptions={exceptions}
            onChange={(e) => {
                setExceptions(e)
            }}
            disabled={scheduleLength === 0}
          />
        </div>

        <div className="min-w-0">
          <PreviewGeneratedSlots
            schedule={{
              weeklySchedule: [],
            }}
            rules={{
              sessionDuration: 30,
              bufferTime: 10,
              maxSessionsPerDay: 20,
              minAdvanceNotice: 60,
              bookingWindow: 30,
              slotInterval: "auto",
              bookingMode: "both",
              autoConfirmBookings: true,
              allowReschedule: true,
            }}
            exceptions={{
              breaks: [
                {
                  id: "break-1",
                  label: "Lunch Break",
                  startTime: "13:00",
                  endTime: "14:00",
                },
              ],
              vacations: [
                {
                  id: "vacation-1",
                  startDate: "2026-09-14",
                  endDate: "2026-09-16",
                },
              ],
              blackouts: [
                {
                  id: "blackout-1",
                  date: "2026-09-10",
                  startTime: "11:00",
                  endTime: "12:30",
                  reason: "Doctor unavailable",
                },
              ],
              holidays: [
                {
                  id: "holiday-1",
                  date: "2026-09-01",
                  label: "Onam",
                },
              ],
              overrides: [
                {
                  id: "override-1",
                  date: "2026-09-05",
                  startTime: "10:00",
                  endTime: "14:00",
                },
              ],
            }}
            previewDate={new Date("2026-09-03")}
            onDateChange={(newDate: Date) => {
              console.log("Preview date:", newDate);
            }}
            onConfirm={() => {
              console.log("Slots confirmed");
            }}
            disabled={false}
            onUnlock={() => {
              console.log("Unlock schedule");
            }}
            existingBookings={[
              {
                slotId: "slot-1",
                date: "2026-09-03",
                startTime: "09:30",
                patientName: "Arjun Menon",
              },
              {
                slotId: "slot-2",
                date: "2026-09-03",
                startTime: "11:10",
                patientName: "Meera Nair",
              },
              {
                slotId: "slot-3",
                date: "2026-09-03",
                startTime: "14:00",
                patientName: "Rahul Kumar",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
