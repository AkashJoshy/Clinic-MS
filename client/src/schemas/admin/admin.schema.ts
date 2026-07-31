import * as z from "zod";
import { departmentSchema, updateDepartmentSchema } from "./department.schema";

export type DepartmentFormData = z.input<typeof departmentSchema>;
export type DepartmentUpdateFormData = z.input<typeof updateDepartmentSchema>;