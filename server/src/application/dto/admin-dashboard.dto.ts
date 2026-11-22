export interface DepartmentDistributionDto {
  id: string;
  name: string;
  count: number;
  percentage: number;
  startingPoint: number;
  endingPoint: number;
  color: string;
}

export interface DepartmentDistributionResponseDto {
  totalDoctors: number;
  departments: DepartmentDistributionDto[];
}

export type DoctorStatsResponseDto = {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
};

export type BaseStatsResponseDto = {
    total: number;
    active: number;
    inactive: number;
  }

export interface DashboardStatsResponseDto {
  doctors: DoctorStatsResponseDto,
  patients: BaseStatsResponseDto,
  departments: BaseStatsResponseDto,
  subscriptionPlans: BaseStatsResponseDto
}
