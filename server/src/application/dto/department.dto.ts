import type { SafeDepartment } from "../../domain/types/admin.types.ts";
import type {
  EntityStatus,
  ServiceMode,
} from "../../domain/types/shared.types.ts";

export interface CreateDepartmentDto {
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
}

export type DepartmentDto = CreateDepartmentDto & {
  id: string | null;
};

export type GetDepartmentDto = Omit<CreateDepartmentDto, "mode" | "name"> & {
  id?: string;
};

export type EditDepartmentDto = DepartmentDto;

export type SafeDepartmentDto = Omit<SafeDepartment, "createdAt">
export type DepartmentResponseDto = SafeDepartmentDto
