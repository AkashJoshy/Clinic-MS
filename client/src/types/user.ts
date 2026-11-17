import type {
  AuthProvider,
  Role,
} from "./auth";
import type { ThemeMode } from "./common";

export type ModeRoleRef = "Patient" | "Admin" | "Clinic" | "Doctor";

export interface UserWithTheme {
  id: string | null;
  fullName: string;
  phone: string;
  email: string;
  role: Role;
  provider: AuthProvider;
  isEmailVerified: boolean;
  isBlocked: boolean
  isActive: boolean,
  theme: ThemeMode
  createdAt: Date
  updatedAt: Date
}
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