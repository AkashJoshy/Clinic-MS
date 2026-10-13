import type { BaseDepartmentDto } from "../../dto/shared.dto.ts";

export interface IGetAllDepartmentsUseCase {
  execute(): Promise<BaseDepartmentDto[]>;
}
