import {
  ALLOWED_DOC_TYPES,
  ALLOWED_IMG_TYPES,
  BLOODGROUPS,
  GENDER,
  RELATIONS,
  ROLES,
} from "@/constants/form-fields.constants";
import * as z from "zod";

export const email = z
  .email("Please enter a valid email address.")
  .trim()
  .refine((val) => {
    const [prefix, ...syn] = val.split("@");
    return prefix.length >= 3;
  }, "Please enter a valid email address.");

export const phone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number.");

export const altPhone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number.")
  .optional();

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[A-Z]/, "Must contain one uppercase letters")
  .regex(/[0-9]/, "Must contain one number")
  .regex(/^\S*$/, "Password cannot contain spaces");

export const otp = z
  .string()
  .length(6, "OTP must be 6 digits")
  .regex(/^\d+$/, "OTP must be numeric");

export const role = z.enum(ROLES, {
  message: "Please select a role",
});

export const gender = z.enum(GENDER, {
  message: "Please select a gender",
});

export const withPasswordConfirm = (schema: z.ZodObject<any>) => {
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
};

export const fullName = z
  .string()
  .trim()
  .min(3, "Full name must be at least 3 characters long.");

export const strOptional = z.string().optional();

export const yearEstablished = z
  .string()
  .min(4, "Enter valid year")
  .max(4, "Enter valid year")
  .refine((val) => {
    const year = Number(val);
    return year >= 1900 && year <= new Date().getFullYear();
  }, "Enter a valid year");

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
    .refine((file) => {
  console.log(file?.type);
  console.log(ALLOWED_DOC_TYPES.includes(file?.type));
  return ALLOWED_DOC_TYPES.includes(file?.type);
}, {
  message: "Only PDF, JPG, PNG allowed",
})
    // .refine((file) => ALLOWED_DOC_TYPES.includes(file?.type), {
    //   message: "Only PDF, JPG, PNG allowed",
    // });

export const pictureField = (
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
    .refine((file) => ALLOWED_IMG_TYPES.includes(file?.type), {
      message: "Only JPG, PNG, WEBP allowed",
    });

export const country = z.string().min(1, "Please select a country");

export const relation = z.enum(RELATIONS, {
  message: "Select the relation",
});

export const bloodGroup = z.enum(BLOODGROUPS, {
  message: "Select the blood group",
});

export const state = z.string().min(1, "Please select a state");

export const city = z.string().min(1, "Please select a city");

export const district = z.string().trim().min(1, "District is required ");

export const pincode = z
  .string()
  .trim()
  .min(6, "Invalid PIN/ZIP")
  .max(12, "Invalid PIN/ZIP")
  .regex(/^[A-Z0-9\s\-]{4,10}$/i, "Invalid PIN/ZIP format");

export const addressLine = z
  .string()
  .min(1, "AddressLine is required")
  .min(10, "Please enter a complete address");

export const latitude = z
  .string()
  .min(1, "Longitude is required")
  .refine((val) => !val || /^-?\d+(\.\d+)?$/.test(val), {
    message: "Invalid latitude",
  });

export const longitude = z
  .string()
  .min(1, "Longitude is required")
  .refine((val) => !val || /^-?\d+(\.\d+)?$/.test(val), {
    message: "Invalid longitude",
  });

export const bio = z
  .string()
  .trim()
  .max(1000, "Bio cannot exceed 1000 characters")
  .optional()
  .or(z.literal(""));

export const mode = z.enum(["ONLINE", "OFFLINE", "BOTH"], {
  message: "Select a consultation mode",
});

export const consultationFee = z.coerce
  .number("Consulation fee is required")
  .min(200, "Consultation fee must be at least ₹200")
  .max(1000, "Consultation fee must not exceed ₹1000");
