import type { ClipboardEvent, KeyboardEvent, RefObject } from "react";
import type { PatientProfile } from "./patient";
import type { RegisterUser, User } from "./user";
import type { Doctor, DoctorInfo } from "./doctor";


export type AuthProvider = "LOCAL" | "GOOGLE"
export type GoogleAuthMode = "signup" | "login"
export type Role = "PATIENT" | "DOCTOR" | "ADMIN";
export interface RouteRoleProps {
  role: "patient" | "doctor" | "admin";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterUserDto extends RegisterUser {}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface Tokens {
  patient: string | null;
  admin: string | null;
  doctor: string | null
}

export interface AuthStateDTO {
  tokens: Tokens;
  user: User | null;
  doctor: DoctorInfo | null;
  patients: PatientProfile[] | [];
  activePatient: PatientProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;
}

export type EmailDto = {
    email: string;
}
export type ForgotPasswordDto = EmailDto & {
  role: Role
}

export interface otpDetails {
  backRoute: string;
  title: string;
  description: string;
  isResend: boolean;
}

export interface useOtpdetails {
  otp: string[];
  otpValue: string;
  handleChange: (index: number, value: string) => void;
  handleResend: () => void;
  handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  inputs: RefObject<(HTMLInputElement | null)[]>;
  handleKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  resendCooldown: number;
  isComplete: boolean;
}

export type OtpDto = { token: string }
export type ResendOtpDto = OtpDto
export type VerifyOtpDto = OtpDto & { otp: string }
export type ResetPasswordDto = OtpDto & {
  confirmPassword: string
  password: string,
  role: Role
}

export type loginFormProps = {
  portal: "Admin" | "Clinic" | "Doctor";
  role: "ADMIN" | "CLINIC" | "DOCTOR" | "PATIENT";
  fn: (data: LoginDto) => Promise<any>;
  to: string
};



