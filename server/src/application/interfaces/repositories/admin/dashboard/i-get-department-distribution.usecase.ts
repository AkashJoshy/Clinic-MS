import type { DepartmentDistributionResponseDto } from "../../../../dto/admin-dashboard.dto.ts";

export interface IGetDepartmentDistributionUseCase {
  execute(): Promise<DepartmentDistributionResponseDto>;
}
