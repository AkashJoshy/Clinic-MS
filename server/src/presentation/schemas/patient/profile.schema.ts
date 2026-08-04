import { z } from "zod";
import {
  optionalStrOfArray as allergies,
  optionalStrOfArray as chronicConditions,
  bloodGroup,
  fullName,
  gender,
  relation,
  addressOption,
  addressLine,
  country,
  state,
  city,
  pincode,
  dateOfBirth,
  phone,
  email,
  documentField,
} from "../base.schema.ts";
import { FILE_SIZE_2MB, FILE_SIZE_5MB } from "../../../domain/constants/user.constants.ts";

export const createPatientProfileSchema = z.object({
  name: fullName,
  dateOfBirth,
  userId: z.string().trim().min(1, {
    message: "User ID is required",
  }),
  relation,
  bloodGroup,
  gender,
  allergies,
  chronicConditions: chronicConditions,
  addressOption: addressOption,
  addressLine: addressLine,
  country: country,
  state: state,
  city: city,
  pincode: pincode,
});


export const updatePersonalDetailsSchema = z.object({
  displayName: fullName,
  email,
  phone,
  dateOfBirth,
  gender,
  bloodGroup,
  allergies,
  chronicConditions
});

const ALLOWED_IMG_TYPES = ["image/jpeg", "image/png", "image/webp"] as const
export const updatePersonalProfilePictureSchema = z.object({
  profilePicture: z
    .instanceof(File, {
      message: "Profile picture is required",
    })
    .refine((file) => ALLOWED_IMG_TYPES.includes(file.type as any), {
      message: "Only JPG, PNG and WEBP images are allowed",
    })
    .refine((file) => file.size <= FILE_SIZE_5MB, {
      message: "Image size must be less than 5MB",
    }),
});

