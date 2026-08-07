import { z } from "zod";
import { addressLine, altPhone, bio, city, consultationFee, country, departmentId, email, fullName, gender, latitude, longitude, mode, password, phone, pincode, state } from "../base.schema.ts";

export const doctorRegistrationSchema = z
  .object({
    fullName,
    email,
    phone,
    bio,
    gender,
    departmentId,
    specialization: z
      .string()
      .trim()
      .min(2, "Specialization is required")
      .max(100, "Specialization is too long"),
    qualification: z
      .string()
      .trim()
      .min(2, "Qualification is required")
      .max(200, "Qualification is too long"),
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
      .min(3, "Licence number is required")
      .max(50, "Licence number is too long"),
    password,
    confirmPassword: password,
    clinicName: fullName,
    registrationNumber: z
    .string()
    .trim()
    .min(3, "Registration number must be at least 3 characters")
    .max(50, "Registration number must not exceed 50 characters"),
    about:z
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
    latitude,
    longitude,
    mode,
    consultationFee,
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );