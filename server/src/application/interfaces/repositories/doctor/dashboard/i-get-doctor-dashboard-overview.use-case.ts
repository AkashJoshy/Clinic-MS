import type { DoctorDashboardOverviewResponseDto } from "../../../../dto/doctor-dashboard.dto.ts";

export interface IGetDoctorDashboardOverviewUseCase {
  execute(
    userId: string,
  ): Promise<DoctorDashboardOverviewResponseDto>;
}
