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
  isDark: boolean;
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
  isDark: boolean
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

export interface CalendarSlot {
  id: string | null;
  doctorId: string | null;
  clinicId: string | null;
  clinicName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  mode: ServiceMode;
  patientName?: string;
}

export type CalendarClinicDetails = {
  id: string | null,
  name: string
  color: string
}

export interface WeeklyScheduleCalendarProps {
  slots: CalendarSlot[];
  clinics: CalendarClinicDetails[];
  weekDates: Date[];
  handleSlotByWeek: (from: Date, to: Date) => void;
  ishandleSlotByWeek: boolean;
  isDark: boolean;
  onSlotClick?: (slot: CalendarSlot, date: Date) => void;
}

export interface WeeklyScheduleCalendarControlsProps {
  clinics: CalendarClinicDetails[];
  selectedClinic: string;
  selectedStatus: SlotStatus | "ALL";
  statusOrder: SlotStatus[];
  weekDates: Date[];
  filteredSlotsCount: number;
  setSelectedClinic: (clinicId: string) => void;
  setSelectedStatus: (status: SlotStatus | "ALL") => void;
  clearFilters: () => void;
  goToToday: () => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  isDark: boolean;
}

export interface WeeklyScheduleCalendarGridProps {
  slots: CalendarSlot[];
  clinics: CalendarClinicDetails[];
  weekDates: Date[];
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
  statusOrder: SlotStatus[];
  clinicColorMap: ReadonlyMap<string | null, string>;
  getSlotsForCell: (
    date: Date,
    startTime: string,
    endTime: string,
  ) => CalendarSlot[];
  onSlotClick?: (slot: CalendarSlot, date: Date) => void;
  isDark: boolean
}

export interface RecentAppointmentsProps {
  appointments: RecentAppointment[];
  isDark: boolean;
}
