import * as z from "zod";
import { fullName, email, password, phone, otp, role, withPasswordConfirm } from "./base.schema"


export const registerSchema = withPasswordConfirm(
  z.object({
    fullName,
    email,
    phone,
    password,
    confirmPassword: password,
    role
  }),
);

export const loginSchema = z.object({
  email,
  password,
  role
});

export const forgotPasswordSchema = z.object({
  email,
});

export const newPasswordSchema = withPasswordConfirm(
  z.object({
    password,
    confirmPassword: password,
  }),
);

export const otpSchema = z.object({
  otp,
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordData = z.infer<typeof newPasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;