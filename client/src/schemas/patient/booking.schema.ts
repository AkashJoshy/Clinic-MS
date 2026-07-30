import { z } from "zod";

export const bookingSchema = z.object({
  departmentId: z.string().min(1, "Please select a department"),
  doctorId: z.string().min(1, "Please select a doctor"),
  reason: z.string().min(3, "Reason must be at least 3 characters"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});


