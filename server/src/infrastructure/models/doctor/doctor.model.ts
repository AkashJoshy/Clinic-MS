import { Model, model } from "mongoose";
import { DoctorSchema } from "./doctor.schema.ts";
import type { IDoctor } from "./doctor.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const DoctorModel: Model<IDoctor> = model<IDoctor>(
  MODEL_NAMES.DOCTOR,
  DoctorSchema,
);
