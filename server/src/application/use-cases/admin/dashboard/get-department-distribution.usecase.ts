import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  DepartmentDistributionDto,
  DepartmentDistributionResponseDto,
} from "../../../dto/admin-dashboard.dto.ts";
import type { IGetDepartmentDistributionUseCase } from "../../../interfaces/repositories/admin/dashboard/i-get-department-distribution.usecase.ts";

export class GetDepartmentDistributionUseCase implements IGetDepartmentDistributionUseCase {
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
    private readonly _doctorRepository: IDoctorRepository,
  ) {}

  async execute(): Promise<DepartmentDistributionResponseDto> {
    const departments = await this._departmentRepository.find();
    const doctors = await this._doctorRepository.find();
    const firstSixDepartments = departments.slice(0, 6);

    const PALETTE = [
      "#10b981",
      "#0ea5e9",
      "#8b5cf6",
      "#f59e0b",
      "#ec4899",
      "#06b6d4",
      "#6366f1",
      "#f43f5e",
    ];

    let counts: Record<string, number> = {};

    firstSixDepartments.forEach((dept) => {
      if (dept.id) counts[dept.id] = 0;
    });

    doctors.forEach((doc) => {
      if (counts) {
        counts[doc.departmentId] = (counts[doc.departmentId] ?? 0) + 1;
      }
    });

    const totalCount = Object.values(counts).reduce((acc, c) => acc + c, 0);

    console.log(`Doctor Count: `);
    console.log(totalCount);

    let departmentDetails: DepartmentDistributionDto[] = [];

    let startingArea = 0;

    firstSixDepartments.forEach((dept, idx) => {
      const count = dept?.id ? counts[dept.id] || 0 : 0;

      const percentage =
        totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

      const quarter = totalCount > 0 ? 360 / totalCount : 0;

      const startingDistance = startingArea;
      const endingDistance = startingArea + count * quarter;

      startingArea = endingDistance;

      departmentDetails.push({
        count,
        id: dept?.id!,
        name: dept?.name,
        percentage,
        startingPoint: startingDistance,
        endingPoint: endingDistance,
        color: PALETTE[idx] || "#FFFF"
      });
    });

    return {
      totalDoctors: totalCount,
      departments: departmentDetails,
    };
  }
}
