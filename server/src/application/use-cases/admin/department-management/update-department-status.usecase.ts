import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/IDepartmentRepository.ts";
import type { GetDepartmentDto } from "../../../dto/admin.dto.ts";
import type { IUpdateDepartmentStatusUseCase } from "../../../repositories/admin/IUpdateDepartmentUseCase.ts";

export class UpdateDepartmentStatusUseCase implements IUpdateDepartmentStatusUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(departmentDto: GetDepartmentDto): Promise<string> {
    const { id, status } = departmentDto;

    if (!id || id === "undefined") throw new NotFoundError("Department");

    const statusToUpdate = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const department = await this._departmentRepository.findById(id);

    if (!department) throw new NotFoundError("Department not found!");

    const updatedDepartment =
      await this._departmentRepository.findByIdAndUpdate(id, {
        status: statusToUpdate,
      });

    if (!updatedDepartment)
      throw new NotFoundError("Error while updating department");

    return status === "INACTIVE"
      ? "Department restored successfully"
      : "Department deleted successfully";
  }
}