import * as z from "zod";
import {
  addressLine,
  altPhone,
  city,
  country,
  documentField,
  email,
  fullName,
  gender,
  latitude,
  longitude,
  password,
  phone,
  pictureField,
  pincode,
  state,
  withPasswordConfirm,
} from "../base.schema";
import { FILE_SIZE_2MB, FILE_SIZE_5MB } from "@/constants/clinical-registration.constant";

export const doctorRegisterStep1Schema = withPasswordConfirm(
  z.object({
    fullName,
    email,
    phone,
    bio: z.string().trim(),
    gender: gender,
    department: z.string().trim().min(1, "Please select a department"),
    specialization: z
      .string()
      .trim()
      .min(3, "Specialization must be at least 3 characters")
      .max(100, "Specialization must not exceed 100 characters"),
    qualification: z
      .string()
      .trim()
      .min(3, "Qualification must be at least 3 characters")
      .max(150, "Qualification must not exceed 150 characters"),
    experienceYears: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce
        .number("Please enter your years of experience")
        .min(0, "Experience cannot be negative")
        .max(60, "Experience cannot exceed 60 years"),
    ),
    licenceNumber: z
      .string()
      .trim()
      .min(3, "License number must be at least 3 characters")
      .max(50, "License number must not exceed 50 characters"),
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
  altPhone: altPhone,
  addressLine,
  country,
  state,
  city,
  pincode,
  longitude,
  latitude,
  mode: z.enum(["Online", "Offline", "Both"], {
    message: "Please select a consultation mode",
  }),
  consultationFee: z.coerce
      .number("Consulation fee is required")
      .min(200, "Consultation fee must be at least ₹200")
      .max(1000, "Consultation fee must not exceed ₹1000"),

});

export const doctorRegisterStep3Schema = z.object({
  doctorProfilePicture: pictureField("Doctor Profile Picture", FILE_SIZE_2MB, 2),
  clinicRegistrationDoc: documentField("Clinic Registration Document", FILE_SIZE_5MB, 5),
  establishmentLicenceDoc: documentField("Establishment Licence Document", FILE_SIZE_5MB, 5),
  medicalLicenceDoc: documentField("Medical Licence Document", FILE_SIZE_5MB, 5),
  doctorRegistrationDoc: documentField("Doctor Registration Document", FILE_SIZE_5MB, 5),
});
