import { z } from "zod";
import {
  bloodGroup,
  documentField,
  email,
  fullName,
  phone,
  relation,
} from "../base.schema";
import { GENDER } from "@/constants/form-fields.constants";
import {
  FILE_SIZE_2MB,
  FILE_SIZE_5MB,
} from "@/constants/clinical-registration.constant";

export const personalDetailsSchema = z.object({
  id: z.string().min(1, "id is required"),
  displayName: fullName,
  email: email,
  phone: phone,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(GENDER, {
    message: "Gender is required",
  }),
  bloodGroup: bloodGroup,
  allergies: z.array(z.string().trim()),
  chronicConditions: z.array(z.string().trim()),
});

export const updatePersonalProfilePictureSchema = z.object({
  profilePicture: documentField("profilePicture", FILE_SIZE_2MB, 2),
});

export const EmergencyDetailsSchema = z.object({
  id: z.string().min(1, "Patient Id is required"),
  name: fullName,
  phone: phone,
  relationship: relation,
});
