import * as z from "zod";
import {
  bio,
  experienceYears,
  gender,
  licenceNumber,
  qualification,
  specialization,
} from "../base.schema.ts";

export const professionalDetailsSchema = z.object({
  id: z.string().min(1, "Doctor Id is required"),
  gender,
  experienceYears,
  bio,
  licenceNumber,
  qualification,
  specialization,
  languages: z.array(z.string()),
});
