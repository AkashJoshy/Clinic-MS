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
  maxTokensPerDay: number;
  autoConfirmBookings: boolean;
  allowReschedule: boolean;
}

export interface Break {
  label: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleException {
  reason: string;
  startDate: string;
  endDate: string;
}

export interface OneTimeAvailability {
  date: string;
  startTime: string;
  endTime: string;
}

export interface Exceptions {
  breaks: Break[];
  blackouts: ScheduleException[];
  holidays: ScheduleException[];
  overrides: OneTimeAvailability[];
}

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
  startTime: string;
  endTime: string;
  mode: ServiceMode;
}

export type ScheduleData = Record<string, Shift[]>;

export interface WeeklyScheduleProps {
  schedule: ScheduleData;
  onChange: (updatedSchedule: ScheduleData) => void;
}
