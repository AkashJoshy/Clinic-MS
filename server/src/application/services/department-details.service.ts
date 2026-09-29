import type { IDepartmentRepository } from "../../domain/repositories/i-department.repository.ts";
import type { SafeDepartment } from "../../domain/types/admin.types.ts";
import type { DepartmentDetailsResponseDto } from "../dto/shared.dto.ts";
import type { IDepartmentDetailsService } from "../i-service/i-department-details.service.ts";

export class DepartmentDetailsService implements IDepartmentDetailsService {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async executeOne(
    deptId: string
  ): Promise<SafeDepartment | null> {
    const department = await this._departmentRepository.findById(deptId)

    if (!department) return null;

    return department;
  }

  async executeMany(
   deptIds: string[]
  ): Promise<DepartmentDetailsResponseDto> {
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
