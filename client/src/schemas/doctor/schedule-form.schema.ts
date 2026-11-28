import { DAY_NAMES } from "@/constants/doctor.constant";
import { z } from "zod";

const shiftSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  mode: z.enum(["ONLINE", "OFFLINE", "BOTH"]),
});

const weeklyScheduleSchema = z
  .array(
    z.object({
      dayOfWeek: z.enum(DAY_NAMES),
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
  maxTokensPerDay: z
    .number("Maximum tokens per day must be a valid number.")
    .int("Maximum tokens must be a whole number.")
    .min(1, "At least 1 token is required.")
    .max(100, "Maximum tokens cannot exceed 100."),
  autoConfirmBookings: z.boolean(),
  allowReschedule: z.boolean(),
});

export const breakSchema = z.object({
  label: z.string().trim().min(1, "Break label is required."),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid start time."),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time."),
});

export const holidaySchema = z.object({
  reason: z.string().trim().min(1, "Holiday reason is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
});

export const blackoutSchema = z.object({
  reason: z.string().trim().min(1, "Reason is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
});

export const overrideSchema = z.object({
  date: z.string().min(1, "Date is required."),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid start time."),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time."),
});

export const exceptionsSchema = z.object({
  breaks: z.array(breakSchema),
  holidays: z.array(holidaySchema),
  blackouts: z.array(blackoutSchema),
  overrides: z.array(overrideSchema),
});

export const scheduleFormSchema = z.object({
  doctorClinicId: z.string().min(1, "doctorClinicId is required"),
  doctorId: z.string().min(1, "doctorId is required"),
  clinicId: z.string().min(1, "clinicId is required"),
  weeklySchedule: weeklyScheduleSchema,
  slotRules: slotRulesSchema,
  exceptions: exceptionsSchema,
});
