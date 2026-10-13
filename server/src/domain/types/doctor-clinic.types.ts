import type {
  ApprovalStatus,
  DayOfWeek,
  ServiceMode,
  SessionStatus,
} from "./shared.types.ts";

export interface Session {
  startTime: string;
  endTime: string;
  isActive: boolean;
  status: SessionStatus;
  type: ServiceMode;
}

export type SlotStatus =
  | "AVAILABLE"
  | "BOOKED"
  | "BLOCKED"
  | "EXPIRED"
  | "CANCELLED"
  | "EXCEEDED"
  | "REPLACEABLE";

export interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  mode: ServiceMode;
}

export interface WeeklySchedule {
  dayOfWeek: DayOfWeek;
  shifts: Shift[];
}

export type ShiftWithoutId = Omit<Shift, "id">;

export interface WeeklyScheduleWithoutShiftId {
  dayOfWeek: DayOfWeek;
  shifts: ShiftWithoutId[];
}

export interface Leave {
  id: string | null;
  startDate: Date;
  endDate: Date;
  reason: string;
  isFullDay: boolean;
  startTime: string;
  endTime: string;
  status: ApprovalStatus;
  createdAt: Date | null;
}

export interface SlotRules {
  sessionDuration: number;
  bufferTime: number;
  maxSessionsPerDay: number;
  minAdvanceNotice: number;
  bookingWindow: number;
  slotInterval: "AUTO" | "FIXED";
  autoConfirmBookings: boolean;
  allowReschedule: boolean;
}

export interface Break {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleException {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
}

export interface OneTimeAvailability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Exceptions {
  breaks: Break[];
  vacations: ScheduleException[];
  blackouts: ScheduleException[];
  holidays: ScheduleException[];
  overrides: OneTimeAvailability[];
}

export type BreakWithoutId = Omit<Break, "id">;

export type ScheduleExceptionWithoutId = Omit<ScheduleException, "id">;

export type OneTimeAvailabilityWithoutId = Omit<OneTimeAvailability, "id">;

export interface AddDoctorClinicProps {
  id: string | null;
  doctorId: string | null;
  clinicId: string | null;
  type: ServiceMode;
  consultationFee: number;
  weeklySchedule: WeeklySchedule[];
  slotRules: SlotRules;
  exceptions: Exceptions;
  timeZone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  mode: ServiceMode;
}

export type ScheduleData = Record<string, Shift[]>;

export interface WeeklyScheduleProps {
  schedule: ScheduleData;
  onChange: (updatedSchedule: ScheduleData) => void;
}
