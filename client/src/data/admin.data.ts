import type { DoctorStatus } from "@/types/doctor";
import { createDepartmentFields } from "./base.data";
import type { DepartmentFormData, DepartmentUpdateFormData } from "@/schemas/admin/admin.schema";

export const DEPARTMENT_FORM_INPUTS = createDepartmentFields<DepartmentFormData>()

export const EDIT_DEPARTMENT_FORM_INPUTS = createDepartmentFields<DepartmentUpdateFormData>()

export const STATUS_STYLES: Record<
  DoctorStatus,
  { dot: string; badge: string }
> = {
  APPROVED: {
    dot: "bg-[#1dc465]",
    badge: "border-[#1dc465]/20 bg-[#1dc465]/10 text-[#1dc465]",
  },
  REJECTED: {
    dot: "bg-red-400",
    badge: "border-red-400/20 bg-red-400/10 text-red-400",
  },
  PENDING: {
    dot: "bg-amber-400",
    badge: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  },
  SUSPENDED: {
    dot: "bg-slate-400",
    badge: "border-slate-400/20 bg-slate-400/10 text-slate-400",
  },
};
