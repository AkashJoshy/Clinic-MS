import type { DepartmentResponseDto } from "../../../dto/department.dto.ts";

export interface IGetAllDepartmentsUseCase {
  execute(): Promise<DepartmentResponseDto[]>;
}
