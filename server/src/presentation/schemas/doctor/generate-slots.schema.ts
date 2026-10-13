import { z } from "zod";
import { DAYS } from "../../../domain/constants/doctor.constants.ts";
import { shiftSchema } from "../base.schema.ts";


const weeklyScheduleSchema = z
  .array(
    z.object({
      dayOfWeek: z.enum(DAYS),
      shifts: z.array(shiftSchema),
    }),
  )
  .superRefine((arg, ctx) => {
    const scheduleLength = arg.reduce(
      (acc, currentSchedule) => acc + currentSchedule.shifts.length,
      0,
    );
    if (scheduleLength <= 0) ctx.addIssue("Please Select atleast one schedule");
  });

const slotRulesSchema = z.object({
  sessionDuration: z.number().positive(),
  slotInterval: z.enum(["AUTO", "FIXED"]),
  bufferTime: z.number().min(0),
  maxSessionsPerDay: z.number().positive(),
  minAdvanceNotice: z.number().min(0),
  bookingWindow: z.number().positive(),
  autoConfirmBookings: z.boolean(),
  allowReschedule: z.boolean(),
});

const exceptionsSchema = z.object({
  breaks: z.array(z.any()),
  holidays: z.array(z.any()),
  blackouts: z.array(z.any()),
  overrides: z.array(z.any()),
  vacations: z.array(z.any()),
});

export const generateSlotsSchema = z.object({
  doctorId: z
    .string({
      error: "Doctor information is missing. Please refresh and try again.",
    })
    .min(1, "Doctor ID is required."),
  clinicId: z
    .string({
      error:
        "Clinic information is missing. Please select a clinic and try again.",
    })
    .min(1, "Clinic ID is required."),
  weeklySchedule: weeklyScheduleSchema,
  slotRules: slotRulesSchema,
  exceptions: exceptionsSchema,
});
