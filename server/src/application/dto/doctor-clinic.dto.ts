import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import type { BreakWithoutId, Exceptions, OneTimeAvailabilityWithoutId, ScheduleExceptionWithoutId, Session, SlotRules, SlotStatus, WeeklySchedule, WeeklyScheduleWithoutShiftId } from "../../domain/types/doctor-clinic.types.ts";
import type { DayOfWeek, ServiceMode } from "../../domain/types/shared.types.ts";
import type { SafeClinic } from "./clinic.dto.ts";
import type { SafeAddress } from "./shared.dto.ts";

export type SafeDoctorClinic = Omit<
  DoctorClinic,
  | "activate"
  | "addLeave"
  | "deactivate"
  | "activeStatus"
  | "removeLeave"
  | "updateLeave"
  | "updateSchedule"
  | "updateConsultationDetails"
  | "updateSlotRules"
>;

export type SafeDoctorClinicResponseDto = SafeDoctorClinic

export interface GenerateSlotsDto {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  weeklySchedule: WeeklySchedule[];
  exceptions: Exceptions;
  slotRules: SlotRules;
}

export interface DoctorClinicScheduleWithoutIdDto {
  weeklySchedule: WeeklyScheduleWithoutShiftId[];
  slotRules: SlotRules;
  exceptions: ExceptionsWithoutIdDto;
}

export interface ExceptionsWithoutIdDto {
  breaks: BreakWithoutId[];
  vacations: ScheduleExceptionWithoutId[];
  blackouts: ScheduleExceptionWithoutId[];
  holidays: ScheduleExceptionWithoutId[];
  overrides: OneTimeAvailabilityWithoutId[];
}

export type SlotsWithDateResponseDto = {
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

export type DoctorSlotsWithDateResponseDto = {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  generatedSlots: SlotsWithDateResponseDto[],
  weeklySchedule: WeeklySchedule[],
  slotRules: SlotRules,
  exceptions: Exceptions
};

export type DaySlotsDto = {
  dayOfWeek: DayOfWeek;
  slots: {
    startTime: string;
    endTime: string;
    mode: ServiceMode;
    status: SlotStatus;
  }[];
};

export type ConfirmSlotsDto = {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  generatedSlots: SlotsWithDateResponseDto[],
}

export type DoctorClinicContextDto = SafeDoctorClinic & {
  clinic: SafeClinic | null;
  clinicAddress: SafeAddress | null;
};

export type DoctorClinicContextResponseDto = DoctorClinicContextDto

export interface SlotGenerationDto {
  doctorClinicId: string;
  date: Date;
  session: Session;
  duration: number;
}