import { z } from "zod";
import { bloodGroup, documentField, email, fullName, phone } from "../base.schema";
import { GENDER } from "@/constants/form-fields.constants";
import { FILE_SIZE_2MB, FILE_SIZE_5MB } from "@/constants/clinical-registration.constant";

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
  chronicConditions: z.array(z.string().trim())
})

export const updatePersonalProfilePictureSchema = z.object({
  profilePicture: documentField("profilePicture", FILE_SIZE_2MB, 2)
});

