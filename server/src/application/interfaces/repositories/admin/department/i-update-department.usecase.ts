import type { DepartmentStatusResponseDto } from "../../../../dto/admin.dto.ts";
import type { GetDepartmentDto } from "../../../../dto/department.dto.ts";

export interface IUpdateDepartmentStatusUseCase {
  execute(departmentDto: GetDepartmentDto): Promise<DepartmentStatusResponseDto>;
}
