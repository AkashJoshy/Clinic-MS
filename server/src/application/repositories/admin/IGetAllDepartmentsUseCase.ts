import type { Department } from "../../../domain/entities/Department.ts";

export interface IGetAllDepartmentsUseCase {
  execute(): Promise<Department[] | []>;
}