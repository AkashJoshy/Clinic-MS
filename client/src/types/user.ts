import type {
  AuthProvider,
  Role,
} from "./auth";

export type ModeRoleRef = "Patient" | "Admin" | "Clinic" | "Doctor";

export interface User {
  id: string | null;
  fullName: string;
  phone: string;
  email: string;
  role: Role;
  provider: AuthProvider;
  isEmailVerified: boolean;
  isBlocked: boolean
  isActive: boolean,
  createdAt: Date
  updatedAt: Date
}

export type RegisterUser = Omit<AuthUser, "id" | "isBlocked" | "isActive" | "isTwoFactorEnabled" | "isEmailVerified" | "imageUrl" | "createdAt" | "updatedAt">


export interface AuthUser
  extends User {
  password: string;
  isBlocked: boolean;
  isActive: boolean;
  isTwoFactorEnabled: boolean;
}

export interface Address {
  id: string | null;
  ownerId: string;
  ownerType: ModeRoleRef;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}