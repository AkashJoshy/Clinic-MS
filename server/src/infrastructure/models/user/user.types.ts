import type { Document } from "mongoose";
import type { AuthProvider, Role } from "../../../domain/types/user.types.ts";

export interface IUserDocument extends Document {
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