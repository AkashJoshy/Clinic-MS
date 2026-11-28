import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type {
  DoctorClinicDetailsBasicResponseDto,
  GetPatientDoctorsQueryDto,
  PatientDoctorDetailsResponseDto,
} from "../../../dto/doctor.dto.ts";
import type { PaginatedResponseDto } from "../../../dto/shared.dto.ts";
import type { IDoctorDetailsService } from "../../../interfaces/services/doctor/i-doctor-details.service.ts";
import { DoctorMapper } from "../../../mappers/patient/doctor.mapper.ts";
import type { IGetAllDoctorsUseCase } from "../../../interfaces/repositories/patient/doctor/i-get-all-doctors.usecase.ts";

export class GetAllDoctorsUsecase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
    private _departmentRepository?: IDepartmentRepository,
  ) {}

  async execute(
    query?: GetPatientDoctorsQueryDto,
  ): Promise<PaginatedResponseDto<PatientDoctorDetailsResponseDto>> {
    const page = Math.max(1, query?.page ?? 1);
    const limit = Math.max(1, query?.limit ?? 6);

    const filters: Record<string, any> = {
      status: "APPROVED",
    };

    if (query?.gender && query.gender.toLowerCase() !== "any") {
      filters.gender = query.gender.toUpperCase();
    }

    if (query?.experience) {
      if (query.experience === "0-5") {
        filters.experienceYears = { $gte: 0, $lte: 5 };
      } else if (query.experience === "5-10") {
        filters.experienceYears = { $gt: 5, $lte: 10 };
      } else if (query.experience === "10+") {
        filters.experienceYears = { $gt: 10 };
      }
    }

    if (query?.rating) {
      const minRating = Number(query.rating);
      if (!isNaN(minRating) && minRating > 0) {
        filters.averageRating = { $gte: minRating };
      }
    }

    if (query?.specializations && query.specializations.length > 0) {
      const specRegexes = query.specializations.map(
        (s) => new RegExp(`^${s}$`, "i"),
      );
      if (this._departmentRepository) {
        const matchingDepts = await this._departmentRepository.findBy({
          name: { $in: specRegexes } as any,
        });
        const deptIds = matchingDepts.map((d) => d.id).filter(Boolean);
        filters.$or = [
          { specialization: { $in: specRegexes } },
          ...(deptIds.length > 0 ? [{ departmentId: { $in: deptIds } }] : []),
        ];
      } else {
        filters.specialization = { $in: specRegexes };
      }
    }

    let searchDepartmentIds: string[] | undefined;
    if (query?.search?.trim() && this._departmentRepository) {
      const depts = await this._departmentRepository.findBy({
        name: { $regex: query.search.trim(), $options: "i" } as any,
      });
      const ids = depts.map((d) => d.id).filter(Boolean) as string[];
      if (ids.length > 0) {
        searchDepartmentIds = ids;
      }
    }

    const { data: doctors, ...pagination } =
      await this._doctorRepository.paginateDoctor(filters, {
        page,
        limit,
        search: query?.search?.trim(),
        sort: query?.sort,
        searchDepartmentIds,
      });

    const enrichedDoctors =
      await this._doctorDetailsService.executeMany(doctors);

    let data: PatientDoctorDetailsResponseDto[] = enrichedDoctors
      .filter(
        (res) => res.user && res.doctorClinicDetails.some((dc) => dc.clinic),
      )
      .map((res) => {
        const { user, address, department, doctor, doctorClinicDetails } = res;

        const updatedDoctorClinicDetails: DoctorClinicDetailsBasicResponseDto[] =
          doctorClinicDetails
            .filter((dc) => dc.clinic)
            .map((dc) => {
              return DoctorMapper.toDoctorClinicDetailsBasic(dc);
            });

        return DoctorMapper.toPatientDoctorDetailsCard({
          user,
          doctor,
          doctorClinicDetails: updatedDoctorClinicDetails,
          address,
          department,
        });
      });

    if (query?.consultationModes && query.consultationModes.length > 0) {
      const modes = query.consultationModes.map((m) => m.toUpperCase());
      data = data.filter((d) =>
        d.doctorClinicDetails.some((clinic) =>
          modes.includes(clinic.type.toUpperCase()),
        ),
      );
    }

    return {
      data,
      total: pagination.total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: pagination.totalPages,
      hasNextPage: pagination.hasNextPage,
      hasPreviousPage: pagination.hasPreviousPage,
    };
  }
}
