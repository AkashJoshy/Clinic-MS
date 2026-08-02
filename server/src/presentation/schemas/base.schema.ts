import * as z from "zod";
import {
  ALLOWED_DOC_TYPES,
  USER_ROLES,
} from "../../domain/constants/user.constants.ts";
import {
  BLOODGROUPS,
  GENDER,
  RELATIONSTOSCHEMA,
} from "../../domain/constants/patient.constants.ts";

export const email = z
  .email("Please enter a valid email address.")
  .trim()
  .toLowerCase()
  .refine((val) => {
    const [prefix, ...syn] = val.split("@");
    return prefix ? prefix.length >= 3 : false;
  }, "Please enter a valid email address.");

export const fullName = z
  .string()
  .trim()
  .min(3, {
    message: "Full name must be at least 3 characters",
  })
  .max(50, {
    message: "Full name cannot exceed 20 characters",
  });

export const gender = z.enum(GENDER, {
  message: "Please select a gender",
});

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[A-Z]/, "Must contain one uppercase letters")
  .regex(/[0-9]/, "Must contain one number")
  .regex(/^\S*$/, "Password cannot contain spaces");

export const role = z.enum(USER_ROLES, {
  message: "Invalid user role",
});

export const phone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number.");

export const altPhone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number.")
  .optional();

export const token = z.string().trim().min(1, {
  message: "Token is required",
});

export const otp = z
  .string()
  .trim()
  .length(6, {
    message: "OTP must be 6 digits",
  })
  .regex(/^\d+$/, {
    message: "OTP must contain only numbers",
  });

export const departmentStatus = z.enum(["ACTIVE", "INACTIVE"], {
  message: "Invalid department status",
});

export const relation = z.enum(RELATIONSTOSCHEMA, {
  message: "Invalid relation",
});

export const bloodGroup = z.enum(BLOODGROUPS, {
  message: "Invalid blood group",
});

export const optionalStrOfArray = z.array(z.string()).default([]);

export const addressOption = z.enum(["PRIMARY", "NEW"], {
  message: "Invalid address option",
});

export const addressLine = z.string().trim().min(5, {
  message: "Address must be at least 5 characters",
});

export const dateOfBirth = z.iso.date({
  message: "Invalid date of birth",
});

export const country = z.string().trim().min(1, {
  message: "Country is required",
});

export const state = z.string().trim().min(1, {
  message: "Country is required",
});

export const city = z.string().trim().min(1, {
  message: "Country is required",
});

export const pincode = z
  .string()
  .trim()
  .min(6, "Invalid PIN/ZIP")
  .max(12, "Invalid PIN/ZIP")
  .regex(/^[A-Z0-9\s\-]{4,10}$/i, "Invalid PIN/ZIP format");

export const registrationNumber = z
  .string()
  .trim()
  .min(1, "Registration number is required");

export const about = z
  .string()
  .trim()
  .min(1, "About must be at least 10 characters")
  .max(1000, "About cannot exceed 1000 characters");

export const departmentId = z
  .string().min(1, "Select a Department")

export const year = z
  .string()
  .regex(/^\d{4}$/, "Enter a valid year")
  .refine(
    (year) => {
      const currentYear = new Date().getFullYear();
      const value = Number(year);
      return value >= 1900 && value <= currentYear;
    },
    {
      message: "Enter a valid establishment year",
    },
  );

export const latitude = z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid latitude");

export const longitude = z
  .string()
  .regex(/^-?\d+(\.\d+)?$/, "Invalid longitude");

export const documentField = (
  fieldName: string,
  maxSize: number,
  size: number,
) =>
  z
    .any()
    .refine((file) => file instanceof File, `${fieldName} is required`)
    .refine((file) => file?.size <= maxSize, {
      message: `Max file size is ${size}MB`,
    })
    .refine((file) => ALLOWED_DOC_TYPES.includes(file?.type), {
      message: "Only PDF, JPG, PNG allowed",
    });

export const bio = z
  .string()
  .trim()
  .max(1000, "Bio cannot exceed 1000 characters")
  .optional()
  .or(z.literal(""));

export const mode = z.enum(["ONLINE", "OFFLINE", "BOTH"], {
  message: "Invalid consultation mode",
});

export const consultationFee = z.coerce
      .number("Consulation fee is required")
      .min(200, "Consultation fee must be at least ₹200")
      .max(1000, "Consultation fee must not exceed ₹1000")
