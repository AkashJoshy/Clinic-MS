import { Model, model } from "mongoose";
import type { IPatient } from "./patient.types.ts";
import { patientSchema } from "./patient.schema.ts";


export const PatientModel: Model<IPatient> = model<IPatient>("Patient", patientSchema);
