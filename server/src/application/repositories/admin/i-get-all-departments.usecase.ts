import type { Department } from "../../../domain/entities/department.entity.ts";

export interface IGetAllDepartmentsUseCase {
  execute(): Promise<Department[] | []>;
}
