import { model } from "mongoose";
import { doctorSettingsSchema } from "./doctor-settings.schema.ts";
import type { IDoctorSettings } from "./doctor-settings.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const DoctorSettingsModel = model<IDoctorSettings>(
  MODEL_NAMES.DOCTOR_SETTINGS,
  doctorSettingsSchema,
);
