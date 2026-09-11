import type { PatientDetailsTab } from "@/types/admin";

export const patientTabs = [
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "appointments",
    label: "Appointments",
    count: 5,
  },
  {
    key: "medical-records",
    label: "Medical Records",
    count: 5,
  },
  {
    key: "reviews",
    label: "Reviews",
    count: 12,
  },
] satisfies { key: PatientDetailsTab; label: string; count?: number }[];