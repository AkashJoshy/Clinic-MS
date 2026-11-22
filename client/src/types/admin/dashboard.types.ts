import type { DoctorDetailsCardInfo } from "../doctor";

export interface DepartmentDistributtonItem {
  id: string;
  name: string;
  count: number;
  percentage: number;
  startingPoint: number;
  endingPoint: number;
  color: string;
}

export interface DepartmentDistributtonData {
  totalDoctors: number;
  departments: DepartmentDistributtonItem[];
}

export interface DepartmentDistributtonChartProps {
  departmentsDetails: DepartmentDistributtonData;
  doctors: DoctorDetailsCardInfo[];
  isDark: boolean;
}

export interface DeptSlice {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
  startAngle: number;
  endAngle: number;
}

export interface DepartmentDistributionChartProps {
  departmentsDetails: DepartmentDistributtonData;
  isDark: boolean;
}

export type DoctorStatsResponse = {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
};

export type BaseStatsResponse = {
    total: number;
    active: number;
    inactive: number;
  }

export interface DashboardStatsData {
  doctors: DoctorStatsResponse,
  patients: BaseStatsResponse,
  departments: BaseStatsResponse,
  subscriptionPlans: BaseStatsResponse
}