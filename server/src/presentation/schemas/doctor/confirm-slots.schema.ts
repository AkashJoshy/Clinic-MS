import { z } from "zod";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";
import { DAYS } from "../../../domain/constants/doctor.constants.ts";
import { SLOT_STATUS } from "../../../domain/constants/status.constants.ts";

const generatedSlotSchema = z.object({
  startTime: z.string().regex(
    /^([01]\d|2[0-3]):[0-5]\d$/,
    "Invalid start time. Use HH:mm format.",
  ),
  endTime: z.string().regex(
    /^([01]\d|2[0-3]):[0-5]\d$/,
    "Invalid end time. Use HH:mm format.",
  ),
  mode: z.enum(SERVICE_MODE),
  status: z.enum(SLOT_STATUS),
});

const slotsWithDateSchema = z.object({
  date: z.iso.date(),
  dayOfWeek: z.enum(DAYS),
  message: z.string().min(1, "Message is required"),
  slots: z.array(generatedSlotSchema),
});

export const confirmedSlotsSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
  clinicId: z.string().min(1, "Clinic ID is required"),
  generatedSlots: z.array(slotsWithDateSchema),
});
