import type { ImageData } from "./shared.types.ts";

export interface RegisterUserProps {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
  provider: AuthProvider;
  imageUrl: ImageData;
  isEmailVerified: boolean,
  isBlocked: boolean,
  isActive: boolean,
  isTwoFactorenabled: boolean,
  createdAt: Date | null,
  updatedAt: Date | null
}

export interface CreateUserProps extends RegisterUserProps {
  id: string | null;
}

export type AuthProvider = "LOCAL" | "GOOGLE";
export type Role = "PATIENT" | "ADMIN" | "DOCTOR";
export type ModeRoleRef = "Patient" | "Admin" | "Doctor";
export type EntityType = "Doctor"