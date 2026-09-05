import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { DepartmentDto } from "../../../dto/admin.dto.ts";
import type { IEditDepartmentUseCase } from "../../../repositories/admin/i-edit-department.usecase.ts";

export class EditDepartmentUseCase implements IEditDepartmentUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(departmentData: DepartmentDto): Promise<void> {
    const { id, ...data }: DepartmentDto = departmentData;

    const updatedName = data.name.toLowerCase();

    if (!id) {
      throw new NotFoundError("Department");
    }

    const department = await this._departmentRepository.findById(id);

    if (!department || !department.id) {
      throw new AlreadyExistsError("Department not found!");
    }

    const isDeptExists =
      await this._departmentRepository.findByName(updatedName);

    if (
      isDeptExists &&
      isDeptExists?.id?.toString() !== department.id.toString()
    ) {
      throw new AlreadyExistsError("Department name already exists");
    }

    const updatedData = {
      name: updatedName,
      mode: data.mode,
      status: data.status,
    };

    const isUpdated = await this._departmentRepository.findByIdAndUpdate(
      id,
      updatedData,
    );

    if (!isUpdated) {
      throw new DatabaseError("Failed to update, try again later");
    }
  }
}
