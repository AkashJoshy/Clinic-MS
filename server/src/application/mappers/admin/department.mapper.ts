import type { DepartmentResponseDto, SafeDepartmentDto } from "../../dto/department.dto.ts";

export class DepartmentMapper {
  static toBaseDepartment(department: SafeDepartmentDto): DepartmentResponseDto {
    return {
      id: department.id,
      name: department.name,
      mode: department.mode,
      status: department.status,
      updatedAt: department.updatedAt,
    }
  }
}
