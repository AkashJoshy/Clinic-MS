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
} from "../base.schema.ts";
import { FILE_SIZE_2MB } from "../../../domain/constants/user.constants.ts";

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
  chronicConditions,
  addressOption,
  addressLine,
  country,
  state,
  city,
  pincode,
});

export const updatePersonalDetailsSchema = z.object({
  displayName: fullName,
  email,
  phone,
  dateOfBirth,
  gender,
  bloodGroup,
  allergies,
  chronicConditions,
});

