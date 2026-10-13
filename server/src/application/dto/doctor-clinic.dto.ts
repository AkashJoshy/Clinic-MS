import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import type { BreakWithoutId, Exceptions, OneTimeAvailabilityWithoutId, ScheduleExceptionWithoutId, SlotRules, SlotStatus, WeeklySchedule, WeeklyScheduleWithoutShiftId } from "../../domain/types/doctor-clinic.types.ts";
import type { DayOfWeek, ServiceMode } from "../../domain/types/shared.types.ts";

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

export type SlotsWithDateDto = {
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

export type DoctorClinicSlotsWithDateDto = {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  generatedSlots: SlotsWithDateDto[],
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
  generatedSlots: SlotsWithDateDto[],
}