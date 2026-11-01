import type { FieldError, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import type {
  ApprovalStatus,
  DayOfWeek,
  DoctorClinicContextDto,
  ServiceMode,
  SessionStatus,
} from "./common";
import type { AdminDoctorInfo, DoctorInfo } from "./doctor";
import type { ScheduleFormSchemaFormData } from "@/schemas/doctor/doctor.schema";

export interface DoctorClinic {
  id: string | null;
  doctorId: string | null;
  clinicId: string | null;
  type: ServiceMode;
  consultationFee: number;
  weeklySchedule: WeeklySchedule[];
  slotRules: SlotRules;
  exceptions: ExceptionsData,
  timeZone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
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

export interface ExceptionsData {
  breaks: Break[]
  vacations: ScheduleException[];
  blackouts: ScheduleException[];
  holidays: ScheduleException[];
  overrides: OneTimeAvailability[];
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

export interface Session {
  startTime: string;
  endTime: string;
  isActive: boolean;
  status: SessionStatus;
  type: ServiceMode;
}

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
  slotInterval: 'AUTO' | 'FIXED';
  autoConfirmBookings: boolean;
  allowReschedule: boolean;
}


export interface WeeklyScheduleProps {
  schedule: WeeklySchedule[],
  onChange: (updatedSchedule: WeeklySchedule) => void;
  scheduleLength: number
  selectedClinicId: string
  error?: FieldErrors<ScheduleFormSchemaFormData>["weeklySchedule"]
}

export interface SlotRulesPreferencesProps {
  rules: SlotRules;
  onChange: (updatedRules: SlotRules) => void;
  disabled: boolean;
  error?: FieldErrors<ScheduleFormSchemaFormData>["slotRules"]
}

export interface ExceptionsProps {
  exceptions: ExceptionsData;
  onChange: (updatedExceptions: ExceptionsData) => void;
  disabled: boolean;
  generateSlots: () => void
  optional?: boolean;
}

export interface PreviewGeneratedSlotsProps {
  schedule: WeeklySchedule[];
  rules: SlotRules;
  exceptions: ExceptionsData;
  previewDate: Date;
  onDateChange: (newDate: Date) => void;
  onConfirm: () => void;
  disabled: boolean;
  previewSlots: SlotsWithDate[]
  isPending: boolean;
  onUnlock?: () => void;
  existingBookings?: { slotId: string; date: string; startTime: string; patientName: string }[];
}

export type ActiveTab = "breaks" | "vacations" | "blackouts" | "holidays";

export interface BreakForm {
  label: string;
  startTime: string;
  endTime: string;
}

export interface DateForm {
  reason: string;
  startDate: string;
  endDate: string;
}

export interface OverrideForm {
  date: string;
  startTime: string;
  endTime: string;
}

export interface UseScheduleFormReturn {
  schedule: WeeklySchedule[] | undefined;
  setSchedule: React.Dispatch<React.SetStateAction<WeeklySchedule[] | undefined>>;
  slotRules: SlotRules | undefined;
  setSlotRules: React.Dispatch<React.SetStateAction<SlotRules | undefined>>;
  exceptions: ExceptionsData | undefined;
  setExceptions: React.Dispatch<React.SetStateAction<ExceptionsData | undefined>>;
  scheduleLength: number;
  handleClinicChange: (clinicId: string) => void;
  selectedClinic: AdminDoctorInfo["doctorClinicDetails"][number] | undefined;
  selectedClinicId: string | null | undefined;
  doctorDetails: DoctorInfo | null;
  register: UseFormRegister<ScheduleFormSchemaFormData>;
  watch: UseFormWatch<ScheduleFormSchemaFormData>;
  setValue: UseFormSetValue<ScheduleFormSchemaFormData>;
  errors: FieldErrors<ScheduleFormSchemaFormData>;
  isSubmitted: boolean
  trigger: UseFormTrigger<ScheduleFormSchemaFormData>
  handleSubmit: UseFormHandleSubmit<ScheduleFormSchemaFormData>;
  handleGenerateSlots: () => void
}

export type UseWeeklyScheduleParams = Pick<
  WeeklyScheduleProps,
  "schedule" | "onChange" | "selectedClinicId"
>;

export interface GenerateSlotsData {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  weeklySchedule: WeeklySchedule[];
  exceptions: ExceptionsData;
  slotRules: SlotRules;
}

export type SlotsWithDate = {
  date: string;
  dayOfWeek: DayOfWeek;
  message: string;
  slots: {
    startTime: string;
    endTime: string;
    mode: ServiceMode;
    status: SlotStatus
  }[];
};

export interface ConfirmedSlots {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  generatedSlots: SlotsWithDate[];
}

export type SlotStatus = "AVAILABLE" | "REPLACEABLE" | "BOOKED" | "APPROVED" | "CANCELLED" | "EXPIRED"

export type PreviewHookProps = Pick<
  PreviewGeneratedSlotsProps,
  "previewSlots" | "onDateChange"
>;

export interface UsePreviewGeneratedSlotsReturn {
  index: number;
  totalDays: number;
  date: Date;
  slots: SlotsWithDate["slots"];
  selectedKey: string | null;
  availableSlots: SlotsWithDate["slots"];
  replaceableSlots: SlotsWithDate["slots"];
  slotKey: (startTime: string) => string;
  handleAvailableClick: (startTime: string) => void;
  handleReplaceableClick: (startTime: string) => void;
  go: (step: number) => void;
}

export type CalendarClinicDetails = {
  id: string | null,
  name: string
  color: string
}