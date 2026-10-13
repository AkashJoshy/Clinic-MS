import type { IDepartmentRepository } from "../../domain/repositories/i-department.repository.ts";
import type { BaseDepartmentDto } from "../dto/shared.dto.ts";
import { DepartmentMapper } from "../mappers/admin/department.mapper.ts";
import type { IGetAllDepartmentsUseCase } from "../repositories/admin/i-get-all-departments.usecase.ts";

export class GetAllDepartmentsUseCase implements IGetAllDepartmentsUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}
  async execute(): Promise<BaseDepartmentDto[]> {
    const allDepartments = await this._departmentRepository.find();
    if (allDepartments.length <= 0) return [];

    return allDepartments.map((department) =>
      DepartmentMapper.toBaseDepartment(department)
    );
  }
}
