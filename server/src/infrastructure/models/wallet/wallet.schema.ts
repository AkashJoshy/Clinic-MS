import { Schema } from "mongoose";
import type { IWallet } from "./wallet.types.ts";
import { USER_ROLES, USER_ROLES_MODEL } from "../../../domain/constants/user.constants.ts";

export const walletSchema = new Schema<IWallet>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "User",
    },
    ownerType: {
      type: String,
      enum: USER_ROLES,
      required: true,
    },
    ownerModel: {
      type: String,
      enum: USER_ROLES_MODEL,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Wallet balance must be an integer in paise",
      },
    },
    currency: {
      type: String,
      enum: ["INR"],
      default: "INR",
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "LOCKED", "CLOSED"],
      default: "ACTIVE",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

walletSchema.index({ ownerId: 1, ownerType: 1 }, { unique: true });
