import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { DepartmentDto } from "../../../dto/admin.dto.ts";
import type { IGetDepartmentUseCase } from "../../../repositories/admin/i-get-department.usecase.ts";

export class GetDepartmentUseCase implements IGetDepartmentUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(departmentId: string): Promise<DepartmentDto> {
    if (!departmentId) throw new NotFoundError("Department");
    const department = await this._departmentRepository.findById(departmentId);

    if (!department) throw new NotFoundError("Department");

    const { createdAt, updatedAt, ...rest } = department;

    return rest;
  }
}
