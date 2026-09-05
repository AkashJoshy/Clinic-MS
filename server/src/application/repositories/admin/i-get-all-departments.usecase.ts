import type { Department } from "../../../domain/entities/department.ts";

export interface IGetAllDepartmentsUseCase {
  execute(): Promise<Department[] | []>;
}
