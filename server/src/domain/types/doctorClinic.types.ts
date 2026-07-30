import type { ApprovalStatus, DayOfWeek, ServiceMode } from "./shared.types.ts";

export interface Session {
  startTime: string;
  endTime: string;
  isActive: boolean;
  type: ServiceMode;
}

export interface WeeklySchedule {
  dayOfWeek: DayOfWeek;
  sessions: Session[];
}

export interface Leave{
  id: string | null;
  startDate: Date;
  endDate: Date;
  reason: string;
  isFullDay: boolean;
  startTime: string;
  endTime: string;
  status: ApprovalStatus;
  createdAt: Date| null;
}

export interface AddDoctorClinicProps {
  id: string | null;
  doctorId: string | null;
  clinicId: string | null;
  type: ServiceMode;
  consultationFee: number;
  schedule: WeeklySchedule[];
  leaves: Leave[];
  slotDuration: number;
  timeZone: string;
  isActive: boolean,
  createdAt: Date | null;
  updatedAt: Date | null;
}