import { Schema } from "mongoose";
import type { IPersistenceWeeklySchedule } from "./doctor.clinic.types.ts";
import { ShiftSchema } from "./shift.schema.ts";
import { DAYS } from "../../../domain/constants/doctor.constants.ts";

export const WeeklyScheduleSchema = new Schema<IPersistenceWeeklySchedule>(
  {
    dayOfWeek: {
      type: String,
      enum: DAYS,
      required: true,
    },
    shifts: {
      type: [ShiftSchema],
      default: [],
    },
  },
  { _id: false },
);