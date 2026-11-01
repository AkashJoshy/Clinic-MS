import type { DepartmentResponseDto } from "../../../dto/department.dto.ts";
import type { DepartmentLookupResultDto } from "../../../dto/shared.dto.ts";

export interface IDepartmentDetailsService {
  executeOne(deptId: string): Promise<DepartmentResponseDto | null>;
  executeMany(deptIds: string[]): Promise<DepartmentLookupResultDto>;
}
