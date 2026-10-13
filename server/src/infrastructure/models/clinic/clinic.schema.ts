import { Schema } from "mongoose";
import { APPROVAL_STATUS } from "../../../domain/constants/status.constants.ts";
import type { IClinic } from "./clinic.types.ts";
import { VerifyImageDataSchema } from "../shared/shared.schema.ts";

export const clinicSchema = new Schema<IClinic>(
  {
    name: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      default: "",
    },
    altPhone: {
      type: String,
      default: null,
    },
    registrationDoc: VerifyImageDataSchema,
    establishmentLicenceDoc: VerifyImageDataSchema,
    location: {
      type: {
        type: String,
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    status: {
      type: String,
      enum: APPROVAL_STATUS,
    },
  },
  {
    timestamps: true,
  },
);