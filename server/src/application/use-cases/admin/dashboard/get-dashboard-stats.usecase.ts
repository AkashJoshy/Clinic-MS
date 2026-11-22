import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { DashboardStatsResponseDto } from "../../../dto/admin-dashboard.dto.ts";
import type { IGetDashboardStatsUseCase } from "../../../interfaces/repositories/admin/dashboard/i-get-dashboard-stats.usecase.ts";
import { DashboardMapper } from "../../../mappers/admin/dashboard.mapper.ts";

export class GetDashboardStatsUseCase implements IGetDashboardStatsUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _departmentRepository: IDepartmentRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _patientRepository: IPatientRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(): Promise<DashboardStatsResponseDto> {
    const users = await this._userRepository.find();
    const patientUsers = users.filter((user) => user.role === "PATIENT");

    const doctors = await this._doctorRepository.find();

    const departments = await this._departmentRepository.find();

    const patients = await this._patientRepository.find();

    const subscriptionPlans = await this._subscriptionPlanRepository.find();

    return {
      doctors: DashboardMapper.toDoctorStats(doctors),
      departments: DashboardMapper.toDepartmentStats(departments),
      patients: DashboardMapper.toPatientStats(patients, patientUsers),
      subscriptionPlans:
        DashboardMapper.toSubscriptionPlanStats(subscriptionPlans),
    };
  }
}
