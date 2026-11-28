import type mongoose from "mongoose";
import type {
  DayOfWeek,
  ServiceMode,
} from "../../../domain/types/shared.types.ts";
import type { SlotRules } from "../../../domain/types/doctor-clinic.types.ts";
import type { Document } from "mongoose";

export interface IPersistenceBreak {
  label: string;
  startTime: string;
  endTime: string;
}

export interface IPersistenceWeeklySchedule {
  dayOfWeek: DayOfWeek;
  shifts: IPersistenceShift[];
}

export interface IPersistenceShift {
  startTime: string;
  endTime: string;
  mode: ServiceMode;
}

export interface IPersistenceSchedule {
  reason: string;
  startDate: string;
  endDate: string;
}

export interface IPersistenceOneTimeAvailability {
  date: string;
  startTime: string;
  endTime: string;
}

export interface IPersistenceExceptions {
  breaks: IPersistenceBreak[];
  blackouts: IPersistenceSchedule[];
  holidays: IPersistenceSchedule[];
  overrides: IPersistenceOneTimeAvailability[];
}

export interface IDoctorClinic extends Document {
  clinicId: mongoose.Types.ObjectId | null;
  doctorId: mongoose.Types.ObjectId | null;
  consultationFee: number;
  type: ServiceMode;
  weeklySchedule: IPersistenceWeeklySchedule[];
  exceptions: IPersistenceExceptions;
  slotRules: SlotRules;
  timeZone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
