import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/IDepartmentRepository.ts";
import type { DepartmentDto } from "../../../dto/admin.dto.ts";
import type { IEditDepartmentUseCase } from "../../../repositories/admin/IEditDepartmentUseCase.ts";

export class EditDepartmentUseCase implements IEditDepartmentUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(departmentData: DepartmentDto): Promise<void> {
    const { id, ...data }: DepartmentDto = departmentData;
    
    if (!id) {
      throw new NotFoundError("Department");
    }

    const isAlreadyExisted = await this._departmentRepository.findByName(data.name)

    if (isAlreadyExisted) {
        throw new AlreadyExistsError("Department alreday exists")
    }


    const isUpdated = await this._departmentRepository.findByIdAndUpdate(
      id,
      data,
    );

    if (!isUpdated) {
      throw new DatabaseError("Failed to update, try again later");
    }
  }
}