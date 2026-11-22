import type { SafeDepartment } from "../../../domain/types/admin.types.ts";
import type { BasePatient } from "../../../domain/types/patient.types.ts";
import type { BaseSubscriptionPlan } from "../../../domain/types/subscription-plan.types.ts";
import type {
  BaseStatsResponseDto,
  DoctorStatsResponseDto,
} from "../../dto/admin-dashboard.dto.ts";
import type { SafeUser } from "../../dto/auth.dto.ts";
import type { SafeDoctor } from "../../dto/doctor.dto.ts";

export class DashboardMapper {
  static toDoctorStats(doctors: SafeDoctor[]): DoctorStatsResponseDto {
    const approvedDoctors = doctors.filter((doc) => doc.status === "APPROVED");
    const pendingDoctors = doctors.filter((doc) => doc.status === "PENDING");
    const rejectedDoctors = doctors.filter((doc) => doc.status === "REJECTED");

    return {
      approved: approvedDoctors.length ?? 0,
      pending: pendingDoctors.length ?? 0,
      rejected: rejectedDoctors.length ?? 0,
      total: doctors.length ?? 0,
    };
  }

  static toPatientStats(
    patients: BasePatient[],
    users: SafeUser[],
  ): BaseStatsResponseDto {
    const patientMap = new Map(users.map((p) => [p.id!, p.isActive]));

    const activePatients = patients.filter((p) => {
      let isActive = patientMap.get(p.userId);
      if (isActive) return true;
      else false;
    });
    const inactivePatients = patients.filter((p) => {
      let isActive = patientMap.get(p.userId);
      if (!isActive) return true;
      else false;
    });

    return {
      active: activePatients.length,
      inactive: inactivePatients.length,
      total: patients.length,
    };
  }

  static toDepartmentStats(
    departments: SafeDepartment[],
  ): BaseStatsResponseDto {
    const activeDepartments = departments.filter(
      (dept) => dept.status === "ACTIVE",
    );
    const inactiveDepartments = departments.filter(
      (dept) => dept.status === "INACTIVE",
    );

    return {
      active: activeDepartments.length,
      inactive: inactiveDepartments.length,
      total: departments.length ?? 0,
    };
  }

  static toSubscriptionPlanStats(
    subscriptionPlans: BaseSubscriptionPlan[],
  ): BaseStatsResponseDto {
    const activeSubscriptionPlans = subscriptionPlans.filter(
      (p) => p.status === "ACTIVE",
    );
    const inactiveSubscriptionPlans = subscriptionPlans.filter(
      (p) => p.status === "INACTIVE",
    );

    return {
      active: activeSubscriptionPlans.length,
      inactive: inactiveSubscriptionPlans.length,
      total: subscriptionPlans.length ?? 0,
    };
  }
}
