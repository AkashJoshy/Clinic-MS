import { BreakSchema } from "./break.schema.ts";
import { ScheduleExceptionSchema } from "./schedule-exception.schema.ts";
import { OneTimeAvailabilitySchema } from "./one-time-availability.schema.ts";
import { Schema } from "mongoose";
import type { IPersistenceExceptions } from "./doctor.clinic.types.ts";

export const ExceptionsSchema = new Schema<IPersistenceExceptions>(
  {
    breaks: [BreakSchema],
    blackouts: [ScheduleExceptionSchema],
    holidays: [ScheduleExceptionSchema],
    overrides: [OneTimeAvailabilitySchema],
  },
  {
    _id: false,
  },
);