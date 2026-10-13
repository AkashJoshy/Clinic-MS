import mongoose, { type Model } from "mongoose";
import { DoctorClinicSchema } from "./doctor.clinic.schema.ts";
import type { IDoctorClinic } from "./doctor.clinic.types.ts";


DoctorClinicSchema.index({ doctorId: 1 });

DoctorClinicSchema.index({ clinicId: 1 });

DoctorClinicSchema.index({ clinicId: 1, isActive: 1 });

export const DoctorClinicModel: Model<IDoctorClinic> = mongoose.model<IDoctorClinic>(
  "DoctorClinic",
  DoctorClinicSchema,
);

