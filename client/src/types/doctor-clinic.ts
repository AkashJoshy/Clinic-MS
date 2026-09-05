import type {
  ApprovalStatus,
  DayOfWeek,
  ServiceMode,
  SessionStatus,
} from "./common";

export interface DoctorClinic {
  id: string | null;
  doctorId: string | null;
  clinicId: string | null;
  type: ServiceMode;
  consultationFee: number;
  schedule: WeeklySchedule[];
  leaves: Leave[];
  slotDuration: number;
  timeZone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Session {
  startTime: string;
  endTime: string;
  isActive: boolean;
  status: SessionStatus;
  type: ServiceMode;
}

export interface WeeklySchedule {
  dayOfWeek: DayOfWeek;
  sessions: Session[];
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


export interface Shift {
  id: string;
  startTime: string;
  endTime: string; 
  mode: ServiceMode;
}

export type ScheduleData = Record<string, Shift[]>;

export interface SlotRules {
  sessionDuration: number;
  bufferTime: number;
  maxSessionsPerDay: number;
  minAdvanceNotice: number;
  bookingWindow: number;
  slotInterval: 'auto' | 'fixed';
  bookingMode: 'online' | 'offline' | 'both';
  autoConfirmBookings: boolean;
  allowReschedule: boolean;
}
export interface ExceptionsData {
  breaks: { id: string; label: string; startTime: string; endTime: string }[];
  vacations: { id: string; startDate: string; endDate: string }[];
  blackouts: { id: string; date: string; startTime: string; endTime: string; reason: string }[];
  holidays: { id: string; date: string; label: string }[];
  overrides: { id: string; date: string; startTime: string; endTime: string }[];
}

export interface WeeklyScheduleProps {
  schedule: ScheduleData;
  onChange: (updatedSchedule: ScheduleData) => void;
}

export interface SlotRulesPreferencesProps {
  rules: SlotRules;
  onChange: (updatedRules: SlotRules) => void;
  disabled: boolean;
}

export interface ExceptionsProps {
  exceptions: ExceptionsData;
  onChange: (updatedExceptions: ExceptionsData) => void;
  disabled: boolean;
  optional?: boolean;
}

export interface PreviewGeneratedSlotsProps {
  schedule: ScheduleData;
  rules: SlotRules;
  exceptions: ExceptionsData;
  previewDate: Date;
  onDateChange: (newDate: Date) => void;
  onConfirm: () => void;
  disabled: boolean;
  onUnlock?: () => void;
  existingBookings?: { slotId: string; date: string; startTime: string; patientName: string }[];
}

