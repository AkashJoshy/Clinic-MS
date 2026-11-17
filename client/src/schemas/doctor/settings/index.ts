import { z } from "zod";
import { profileInfoSchema } from "./profile-info.schema";
import { kycSettingsSchema } from "./kyc-settings.schema";
import { securitySettingsSchema } from "./security-settings.schema";
import { notificationsSettingsSchema } from "./notifications-settings.schema";
import { appearanceSettingsSchema } from "./appearance-settings.schema";
import { accountManagementSchema } from "./account-management.schema";

export * from "./profile-info.schema";
export * from "./kyc-settings.schema";
export * from "./security-settings.schema";
export * from "./notifications-settings.schema";
export * from "./appearance-settings.schema";
export * from "./account-management.schema";

export const doctorSettingsSchema = z.object({
  profileInfo: profileInfoSchema,
  kyc: kycSettingsSchema,
  security: securitySettingsSchema,
  notifications: notificationsSettingsSchema,
  appearance: appearanceSettingsSchema,
  accountManagement: accountManagementSchema,
});

export type DoctorSettingsSchemaType = z.input<typeof doctorSettingsSchema>;
