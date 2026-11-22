import type { DashboardStatsResponseDto } from "../../../../dto/admin-dashboard.dto.ts";

export interface IGetDashboardStatsUseCase {
  execute(): Promise<DashboardStatsResponseDto>;
}
