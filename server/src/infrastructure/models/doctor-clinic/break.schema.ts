import { Schema } from "mongoose";
import type { IPersistenceBreak } from "./doctor.clinic.types.ts";

export const BreakSchema = new Schema<IPersistenceBreak>(
  {
    label: {
      type: String,
      default: null,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  },
);
