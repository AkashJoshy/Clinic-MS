import { z } from "zod";

export const changePasswordSchema = z
  .object({
    section: z.literal("CHANGE_PASSWORD").default("CHANGE_PASSWORD"),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/^\S*$/, "Password cannot contain spaces"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export const securitySettingsSchema = z.object({
  section: z.literal("SECURITY").default("SECURITY"),
  twoFactorAuth: z.boolean().default(false),
  sessionTimeoutMinutes: z.coerce
    .number()
    .int()
    .min(5, "Minimum session timeout is 5 minutes")
    .max(1440, "Maximum session timeout is 1440 minutes")
    .default(30),
  loginAlerts: z.boolean().default(true),
});

export type ChangePasswordFormValues = z.input<typeof changePasswordSchema>;
export type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;
