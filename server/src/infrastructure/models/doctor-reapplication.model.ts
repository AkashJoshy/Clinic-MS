import { Schema, Types, model, type Document, type Model } from "mongoose";
import type {  } from "../../domain/entities/doctor-reapplication.entity.ts";
import type { DoctorDocumentField } from "../../domain/types/admin.types.ts";
import type { DoctorReapplicationStatus } from "../../domain/types/doctor.types.ts";

export interface IDoctorReapplication extends Document {
  doctorId: Types.ObjectId | null;
  tokenHash: string;
  tokenExpiresAt: Date;
  status: DoctorReapplicationStatus;
  fieldsToReupload: string[];
  reviewMessage: string | null;
  reviewedReason: string | null;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const doctorReapplicationSchema = new Schema<IDoctorReapplication>(
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

doctorReapplicationSchema.index({
  doctorId: 1,
  status: 1,
});

doctorReapplicationSchema.index({
  tokenExpiresAt: 1,
});

export const DoctorReapplicationModel: Model<IDoctorReapplication> =
  model<IDoctorReapplication>(
    "DoctorReapplication",
    doctorReapplicationSchema,
  );
