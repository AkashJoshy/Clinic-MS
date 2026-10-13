import { DAY_NAMES } from "@/constants/doctor.constant";
import { z } from "zod";

const shiftSchema = z.object({
  id: z.string(),
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
  sessionDuration: z
    .number()
    .positive()
    .min(5, "Session duration must be at least 5 minutes.")
    .max(180, "Session duration cannot exceed 180 minutes."),
  slotInterval: z.enum(["AUTO", "FIXED"], {
    message: "Please select a valid slot interval.",
  }),
  bufferTime: z
    .number()
    .min(0, "Buffer time cannot be negative.")
    .max(60, "Buffer time cannot exceed 60 minutes."),
  maxSessionsPerDay: z
    .number()
    .int("Maximum sessions per day must be a whole number.")
    .min(1, "Maximum sessions per day must be at least 1.")
    .max(50, "Maximum sessions per day cannot exceed 50."),
  minAdvanceNotice: z
    .number()
    .int("Minimum advance notice must be a whole number of minutes.")
    .min(0, "Minimum advance notice cannot be negative.")
    .max(10080, "Minimum advance notice cannot exceed 7 days."),
  bookingWindow: z
    .number()
    .int("Booking window must be a whole number of days.")
    .min(1, "Booking window must be at least 1 day.")
    .max(365, "Booking window cannot exceed 365 days."),
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

export const scheduleFormSchema = z.object({
  doctorClinicId: z.string().min(1, "doctorClinicId is required"),
  doctorId: z.string().min(1, "doctorId is required"),
  clinicId: z.string().min(1, "clinicId is required"),
  weeklySchedule: weeklyScheduleSchema,
  slotRules: slotRulesSchema,
  exceptions: exceptionsSchema,
});
