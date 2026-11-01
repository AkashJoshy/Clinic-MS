import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { BaseDepartmentDto } from "../../../dto/shared.dto.ts";
import { DepartmentMapper } from "../../../mappers/admin/department.mapper.ts";
import type { IGetDepartmentUseCase } from "../../../interfaces/repositories/admin/department/i-get-department.usecase.ts";

export class GetDepartmentUseCase implements IGetDepartmentUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(departmentId: string): Promise<BaseDepartmentDto> {
    if (!departmentId) throw new NotFoundError("Department");
    const department = await this._departmentRepository.findById(departmentId);

    if (!department) throw new NotFoundError("Department");

    return DepartmentMapper.toBaseDepartment(department);
  }
}
