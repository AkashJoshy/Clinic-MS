import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { EditDepartmentDto } from "../../../dto/department.dto.ts";
import type { IEditDepartmentUseCase } from "../../../interfaces/repositories/admin/department/i-edit-department.usecase.ts";

export class EditDepartmentUseCase implements IEditDepartmentUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(departmentData: EditDepartmentDto): Promise<void> {
    const { id, name, mode, status } = departmentData;

    const updatedName = name.trim().toLowerCase();

    if (!id) {
      throw new NotFoundError("Department");
    }

    const department = await this._departmentRepository.findById(id);

    if (!department || !department.id) {
      throw new NotFoundError("Department");
    }

    const isDeptExists =
      await this._departmentRepository.findByName(updatedName);

    if (isDeptExists && isDeptExists.id !== department.id) {
      throw new AlreadyExistsError("Department name already exists");
    }

    const isUpdated = await this._departmentRepository.findByIdAndUpdate(id, {
      name: updatedName,
      mode,
      status,
    });

    if (!isUpdated) {
      throw new DatabaseError("Failed to update, try again later");
    }
  }
}
