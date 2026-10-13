import { Model, model } from "mongoose";
import type { IDepartment } from "./department.types.ts";
import { DepartmentSchema } from "./department.schema.ts";


export const DepartmentModel: Model<IDepartment> = model<IDepartment>(
  "Department",
  DepartmentSchema,
);
