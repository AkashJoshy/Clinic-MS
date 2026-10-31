import type { IDepartmentRepository } from "../../../domain/repositories/i-department.repository.ts";
import { DepartmentMapper } from "../../mappers/admin/department.mapper.ts";
import type { IGetAllDepartmentsUseCase } from "../../interfaces/repositories/shared/i-get-all-departments.usecase.ts";
import type { DepartmentResponseDto } from "../../dto/department.dto.ts";

export class GetAllDepartmentsUseCase implements IGetAllDepartmentsUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}
  async execute(): Promise<DepartmentResponseDto[]> {
    const allDepartments = await this._departmentRepository.find();
    if (allDepartments.length <= 0) return [];

    return allDepartments.map((department) =>
      DepartmentMapper.toBaseDepartment(department),
    );
  }
}
