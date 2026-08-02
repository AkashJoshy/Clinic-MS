import type { FormInputs } from "@/types/common";
import { fieldGenerator } from "./base.data";
import type {
  DoctorRegisterStep2FormData,
  DoctorRegisterStep3FormData,
} from "@/schemas/doctor/doctor.schema";

export const DOCTOR_STEP1_INPUTS: FormInputs[] = [
  fieldGenerator("Full Name", "text", "e.g. John Doe", "fullName", true),

  fieldGenerator("Email Address", "email", "doctor@example.com", "email", true),

  fieldGenerator("Phone Number", "text", "+91 98765 43210", "phone", true),

  fieldGenerator(
    "Bio",
    "textarea",
    "Tell us about your medical background and expertise...",
    "bio",
    false,
  ),

  fieldGenerator(
    "Gender",
    "select",
    "Select gender",
    "gender",
    true,
    undefined,
    undefined,
    [{ label: "Male", value: "MALE" }, { label: "Female", value: "FEMALE" }, { label: "Others", value: "OTHERS" }, { label: "Prefer Not To Say", value: "PREFER NOT TO SAY" }],
  ), 
  fieldGenerator(
    "Specialization",
    "text",
    "e.g. Pediatric Cardiology",
    "specialization",
    true,
  ),

  fieldGenerator(
    "Qualification",
    "text",
    "e.g. MBBS, MD",
    "qualification",
    true,
  ),

  fieldGenerator("Experience", "text", "e.g. 5", "experienceYears", true),

  fieldGenerator(
    "Medical License Number",
    "text",
    "e.g. MED-2023-00123",
    "licenceNumber",
    true,
  ),

  fieldGenerator("Password", "password", "Min. 8 characters", "password", true),

  fieldGenerator(
    "Confirm Password",
    "password",
    "Re-enter password",
    "confirmPassword",
    true,
  ),
];

export const DOCTOR_STEP2_INPUTS: FormInputs<DoctorRegisterStep2FormData>[] = [
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Clinic Name",
    "text",
    "e.g. Apollo Health Clinic",
    "clinicName",
    true,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Registration Number",
    "text",
    "e.g. MH-2023-00123",
    "registrationNumber",
    true,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "About Clinic",
    "textarea",
    "Describe your clinic and services...",
    "about",
    false,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Alternative Phone",
    "text",
    "+91 98765 43210",
    "altPhone",
    false,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Address",
    "text",
    "Enter clinic address",
    "addressLine",
    true,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Country",
    "select",
    "Select country",
    "country",
    true,
    undefined,
    undefined,
    [],
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "State",
    "select",
    "Select state",
    "state",
    true,
    undefined,
    undefined,
    [],
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "City",
    "select",
    "Select city",
    "city",
    true,
    undefined,
    undefined,
    [],
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Pincode",
    "text",
    "e.g. 682001",
    "pincode",
    true,
  ),

  fieldGenerator<DoctorRegisterStep2FormData>(
    "Latitude",
    "number",
    "e.g. 9.9312",
    "latitude",
    true,
    true,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Longitude",
    "number",
    "e.g. 76.2673",
    "longitude",
    true,
    true,
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Consultation Mode",
    "select",
    "Select consultation mode",
    "mode",
    true,
    undefined,
    undefined,
    [{ label: "Online", value: "ONLINE" }, { label:"Offline", value: "OFFLINE" }, { label: "Both", value: "BOTH" }],
  ),
  fieldGenerator<DoctorRegisterStep2FormData>(
    "Consultation Fee",
    "number",
    "e.g. 500",
    "consultationFee",
    true,
  ),
  fieldGenerator(
    "Department",
    "select",
    "Select department",
    "departmentId",
    true,
    undefined,
    undefined,
  ),
];

export const DOCTOR_STEP3_INPUTS: FormInputs<DoctorRegisterStep3FormData>[] = [
  fieldGenerator<DoctorRegisterStep3FormData>(
    "Doctor Profile Picture",
    "file",
    "Upload profile picture",
    "doctorProfilePicture",
    true,
  ),

  fieldGenerator<DoctorRegisterStep3FormData>(
    "Clinic Registration Document",
    "file",
    "Upload clinic registration document",
    "clinicRegistrationDoc",
    true,
  ),

  fieldGenerator<DoctorRegisterStep3FormData>(
    "Establishment Licence Document",
    "file",
    "Upload establishment licence document",
    "establishmentLicenceDoc",
    true,
  ),

  fieldGenerator<DoctorRegisterStep3FormData>(
    "Medical Licence Document",
    "file",
    "Upload medical licence document",
    "medicalLicenceDoc",
    true,
  ),

  fieldGenerator<DoctorRegisterStep3FormData>(
    "Doctor Registration Document",
    "file",
    "Upload doctor registration document",
    "doctorRegistrationDoc",
    true,
  ),
];
