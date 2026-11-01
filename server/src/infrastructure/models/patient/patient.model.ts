import { Model, model } from "mongoose";
import type { IPatient } from "./patient.types.ts";
import { patientSchema } from "./patient.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const PatientModel: Model<IPatient> = model<IPatient>(
  MODEL_NAMES.PATIENT,
  patientSchema,
);
