import type { DepartmentStatusDto, GetDepartmentDto } from "../../dto/admin.dto.ts";

export interface IUpdateDepartmentStatusUseCase {
  execute(departmentDto: GetDepartmentDto): Promise<DepartmentStatusDto>;
}