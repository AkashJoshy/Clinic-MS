import { z } from "zod";
import {
  about,
  addressLine,
  city,
  country,
  departmentIds,
  email,
  fullName,
  latitude,
  longitude,
  password,
  phone,
  pincode,
  registrationNumber,
  state,
  year as yearEstablished,
} from "../base.schema.ts";

export const clinicRegisterSchema = z
  .object({
    clinicName: fullName,
    clinicType: z.enum(["ONLINE", "OFFLINE", "BOTH"]),
    tagline: z
      .string()
      .trim()
      .max(150, "Tagline cannot exceed 150 characters")
      .optional()
      .or(z.literal("")),
    registrationNumber,
    about,
    departmentIds,
    yearEstablished,
    fullName,
    email,
    phone,
    altPhone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
      .optional()
      .or(z.literal("")),
    password,
    confirmPassword: z.string(),
    country,
    state,
    city,
    pincode,
    addressLine,
    latitude,
    longitude,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
