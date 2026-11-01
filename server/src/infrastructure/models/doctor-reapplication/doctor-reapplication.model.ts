import { type Model, model } from "mongoose";
import { doctorReapplicationSchema } from "./doctor-reapplication.schema.ts";
import type { IDoctorReapplication } from "./doctor-reapplication.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

doctorReapplicationSchema.index({
  doctorId: 1,
  status: 1,
});

doctorReapplicationSchema.index({
  tokenExpiresAt: 1,
});

export const DoctorReapplicationModel: Model<IDoctorReapplication> =
  model<IDoctorReapplication>(
    MODEL_NAMES.DOCTOR_REAPPLICATION,
    doctorReapplicationSchema,
  );
