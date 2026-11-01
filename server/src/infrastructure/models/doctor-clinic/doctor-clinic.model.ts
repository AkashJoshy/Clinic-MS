import { model, type Model } from "mongoose";
import { DoctorClinicSchema } from "./doctor.clinic.schema.ts";
import type { IDoctorClinic } from "./doctor.clinic.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

DoctorClinicSchema.index({ doctorId: 1 });

DoctorClinicSchema.index({ clinicId: 1 });

DoctorClinicSchema.index({ clinicId: 1, isActive: 1 });

export const DoctorClinicModel: Model<IDoctorClinic> = model<IDoctorClinic>(
  MODEL_NAMES.DOCTOR_CLINIC,
  DoctorClinicSchema,
);
