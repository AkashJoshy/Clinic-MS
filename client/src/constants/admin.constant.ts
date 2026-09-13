import type { DoctorManagementTab, PatientDetailsTab } from "@/types/admin";

export const patientTabs = [
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "appointments",
    label: "Appointments",
  },
  {
    key: "medical-records",
    label: "Medical Records",
  },
  {
    key: "reviews",
    label: "Reviews",
  },
] satisfies { key: PatientDetailsTab; label: string; }[];

export const doctorTabs = [
  {
    key: "all",
    label: "All Doctors",
  },
  {
    key: "pending",
    label: "Pending Approval",
  },
] satisfies { key: DoctorManagementTab; label: string }[];