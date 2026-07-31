import { createDepartmentFields } from "./base.data";
import type { DepartmentFormData, DepartmentUpdateFormData } from "@/schemas/admin/admin.schema";

export const DEPARTMENT_FORM_INPUTS = createDepartmentFields<DepartmentFormData>()

export const EDIT_DEPARTMENT_FORM_INPUTS = createDepartmentFields<DepartmentUpdateFormData>()