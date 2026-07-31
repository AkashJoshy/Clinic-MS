import type { DepartmentDto } from "../../dto/admin.dto.ts";

export interface IGetDepartmentUseCase {
  execute(departmentId: string): Promise<DepartmentDto>;
}