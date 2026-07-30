import type {
  FormInputs
} from "@/types/common";

import { fieldGenerator } from "./base.data"
import type { ForgotPasswordData, LoginFormData } from "@/schemas/auth.schema";

export const REGISTER_FORM_INPUTS: FormInputs[] = [
  fieldGenerator("Full Name", "text", "John Doe", "fullName", true, false),
  fieldGenerator("Email Address", "email", "john@example.com", "email", true, false),
  fieldGenerator(
    "Phone Number",
    "number",
    "Enter your 10-digit phone number",
    "phone",
    true,
    false
  ),
  fieldGenerator("Password", "password", "Min. 8 characters", "password", true),
  fieldGenerator(
    "Confirm Password",
    "password",
    "Re-enter your password",
    "confirmPassword",
    true,
    false
  ),
  fieldGenerator("Role", "text", "Role", "role", true, true, "PATIENT"),
];

export const LOGIN_FORM_INPUTS: FormInputs<LoginFormData>[] = [
  fieldGenerator("Email Address", "email", "john@example.com", "email", true),
  fieldGenerator("Password", "password", "Min. 8 characters", "password", true),
]

export const FORGOT_PASSWORD_INPUTS: FormInputs<ForgotPasswordData>[] = [
  fieldGenerator("Email Address", "email", "john@example.com", "email", true),
];

export const NEW_PASSWORD_INPUTS: FormInputs[] = [
  fieldGenerator(
    "New Password",
    "password",
    "Min. 8 characters",
    "password",
    true,
  ),
  fieldGenerator(
    "Confirm Password",
    "password",
    "Re-enter your password",
    "confirmPassword",
    true,
  ),
];
