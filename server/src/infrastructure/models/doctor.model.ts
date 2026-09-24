import mongoose, { Document, Schema } from "mongoose";

import type { Gender, ImageData, VerifyImageData } from "../../domain/types/shared.types.ts";
import { GENDER } from "../../domain/constants/patient.constants.ts";
import { DOCTOR_STATUS } from "../../domain/constants/status.constants.ts";
import { ImageDataSchema, ISubscriptionSchema, VerifyImageDataSchema } from "./base.schema.ts";
import type { DoctorStatus, Subscription } from "../../domain/types/doctor.types.ts";


export interface IDoctor extends Document {
  userId: string;
  displayName: string;
  doctorCode: string;
  bio: string | null;
  profilePicture: ImageData;
  languages: string[];
  gender: Gender;
  departmentId: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenceNumber: string;
  averageRating: number;
  totalReviews: number;
  registrationDoc: VerifyImageData;
  medicalLicenceDoc: VerifyImageData;
  status: DoctorStatus;
  subscription: Subscription
  reviewedAt: Date | null;
  reviewedMessage: string | null;
  reviewedReason: string | null;
  fieldsToReupload: string[],
  createdAt: Date;
  updatedAt: Date;
}


const DoctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    doctorCode: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: ImageDataSchema,
      required: false
    },
    languages: {
      type: [String],
      default: [],
    },
    gender: {
      type: String,
      enum: GENDER,
      required: true,
    },
    departmentId: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },
    licenceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    registrationDoc: {
      type: VerifyImageDataSchema,
      required: true,
    },
    medicalLicenceDoc: {
      type: VerifyImageDataSchema,
      required: true,
    },
    status: {
      type: String,
      enum: DOCTOR_STATUS,
      default: "PENDING",
      required: true,
    },
    subscription: ISubscriptionSchema,
    reviewedAt: {
      type: Date,
      default: null,
    },
    reviewedMessage: {
      type: String,
      default: null,
    },
    reviewedReason: {
      type: String,
      default: null
    },
    fieldsToReupload: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  },
);

export const DoctorModel = mongoose.model<IDoctor>("Doctor", DoctorSchema);
