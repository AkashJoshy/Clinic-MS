import type { IDepartmentRepository } from "../../domain/repositories/i-department.repository.ts";
import type { DepartmentResponseDto } from "../dto/department.dto.ts";
import type { DepartmentLookupResultDto } from "../dto/shared.dto.ts";
import type { IDepartmentDetailsService } from "../interfaces/services/shared/i-department-details.service.ts";

export class DepartmentDetailsService implements IDepartmentDetailsService {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async executeOne(deptId: string): Promise<DepartmentResponseDto | null> {
    const department = await this._departmentRepository.findById(deptId);

    if (!department) return null;

    return department;
  }

  async executeMany(deptIds: string[]): Promise<DepartmentLookupResultDto> {
    const departments = await this._departmentRepository.findByIds(
      "id",
      deptIds,
    );

    const departmentMap = new Map(departments.map((d) => [d.id, d]));

    return {
      departments,
      departmentMap,
    };
  }
}
