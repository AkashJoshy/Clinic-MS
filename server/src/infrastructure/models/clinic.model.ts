import { Schema, model, type Document } from "mongoose";
import type {
  ApprovalStatus,
  VerifyImageData,
} from "../../domain/types/shared.types.ts";
import { APPROVAL_STATUS } from "../../domain/constants/status.constants.ts";
import { VerifyImageDataSchema } from "./base.schema.ts";

export interface IClinic extends Document {
  name: string;
  registrationNumber: string;
  about: string;
  altPhone: string | null;
  registrationDoc: VerifyImageData;
  establishmentLicenceDoc: VerifyImageData;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  status: ApprovalStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}


const clinicSchema = new Schema<IClinic>(
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
    }
  },
  {
    timestamps: true,
  },
);

clinicSchema.index({ location: "2dsphere" });

export const ClinicModel = model<IClinic>("Clinic", clinicSchema);
