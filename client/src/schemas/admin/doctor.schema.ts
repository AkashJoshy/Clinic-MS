import { DOCUMENT_REJECTION_REASONS } from "@/constants/admin.constant";
import { z } from "zod";

export const rejectDoctorSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
  rejectedReason: z.enum(DOCUMENT_REJECTION_REASONS),
  rejectedMessage: z
    .string()
    .trim()
    .max(500, "Rejection message cannot exceed 500 characters")
    .optional(),
  fields: z.array(z.string()).default([]),
});

