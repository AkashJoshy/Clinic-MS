import { Schema } from "mongoose";
import type { IPersistenceShift } from "./doctor.clinic.types.ts";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";

export const ShiftSchema = new Schema<IPersistenceShift>(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: SERVICE_MODE,
      required: true,
    },
  },
  { _id: false },
);
