import * as z from "zod";
import { departmentSchema, updateDepartmentSchema } from "./department.schema";
import type { rejectDoctorSchema } from "./doctor.schema";

export type DepartmentFormData = z.input<typeof departmentSchema>;
export type DepartmentUpdateFormData = z.input<typeof updateDepartmentSchema>;
export type RejectPatientData = z.input<typeof rejectDoctorSchema>;