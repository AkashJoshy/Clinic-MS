import type { DepartmentDto } from "../../dto/admin.dto.ts";

export interface IEditDepartmentUseCase {
  execute(departmentData: DepartmentDto): Promise<void>;
}