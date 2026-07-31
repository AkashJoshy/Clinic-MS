import { createDoctorPersonalDetailsFields, createLocationFields, fieldGenerator } from "./base.data";
import type { DoctorFormData } from "@/schemas/clinic/clinic.schema";
import type { FormInputs } from "@/types/common";
// import type { Department } from "@/types/clinic";

export const ADD_DOCTOR_FORM_INPUTS_1 = createDoctorPersonalDetailsFields<DoctorFormData>()
export const EDIT_DOCTOR_FORM_INPUTS_1 = createDoctorPersonalDetailsFields<DoctorFormData>().map(inp => {
  if (inp.name === "email") {
    inp.isDisabled=true
  } else if (inp.name === "password") {
    inp.hidden = true
  }


  return inp
})

export const DOCTOR_FORM_INPUTS_1: FormInputs<DoctorFormData>[] = [
  fieldGenerator<DoctorFormData>(
    "Address Line",
    "text",
    "Street address, building, floor...",
    "addressLine",
    true,
  ),
  fieldGenerator<DoctorFormData>(
    "Country",
    "select",
    "Select country",
    "country",
    true,
    false,
    undefined,
  ),
  fieldGenerator<DoctorFormData>(
    "State / Province",
    "select",
    "Select state",
    "state",
    true,
    false,
    undefined,
  ),
  fieldGenerator<DoctorFormData>(
    "City",
    "select",
    "Select city",
    "city",
    true,
    false,
    undefined,
  ),
  fieldGenerator<DoctorFormData>(
    "PIN / ZIP Code",
    "text",
    "682001",
    "pincode",
    true,
  ),
];

export const DOCTOR_FORM_INPUTS_2: FormInputs<DoctorFormData>[] = [
  fieldGenerator<DoctorFormData>(
    "Specialty",
    "select",
    "Select specialty",
    "specialty",
    true,
    false,
    undefined,
    [
      "Emergency",
      "ICU",
      "OPD",
      "Inpatient",
      "Outpatient",
      "Surgical",
      "Diagnostics",
    ],
  ),
  fieldGenerator<DoctorFormData>(
    "Qualification",
    "text",
    "MBBS",
    "qualification",
    true,
  ),
  fieldGenerator<DoctorFormData>(
    "Years of Experience",
    "tel",
    "0",
    "experienceYears",
    true,
  ),
  fieldGenerator<DoctorFormData>(
    "Consultation Fees (₹)",
    "tel",
    "500",
    "consultationFees",
    true,
  ),
  fieldGenerator<DoctorFormData>(
    "Licence Number",
    "text",
    "MCI-KL-2015-00123",
    "licenceNumber",
    true,
  ),
  fieldGenerator<DoctorFormData>(
    "Licence Document",
    "file",
    "Click to upload licence document",
    "licenceDocument",
    true,
    false,
    undefined,
    ["application/pdf", "image/jpeg", "image/png"],
  ),
  fieldGenerator<DoctorFormData>(
    "Available Days",
    "multi-select-days",
    "",
    "availabilityDays",
    true,
    false,
    undefined,
    [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ],
  ),
  fieldGenerator<DoctorFormData>(
    "Available Time Slots",
    "multi-select-slots",
    "",
    "availabilitySlots",
    true,
    false,
    undefined,
    [
      "8:00–8:30",
      "8:30–9:00",
      "9:00–9:30",
      "9:30–10:00",
      "10:00–10:30",
      "10:30–11:00",
      "11:00–11:30",
      "11:30–12:00",
      "12:00–12:30",
      "14:00–14:30",
      "14:30–15:00",
      "15:00–15:30",
      "15:30–16:00",
      "16:30–17:00",
      "17:00–17:30",
      "17:30–18:00",
      "18:00–18:30",
      "18:30–19:00",
      "19:00–19:30",
      "19:30–20:00",
    ],
  ),
];

export const buildDoctorFormInputs1 = (
  departments: Department[],
): FormInputs<DoctorFormData>[] => [
  fieldGenerator<DoctorFormData>(
    "Department",
    "select",
    "Choose department...",
    "departmentId",
    true,
    false,
    undefined,
    departments.map((d) => ({ label: d.name, value: d.id })),
  ),
  ...DOCTOR_FORM_INPUTS_2,
];

export const BASIC_INFO_FIELDS_1: FormInputs<Step1FormData>[] = [
  fieldGenerator<Step1FormData>(
    "Clinic Name",
    "text",
    "e.g. City Care Clinic",
    "clinicName",
    true,
  ),
  fieldGenerator<Step1FormData>(
    "Clinic Type",
    "select",
    "Select type",
    "clinicType",
    true,
    false,
    undefined,
    ["ONLINE", "OFFLINE", "BOTH"],
  ),
  fieldGenerator<Step1FormData>(
    "Tagline",
    "text",
    "A short tagline",
    "tagline",
    false,
  ),
  fieldGenerator<Step1FormData>(
    "Registration Number",
    "text",
    "e.g. REG123456",
    "registrationNumber",
    true,
  ),
  fieldGenerator<Step1FormData>(
    "About",
    "textarea",
    "Describe your clinic...",
    "about",
    false,
  ),
];

export const BASIC_INFO_FIELDS_2: FormInputs<Step1FormData>[] = [
  fieldGenerator<Step1FormData>(
    "Year Established",
    "text",
    "e.g. 2005",
    "yearEstablished",
    true,
  ),
];

export const CONTACT_INFO_FIELDS: FormInputs<Step1FormData>[] = [
  fieldGenerator<Step1FormData>(
    "Contact Name",
    "text",
    "Owner Name",
    "fullName",
    true,
  ),
  fieldGenerator<Step1FormData>(
    "Email",
    "email",
    "clinic@example.com",
    "email",
    true,
  ),
  fieldGenerator<Step1FormData>(
    "Phone",
    "text",
    "10-digit number",
    "phone",
    true,
  ),
  fieldGenerator<Step1FormData>(
    "Alternative Phone",
    "text",
    "Optional",
    "altPhone",
    false,
  ),
  fieldGenerator<Step1FormData>(
    "Password",
    "password",
    "Min. 8 characters",
    "password",
    true,
  ),
  fieldGenerator<Step1FormData>(
    "Confirm Password",
    "password",
    "Re-enter password",
    "confirmPassword",
    true,
  ),
] as const;

export const LOCATION_FIELDS: FormInputs<Step2FormData>[] = [
  ...createLocationFields<Step2FormData>(),
  fieldGenerator<Step2FormData>(
    "Latitude",
    "text",
    "Clinic's Latitude",
    "latitude",
    true,
    true
  ),
  fieldGenerator<Step2FormData>(
    "Longitude",
    "text",
    "Clinic's Longitude",
    "longitude",
    true,
    true
  ),
];

export const DOC_FIELDS: FormInputs<Step2FormData>[] = [
  fieldGenerator<Step2FormData>(
    "Clinic Registration Doc",
    "file",
    "PDF, JPG, PNG",
    "clinicRegistrationDoc",
    true,
  ),
  fieldGenerator<Step2FormData>(
    "Medical Establishment Doc",
    "file",
    "PDF, JPG, PNG",
    "medicalEstablishmentDoc",
    true,
  ),
  fieldGenerator<Step2FormData>(
    "ID Proof",
    "file",
    "PDF, JPG, PNG",
    "idProofDoc",
    true,
  ),
];