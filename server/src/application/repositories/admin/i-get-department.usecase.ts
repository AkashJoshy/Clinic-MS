import type { BaseDepartmentDto } from "../../dto/shared.dto.ts";

export interface IGetDepartmentUseCase {
  execute(departmentId: string): Promise<BaseDepartmentDto>;
}
