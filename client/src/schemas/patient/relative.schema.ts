import { z } from "zod";
import { addressLine, bloodGroup, city, country, fullName, pincode, relation, state } from "../base.schema";
import { GENDER } from "@/constants/form-fields.constants";


export const relativeSchema = z.object({
  name: fullName,
  userId: z.string().min(1, "Patient is required"),
  relation: relation,
  bloodGroup: bloodGroup,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(GENDER, {
    message: "Gender is required",
  }),
  allergies: z.array(z.string().trim()).default([]),
  chronicConditions: z.array(z.string().trim()).default([]),
  addressOption: z.enum(["PRIMARY", "NEW"], {
    message: "Please select an address option.",
  }),
  addressLine,
  country,
  state,
  city,
  pincode,
})

