import * as z from "zod";
import {
  addressLine,
  altPhone,
  bio,
  city,
  consultationFee,
  country,
  documentField,
  email,
  experienceYears,
  fullName,
  gender,
  latitude,
  licenceNumber,
  longitude,
  mode,
  password,
  phone,
  pictureField,
  pincode,
  qualification,
  specialization,
  state,
  withPasswordConfirm,
} from "../base.schema";
import {
  FILE_SIZE_2MB,
  FILE_SIZE_5MB,
} from "@/constants/clinical-registration.constant";

export const doctorRegisterStep1Schema = withPasswordConfirm(
  z.object({
    fullName,
    email,
    phone,
    bio,
    gender,
    specialization,
    qualification,
    experienceYears,
    licenceNumber,
    password,
    confirmPassword: password,
  }),
);

export const doctorRegisterStep2Schema = z.object({
  clinicName: fullName,
  registrationNumber: z
    .string()
    .trim()
    .min(3, "Registration number must be at least 3 characters")
    .max(50, "Registration number must not exceed 50 characters"),
  about: z
    .string()
    .trim()
    .max(500, "About clinic must not exceed 500 characters")
    .optional(),
  altPhone,
  addressLine,
  country,
  state,
  city,
  pincode,
  longitude,
  latitude,
  mode,
  consultationFee,
  departmentId: z.string().trim().min(1, "Please select a department"),
});

export const doctorRegisterStep3Schema = z.object({
  doctorProfilePicture: pictureField(
    "Doctor Profile Picture",
    FILE_SIZE_2MB,
    2,
  ),
  clinicRegistrationDoc: documentField(
    "Clinic Registration Document",
    FILE_SIZE_5MB,
    5,
  ),
  establishmentLicenceDoc: documentField(
    "Establishment Licence Document",
    FILE_SIZE_5MB,
    5,
  ),
  medicalLicenceDoc: documentField(
    "Medical Licence Document",
    FILE_SIZE_5MB,
    5,
  ),
  doctorRegistrationDoc: documentField(
    "Doctor Registration Document",
    FILE_SIZE_5MB,
    5,
  ),
});
