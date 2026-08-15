import * as z from "zod";
import { consultationFee, mode, slotDuration } from "../base.schema.ts";

export const consultationDetailsSchema = z.object({
  id: z.string().min(1, "Doctor Id is required"),
  doctorId: z.string().min(1, "Doctor Clinic Id is required"),
  clinicId: z.string().min(1, "Clinic Id is required"),
  consultationFee,
  type: mode, 
  slotDuration,
  timeZone: z.string().min(1, "TimeZone is required"),
  isActive: z.boolean(),
});
