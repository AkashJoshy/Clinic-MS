import { Schema, model, type Document } from "mongoose";
import type { AuthProvider, Role } from "../../domain/types/user.types.ts";
import { PROVIDER, USER_ROLES } from "../../domain/constants/user.constants.ts";


export interface UserDocument extends Document {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
  provider: AuthProvider;
  isEmailVerified: boolean;
  isBlocked: boolean;
  isActive: boolean;
  isTwoFactorenabled: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const userSchema = new Schema<UserDocument>(
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

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
