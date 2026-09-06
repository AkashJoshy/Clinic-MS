import { Department } from "../../../../domain/entities/department.entity.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { CreateDepartmentDto } from "../../../dto/admin.dto.ts";
import type { IAddDepartmentUseCase } from "../../../repositories/admin/i-add-department.usecase.ts";

export class AddDepartmentUseCase implements IAddDepartmentUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(data: CreateDepartmentDto): Promise<void> {
    try {
      let name = data.name.trim().toLowerCase();
      let dept = await this._departmentRepository.findByName(name);

      if (dept) {
        throw new AlreadyExistsError("Department already exists");
      }

      let newDepartment = await this._departmentRepository.save(
        Department.create({ ...data, name: name }),
      );

      if (!newDepartment) {
        throw new DatabaseError();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
