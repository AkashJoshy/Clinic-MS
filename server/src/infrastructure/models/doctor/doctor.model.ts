import { Model, model } from "mongoose";
import { DoctorSchema } from "./doctor.schema.ts";
import type { IDoctor } from "./doctor.types.ts";


export const DoctorModel: Model<IDoctor> = model<IDoctor>("Doctor", DoctorSchema);
