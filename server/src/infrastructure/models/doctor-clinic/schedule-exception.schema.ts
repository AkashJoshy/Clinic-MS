import { Schema } from "mongoose";
import type { IPersistenceSchedule } from "./doctor.clinic.types.ts";

export const ScheduleExceptionSchema = new Schema<IPersistenceSchedule>(
  {
    reason: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  },
);