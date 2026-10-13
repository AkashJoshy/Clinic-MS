import { Schema } from "mongoose";
import type { ISlot } from "./slot.types.ts";
import { SLOT_STATUS } from "../../../domain/constants/status.constants.ts";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";

export const SlotSchema = new Schema<ISlot>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },

    clinicId: {
      type: Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
      index: true,
    },
    doctorClinicId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorClinic",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
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
    status: {
      type: String,
      enum: SLOT_STATUS,
      required: true,
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  },
);