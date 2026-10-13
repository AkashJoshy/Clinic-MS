import type {
  ExceptionsData,
  ScheduleData,
  SlotRules,
  WeeklySchedule,
} from "@/types/doctor-clinic";

export const scheduleData: WeeklySchedule[] = [
  {
    dayOfWeek: "MONDAY",
    shifts: [
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
  },
  {
    dayOfWeek: "TUESDAY",
    shifts: [
      {
        id: "shift-3",
        startTime: "09:00",
        endTime: "13:00",
        mode: "OFFLINE",
      },
    ],
  },
  {
    dayOfWeek: "WEDNESDAY",
    shifts: [
      {
        id: "shift-4",
        startTime: "10:00",
        endTime: "14:00",
        mode: "ONLINE",
      },
    ],
  },
  {
    dayOfWeek: "THURSDAY",
    shifts: [
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
  },
  {
    dayOfWeek: "FRIDAY",
    shifts: [
      {
        id: "shift-7",
        startTime: "09:00",
        endTime: "13:00",
        mode: "OFFLINE",
      },
    ],
  },
  {
    dayOfWeek: "SATURDAY",
    shifts: [
      {
        id: "shift-8",
        startTime: "10:00",
        endTime: "14:00",
        mode: "ONLINE",
      },
    ],
  },
  {
    dayOfWeek: "SUNDAY",
    shifts: [],
  },
];

// export const dummyWeeklySchedule: WeeklySchedule[] = [
//   {
//     dayOfWeek: "MONDAY",
//     sessions: [
//       {
//         startTime: "09:00",
//         endTime: "10:00",
//         isActive: true,
//         type: "ONLINE",
//         status: "AVAILABLE",
//       },
//       {
//         startTime: "10:15",
//         endTime: "11:15",
//         isActive: true,
//         type: "ONLINE",
//         status: "UPCOMING",
//       },
//       {
//         startTime: "11:30",
//         endTime: "12:30",
//         isActive: true,
//         type: "OFFLINE",
//         status: "BOOKED",
//       },
//       {
//         startTime: "12:45",
//         endTime: "13:45",
//         isActive: false,
//         type: "ONLINE",
//         status: "EXPIRED",
//       },
//       {
//         startTime: "14:00",
//         endTime: "15:00",
//         isActive: true,
//         type: "OFFLINE",
//         status: "PENDING",
//       },
//       {
//         startTime: "15:15",
//         endTime: "16:15",
//         isActive: true,
//         type: "ONLINE",
//         status: "CONFIRMED",
//       },
//     ],
//   },

//   {
//     dayOfWeek: "TUESDAY",
//     sessions: [
//       {
//         startTime: "09:00",
//         endTime: "10:00",
//         isActive: true,
//         type: "ONLINE",
//         status: "LIVE",
//       },
//       {
//         startTime: "10:15",
//         endTime: "11:15",
//         isActive: true,
//         type: "OFFLINE",
//         status: "COMPLETED",
//       },
//       {
//         startTime: "11:30",
//         endTime: "12:30",
//         isActive: false,
//         type: "ONLINE",
//         status: "CANCELLED",
//       },
//       {
//         startTime: "12:45",
//         endTime: "13:45",
//         isActive: false,
//         type: "ONLINE",
//         status: "MISSED",
//       },
//       {
//         startTime: "14:00",
//         endTime: "15:00",
//         isActive: false,
//         type: "OFFLINE",
//         status: "UNAVAILABLE",
//       },
//     ],
//   },

//   {
//     dayOfWeek: "WEDNESDAY",
//     sessions: [
//       {
//         startTime: "09:00",
//         endTime: "18:00",
//         isActive: false,
//         type: "ONLINE",
//         status: "DAY_OFF",
//       },
//     ],
//   },

//   {
//     dayOfWeek: "THURSDAY",
//     sessions: [
//       {
//         startTime: "09:00",
//         endTime: "10:00",
//         isActive: true,
//         type: "ONLINE",
//         status: "AVAILABLE",
//       },
//       {
//         startTime: "10:15",
//         endTime: "11:15",
//         isActive: true,
//         type: "OFFLINE",
//         status: "PENDING",
//       },
//       {
//         startTime: "11:30",
//         endTime: "12:30",
//         isActive: true,
//         type: "ONLINE",
//         status: "CONFIRMED",
//       },
//       {
//         startTime: "12:45",
//         endTime: "13:45",
//         isActive: true,
//         type: "ONLINE",
//         status: "LIVE",
//       },
//       {
//         startTime: "14:00",
//         endTime: "15:00",
//         isActive: false,
//         type: "OFFLINE",
//         status: "COMPLETED",
//       },
//     ],
//   },

//   {
//     dayOfWeek: "FRIDAY",
//     sessions: [
//       {
//         startTime: "09:00",
//         endTime: "10:00",
//         isActive: true,
//         type: "ONLINE",
//         status: "UPCOMING",
//       },
//       {
//         startTime: "10:15",
//         endTime: "11:15",
//         isActive: true,
//         type: "OFFLINE",
//         status: "BOOKED",
//       },
//       {
//         startTime: "11:30",
//         endTime: "12:30",
//         isActive: false,
//         type: "ONLINE",
//         status: "EXPIRED",
//       },
//       {
//         startTime: "12:45",
//         endTime: "13:45",
//         isActive: false,
//         type: "ONLINE",
//         status: "CANCELLED",
//       },
//       {
//         startTime: "14:00",
//         endTime: "15:00",
//         isActive: false,
//         type: "OFFLINE",
//         status: "MISSED",
//       },
//     ],
//   },

//   {
//     dayOfWeek: "SATURDAY",
//     sessions: [
//       {
//         startTime: "09:00",
//         endTime: "10:00",
//         isActive: true,
//         type: "ONLINE",
//         status: "AVAILABLE",
//       },
//       {
//         startTime: "10:15",
//         endTime: "11:15",
//         isActive: false,
//         type: "OFFLINE",
//         status: "UNAVAILABLE",
//       },
//       {
//         startTime: "11:30",
//         endTime: "12:30",
//         isActive: false,
//         type: "ONLINE",
//         status: "COMPLETED",
//       },
//       {
//         startTime: "12:45",
//         endTime: "13:45",
//         isActive: true,
//         type: "ONLINE",
//         status: "BOOKED",
//       },
//     ],
//   },

//   {
//     dayOfWeek: "SUNDAY",
//     sessions: [],
//   },
// ];

export const DEFAULT_EXCEPTIONS_DATA: ExceptionsData = {
  breaks: [],
  vacations: [],
  blackouts: [],
  holidays: [],
  overrides: [],
};

export const DEFAULT_SLOT_RULES: SlotRules = {
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
