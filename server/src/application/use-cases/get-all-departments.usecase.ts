import type { Department } from "../../domain/entities/department.entity.ts";
import type { IDepartmentRepository } from "../../domain/repositories/i-department.repository.ts";
import type { IGetAllDepartmentsUseCase } from "../repositories/admin/i-get-all-departments.usecase.ts";

export class GetAllDepartmentsUseCase implements IGetAllDepartmentsUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}
  async execute(): Promise<Department[] | []> {
    const allDepartments = await this._departmentRepository.find();

    if (allDepartments.length <= 0) return [];
    return allDepartments;
  }
}
