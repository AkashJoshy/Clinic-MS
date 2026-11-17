import { Schema, type SchemaDefinition } from "mongoose";
import type { IKyc, IKycAadhaar, IKycBank, IKycPan } from "./kyc.types.ts";
import { ImageDataSchema } from "../shared/shared.schema.ts";
import {
  BANK_ACCOUNT_TYPE,
  KYC_STATUSES,
} from "../../../domain/constants/kyc.constants.ts";
import { USER_ROLES_MODEL } from "../../../domain/constants/user.constants.ts";

const statusFields: SchemaDefinition = {
  status: {
    type: String,
    enum: KYC_STATUSES,
    default: "NOT_SUBMITTED",
  },
  rejectionReason: {
    type: String,
    trim: true,
    default: null,
  },
};

const panSchema = new Schema<IKycPan>(
  {
    panNumber: { type: String, trim: true, default: "" },
    nameOnPan: { type: String, trim: true, default: "" },
    dateOfBirth: { type: String, default: "" },
    panCardDoc: ImageDataSchema,
    rejectionReason: { type: String, trim: true, default: null },
    ...statusFields,
  },
  { _id: false },
);

const bankSchema = new Schema<IKycBank>(
  {
    accountHolderName: { type: String, trim: true, default: "" },
    accountNumber: { type: String, trim: true, default: "" },
    ifscCode: { type: String, trim: true, uppercase: true, default: "" },
    bankName: { type: String, trim: true, default: "" },
    accountType: {
      type: String,
      enum: BANK_ACCOUNT_TYPE,
      default: "SAVINGS",
    },
    ...statusFields,
  },
  { _id: false },
);

const aadhaarSchema = new Schema<IKycAadhaar>(
  {
    aadhaarNumber: { type: String, trim: true, default: "" },
    nameOnAadhaar: { type: String, trim: true, default: "" },
    aadhaarCardDoc: ImageDataSchema,
    ...statusFields,
  },
  { _id: false },
);

export const kycSchema: Schema<IKyc> = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "ownerType",
    },
    ownerType: {
      type: String,
      required: true,
      enum: USER_ROLES_MODEL,
    },
    pan: { type: panSchema, default: () => ({}) },
    bank: { type: bankSchema, default: () => ({}) },
    aadhaar: { type: aadhaarSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  },
);

kycSchema.index({ ownerId: 1, ownerType: 1 }, { unique: true });
