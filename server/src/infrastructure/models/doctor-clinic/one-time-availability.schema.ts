import { Schema } from "mongoose";
import type { IPersistenceOneTimeAvailability } from "./doctor.clinic.types.ts";

export const OneTimeAvailabilitySchema =
  new Schema<IPersistenceOneTimeAvailability>(
    {
      date: {
        type: String,
        required: true,
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
