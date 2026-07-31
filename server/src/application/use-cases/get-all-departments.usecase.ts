import type { Department } from "../../domain/entities/Department.ts";
import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository.ts";
import type { IGetAllDepartmentsUseCase } from "../repositories/admin/IGetAllDepartmentsUseCase.ts";


export class GetAllDepartmentsUseCase implements IGetAllDepartmentsUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}
  async execute(): Promise<Department[] | []> {
    const allDepartments = await this._departmentRepository.find();

    if (allDepartments.length <= 0) return [];
    return allDepartments;
  }
}