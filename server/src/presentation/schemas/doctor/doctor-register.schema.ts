import { z } from "zod";
import {
  addressLine,
  altPhone,
  bio,
  city,
  consultationFee,
  country,
  departmentId,
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
  pincode,
  qualification,
  registrationNumber,
  specialization,
  state,
} from "../base.schema.ts";

export const doctorRegistrationSchema = z
  .object({
    fullName,
    email,
    phone,
    bio,
    gender,
    departmentId,
    specialization,
    qualification,
    experienceYears,
    licenceNumber,
    password,
    confirmPassword: password,
    clinicName: fullName,
    registrationNumber,
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
    latitude,
    longitude,
    mode,
    consultationFee,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
