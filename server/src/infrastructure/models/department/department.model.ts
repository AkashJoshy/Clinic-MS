import { Model, model } from "mongoose";
import type { IDepartment } from "./department.types.ts";
import { DepartmentSchema } from "./department.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const DepartmentModel: Model<IDepartment> = model<IDepartment>(
  MODEL_NAMES.DEPARTMENT,
  DepartmentSchema,
);
