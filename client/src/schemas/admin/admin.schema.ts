import * as z from "zod";
import { departmentSchema, updateDepartmentSchema } from "./department.schema";
import type { rejectDoctorSchema } from "./doctor.schema";
import type { generalSettingsSchema } from "./settings/general-settings.schema";
import type { businessSettingsSchema } from "./settings/business-settings.schema";
import type {
  platformSettingsSchema,
  settingsSectionSchema,
} from "./settings/platform-settings.schema";
import type { systemSettingsSchema } from "./settings/system-settings.schema";
import type { colorPaletteSchema } from "./color-palette.schema";

export type DepartmentFormData = z.input<typeof departmentSchema>;
export type DepartmentUpdateFormData = z.input<typeof updateDepartmentSchema>;
export type RejectPatientData = z.input<typeof rejectDoctorSchema>;
export type GeneralSettings = z.infer<typeof generalSettingsSchema>;
export type BusinessSettings = z.infer<typeof businessSettingsSchema>;
export type SettingsSection = z.infer<typeof settingsSectionSchema>;
export type SystemSettings = z.infer<typeof systemSettingsSchema>;
export type PlatformSettings = z.infer<typeof platformSettingsSchema>;
export type ColorPaletteFormData = z.infer<typeof colorPaletteSchema>;
