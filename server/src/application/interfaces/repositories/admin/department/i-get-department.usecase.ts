import type { DepartmentResponseDto } from "../../../../dto/department.dto.ts";

export interface IGetDepartmentUseCase {
  execute(departmentId: string): Promise<DepartmentResponseDto>;
}
