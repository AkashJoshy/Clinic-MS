import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IDoctorDetailsService } from "../../../interfaces/services/doctor/i-doctor-details.service.ts";
import { DoctorMapper } from "../../../mappers/admin/doctor.mapper.ts";
import type { IGetAllDoctorsUseCase } from "../../../interfaces/repositories/admin/doctor/i-get-all-doctors.usecase.ts";
import type {
  DoctorManagementResponseDto,
  GetAllDoctorsQueryDto,
} from "../../../dto/doctor.dto.ts";

export class GetAllDoctorsUseCase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(
    query: GetAllDoctorsQueryDto,
  ): Promise<DoctorManagementResponseDto> {
    const filters: Record<string, any> = {
      ...(query.gender && { gender: query.gender }),
      ...(query.departmentIds?.length && {
        departmentId: { $in: query.departmentIds },
      }),
    };

    const paginationOptions = {
      limit: query.limit,
      search: query.search,
      sort: query.sortBy,
    };

    const [
      { data: approvedDoctorData, ...approvedPagination },
      { data: pendingDoctorData, ...pendingPagination },
      { data: rejectedDoctorData, ...rejectedPagination },
    ] = await Promise.all([
      this._doctorRepository.paginateDoctor(
        { status: "APPROVED", ...filters },
        { ...paginationOptions, page: query.approvedPage },
      ),
      this._doctorRepository.paginateDoctor(
        { status: "PENDING", ...filters },
        { ...paginationOptions, page: query.pendingPage },
      ),
      this._doctorRepository.paginateDoctor(
        { status: "REJECTED", ...filters },
        { ...paginationOptions, page: query.rejectedPage },
      ),
    ]);

    const [approvedResponse, pendingResponse, rejectedResponse] =
      await Promise.all([
        this._doctorDetailsService.executeMany(approvedDoctorData),
        this._doctorDetailsService.executeMany(pendingDoctorData),
        this._doctorDetailsService.executeMany(rejectedDoctorData),
      ]);

    return DoctorMapper.toDoctorDetailsCardResponse(
      approvedPagination,
      pendingPagination,
      rejectedPagination,
      approvedResponse.map(DoctorMapper.toDoctorDetailsCard),
      pendingResponse.map(DoctorMapper.toDoctorDetailsCard),
      rejectedResponse.map(DoctorMapper.toDoctorDetailsCard),
    );
  }
}
