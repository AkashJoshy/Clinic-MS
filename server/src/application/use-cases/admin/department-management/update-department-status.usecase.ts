import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { DepartmentStatusResponseDto } from "../../../dto/admin.dto.ts";
import type { GetDepartmentDto } from "../../../dto/department.dto.ts";

import type { IUpdateDepartmentStatusUseCase } from "../../../interfaces/repositories/admin/department/i-update-department.usecase.ts";

export class UpdateDepartmentStatusUseCase implements IUpdateDepartmentStatusUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(
    departmentDto: GetDepartmentDto,
  ): Promise<DepartmentStatusResponseDto> {
    const { id, status } = departmentDto;

    if (!id || id === "undefined") throw new NotFoundError("Department");

    const department = await this._departmentRepository.findById(id);
    if (!department) throw new NotFoundError("Department not found!");

    if (status === "ACTIVE") {
      department.block();
    } else if (status === "INACTIVE") {
      department.unblock();
    } else {
      throw new Error("Invalid action");
    }

    const updatedDepartment =
      await this._departmentRepository.findByIdAndUpdate(id, {
        status: department.status,
      });

    if (!updatedDepartment || !updatedDepartment.id)
      throw new NotFoundError("Error while updating department");

    if (updatedDepartment.status === "ACTIVE") {
      return {
        departmentId: updatedDepartment.id,
        status: updatedDepartment.status,
        message: `${updatedDepartment.name} restored successfully`,
      };
    } else {
      return {
        departmentId: updatedDepartment.id,
        status: updatedDepartment.status,
        message: `${updatedDepartment.name} blocked successfully`,
      };
    }
  }
}
