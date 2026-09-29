import type { SafeDepartment } from "../../domain/types/admin.types.ts";
import type { DepartmentDetailsResponseDto } from "../dto/shared.dto.ts";

export interface IDepartmentDetailsService {
  executeOne(deptId: string): Promise<SafeDepartment | null>;
  executeMany(deptIds: string[]): Promise<DepartmentDetailsResponseDto>;
}
