import { Schema } from "mongoose";
import type { IDoctorClinic } from "./doctor.clinic.types.ts";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";
import { SlotRulesSchema } from "../shared/shared.schema.ts";
import { ExceptionsSchema } from "./exceptions.schema.ts";
import { WeeklyScheduleSchema } from "./weekly-schedule.schema.ts";

export const DoctorClinicSchema = new Schema<IDoctorClinic>(
  {
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: SERVICE_MODE,
      required: true,
    },
    weeklySchedule: {
      type: [WeeklyScheduleSchema],
      default: [],
    },
    exceptions: {
      type: ExceptionsSchema,
    },
    slotRules: {
      type: SlotRulesSchema,
    },
    timeZone: {
      type: String,
      required: true,
      default: "UTC",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
