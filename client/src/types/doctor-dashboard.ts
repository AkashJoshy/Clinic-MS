import type { Clinic } from "./clinic";
import type { ServiceMode } from "./common";
import type { DoctorClinic, SlotStatus } from "./doctor-clinic";

export type AppointmentStatus =
  | "CONFIRMED"
  | "COMPLETED"
  | "PENDING"
  | "CANCELLED";

export interface RecentAppointment {
  id: string;
  patient: string;
  date: string;
  type: ServiceMode;
  status: AppointmentStatus;
}

export interface DashboardOverview {
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

  recentAppointments: RecentAppointment[];
}

export interface TodayAppointment {
  id: string;
  patient: string;
  time: string;
  type: "ONLINE" | "OFFLINE";
  status: AppointmentStatus;
}

export interface DoctorDashboardStatsProps {
  data: DashboardOverview | null;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  details: {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
  }[];
  footer?: React.ReactNode;
  index: number;
  theme: {
    icon: string;
    value: string;
    border: string;
    glow: string;
    background: string;
    accent: string;
  };
}

export interface CalendarDateRange {
  from: Date;
  to: Date;
}

export interface DoctorCalendarSlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  mode: ServiceMode;
  clinicDetails: Omit<
    Clinic,
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
    DoctorClinic,
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

export interface GetDoctorCalendarData {
  slots: DoctorCalendarSlots;
  clinicsCount: number;
}
