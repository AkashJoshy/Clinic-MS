import type { Exceptions, SlotRules, WeeklySchedule } from "../types/doctor-clinic.types.ts";

export const INITIAL_SLOT_RULES: SlotRules = {
  maxTokensPerDay: 20,
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
  blackouts: [],
  overrides: []
}