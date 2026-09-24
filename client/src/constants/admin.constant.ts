import type { DoctorManagementTab, PatientDetailsTab } from "@/types/admin";

export const PATIENT_TABS = [
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
] satisfies { key: PatientDetailsTab; label: string }[];

export const DOCTOR_TABS = [
  {
    key: "all",
    label: "All Doctors",
  },
  {
    key: "pending",
    label: "Pending Approval",
  },
  {
    key: "rejected",
    label: "Rejected Doctors",
  },
] satisfies { key: DoctorManagementTab; label: string }[];

export const DOCUMENT_REJECTION_REASONS = [
  "INCORRECT_INFORMATION",
  "INVALID_DOCUMENT",
  "EXPIRED_DOCUMENT",
  "BLURRY_OR_UNREADABLE",
  "WRONG_DOCUMENT",
  "MISSING_INFORMATION",
  "OTHER",
] as const


export const DOCTOR_REAPPLICATION_FIELDS = [
  {
    value: "fullName",
    label: "Full Name",
  },
  {
    value: "phone",
    label: "Phone Number",
  },
  {
    value: "bio",
    label: "Bio",
  },
  {
    value: "gender",
    label: "Gender",
  },
  {
    value: "specialization",
    label: "Specialization",
  },
  {
    value: "qualification",
    label: "Qualification",
  },
  {
    value: "experienceYears",
    label: "Years of Experience",
  },
  {
    value: "licenceNumber",
    label: "Medical Licence Number",
  },
  {
    value: "clinicName",
    label: "Clinic Name",
  },
  {
    value: "registrationNumber",
    label: "Registration Number",
  },
  {
    value: "about",
    label: "About",
  },
  {
    value: "altPhone",
    label: "Alternative Phone Number",
  },
  {
    value: "addressLine",
    label: "Address Line",
  },
  {
    value: "city",
    label: "City",
  },
  {
    value: "pincode",
    label: "Pincode",
  },
] as const;
