import { Schema } from "mongoose";
import type { IDoctorReapplication } from "./doctor-reapplication.types.ts";

export const doctorReapplicationSchema = new Schema<IDoctorReapplication>(
  {
    doctorId: {
      type: Schema.Types.ObjectId || null,
      ref: "Doctor",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: false,
      unique: true,
      index: true,
    },
    tokenExpiresAt: {
      type: Date,
      required: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUBMITTED", "APPROVED", "REJECTED", "EXPIRED"],
      default: "PENDING",
      required: true,
      index: true,
    },
    fieldsToReupload: {
      type: [String],
      required: true,
      default: [],
    },
    reviewMessage: {
      type: String,
      default: null,
    },
    reviewedReason: {
      type: String,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
