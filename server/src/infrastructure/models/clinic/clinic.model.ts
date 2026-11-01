import { Model, model } from "mongoose";
import { clinicSchema } from "./clinic.schema.ts";
import type { IClinic } from "./clinic.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

clinicSchema.index({ location: "2dsphere" });

export const ClinicModel: Model<IClinic> = model<IClinic>(
  MODEL_NAMES.CLINIC,
  clinicSchema,
);
