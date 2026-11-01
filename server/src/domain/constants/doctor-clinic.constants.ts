import type { Exceptions, SlotRules, WeeklySchedule } from "../types/doctor-clinic.types.ts";

export const INITIAL_SLOT_RULES: SlotRules = {
  sessionDuration: 30,
  bufferTime: 10,
  maxSessionsPerDay: 20,
  minAdvanceNotice: 60,
  bookingWindow: 30,
  slotInterval: "AUTO",
  // bookingMode: "both",
  autoConfirmBookings: true,
  allowReschedule: true,
};

export const INITIAL_SCHEDULE: WeeklySchedule[] = [
  {
    dayOfWeek: "MONDAY",
    shifts: [],
  },
  {
    dayOfWeek: "TUESDAY",
    shifts: [],
  },
  {
    dayOfWeek: "WEDNESDAY",
    shifts: [],
  },
  {
    dayOfWeek: "THURSDAY",
    shifts: [],
  },
  {
    dayOfWeek: "FRIDAY",
    shifts: [],
  },
  {
    dayOfWeek: "SATURDAY",
    shifts: [],
  },
  {
    dayOfWeek: "SUNDAY",
    shifts: [],
  },
];

export const INITIAL_EXCEPTIONS: Exceptions = {
  breaks: [],
  holidays: [],
  vacations: [],
  blackouts: [],
  overrides: []
}