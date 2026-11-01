import type { SlotStatus } from "../../domain/types/doctor-clinic.types.ts";
import type { ServiceMode } from "../../domain/types/shared.types.ts";
import type { SafeClinic } from "./clinic.dto.ts";
import type { SafeDoctorClinic } from "./doctor-clinic.dto.ts";

export interface DoctorDashboardOverviewResponseDto {
  appointments: {
    today: {
      total: number;
      completed: number;
      upcoming: number;
      cancelled: number;
    };
    overall: {
      total: number;
      completed: number;
      cancelled: number;
    };
  };

  schedule: {
    today: {
      totalSlots: number;
      availableSlots: number;
      bookedSlots: number;
    };
  };

  earnings: {
    total: number;
    today: number;
    thisMonth: number;
  };

  recentAppointments: {
    id: string;
    patientId: string;
    patientName: string;
    patientProfileImage?: string;
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    status: string;
    consultationType: "ONLINE" | "OFFLINE";
  }[];
}

export interface GetDoctorCalendarDto {
  userId: string;
  data: {
    from: Date;
    to: Date;
  };
}

export interface DoctorCalendarSlot {
  id: string | null;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  mode: ServiceMode;
  updatedAt: Date | null
  clinicDetails: Omit<
    SafeClinic,
    | "registrationNumber"
    | "establishmentLicenceDoc"
    | "registrationDoc"
    | "about"
    | "altPhone"
    | "createdAt"
    | "updatedAt"
    | "location"
  >;
  doctorClinicDetails: Omit<
    SafeDoctorClinic,
    | "clinicId"
    | "doctorId"
    | "weeklySchedule"
    | "slotRules"
    | "exceptions"
    | "createdAt"
    | "updatedAt"
  >;
}

export type DoctorCalendarSlots = Record<string, DoctorCalendarSlot[]>;

export interface GetDoctorCalendarResponseDto {
  slots: DoctorCalendarSlots;
  clinicsCount: number;
}

export interface InitializeCalendarDateRangeDto {
  from: Date
  to: Date
}