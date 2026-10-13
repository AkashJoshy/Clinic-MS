import type { SafeDepartment } from "../../../domain/types/admin.types.ts";
import type { BaseDepartmentDto } from "../../dto/shared.dto.ts";

export class DepartmentMapper {
  static toBaseDepartment(department: SafeDepartment): BaseDepartmentDto {
    return {
      id: department.id,
      name: department.name,
      mode: department.mode,
      status: department.status,
      updatedAt: department.updatedAt,
    }
  }
}
