import { Schema } from "mongoose";
import type { IUserDocument } from "./user.types.ts";
import { PROVIDER, USER_ROLES } from "../../../domain/constants/user.constants.ts";

export const userSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: function(): boolean {
        return this.provider === "LOCAL"
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function(): boolean {
        return this.provider === "LOCAL"
      },
      select: false
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
    },
    provider: {
      type: String,
      enum: PROVIDER,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isTwoFactorenabled: Boolean,
  },
  {
    timestamps: true,
  }
);
