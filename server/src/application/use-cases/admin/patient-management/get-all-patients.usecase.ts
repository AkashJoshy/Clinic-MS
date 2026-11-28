import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { IPatientDetailsService } from "../../../interfaces/services/patient/i-patient-details.service.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import { PatientMapper } from "../../../mappers/admin/patient.mapper.ts";
import type { IGetAllPatientsUseCase } from "../../../interfaces/repositories/admin/patient/i-get-all-patients.usecase.ts";
import type {
  GetAllPatientsQueryDto,
  PatientBasicInfoResponseDto,
} from "../../../dto/patient.dto.ts";
import type { PaginatedResponseDto } from "../../../dto/shared.dto.ts";

export class GetAllPatientsUseCase implements IGetAllPatientsUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _patientDetailsService: IPatientDetailsService,
    private _userRepository?: IUserRepository,
  ) {}

  async execute(
    query: GetAllPatientsQueryDto,
  ): Promise<PaginatedResponseDto<PatientBasicInfoResponseDto>> {
    const filter: Record<string, any> = {};

    if (query.gender) {
      filter.gender = query.gender;
    }

    if (this._userRepository && (query.status || query.search)) {
      let userQuery: Record<string, any> = {};
      if (query.status === "ACTIVE") {
        userQuery.isActive = true;
        userQuery.isBlocked = false;
      } else if (query.status === "INACTIVE") {
        userQuery.$or = [{ isActive: false }, { isBlocked: true }];
      }

      if (query.search) {
        const escaped = query.search
          .trim()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const emailUsers = await this._userRepository.findBy({
          ...userQuery,
          email: { $regex: escaped, $options: "i" },
        } as any);

        const emailUserIds = emailUsers
          .map((u) => u.id)
          .filter((id): id is string => Boolean(id));

        const searchOr: any[] = [
          { displayName: { $regex: escaped, $options: "i" } },
        ];
        if (emailUserIds.length > 0) {
          searchOr.push({ userId: { $in: emailUserIds } });
        }

        if (query.status) {
          const statusUsers = await this._userRepository.findBy(userQuery as any);
          const statusUserIds = statusUsers
            .map((u) => u.id)
            .filter((id): id is string => Boolean(id));
          filter.userId = { $in: statusUserIds };
        }

        filter.$or = searchOr;
      } else if (query.status) {
        const statusUsers = await this._userRepository.findBy(userQuery as any);
        const statusUserIds = statusUsers
          .map((u) => u.id)
          .filter((id): id is string => Boolean(id));
        filter.userId = { $in: statusUserIds };
      }
    } else if (query.search) {
      const escaped = query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.displayName = { $regex: escaped, $options: "i" };
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1 };
    if (query.sortBy === "OLDEST") {
      sort = { createdAt: 1 };
    } else if (query.sortBy === "NAME_ASC") {
      sort = { displayName: 1 };
    } else if (query.sortBy === "NAME_DESC") {
      sort = { displayName: -1 };
    }

    const paginated = await this._patientRepository.paginate(filter, {
      page: query.page,
      limit: query.limit,
      sort,
    });

    const initialResponse = await this._patientDetailsService.execute(
      paginated.data,
    );

    const response: PatientBasicInfoResponseDto[] = initialResponse.map(
      (res) => {
        return PatientMapper.toPatientBasicInfo(res);
      },
    );

    return {
      data: response,
      total: paginated.total,
      page: paginated.page,
      limit: paginated.limit,
      totalPages: paginated.totalPages,
      hasNextPage: paginated.hasNextPage,
      hasPreviousPage: paginated.hasPreviousPage,
    };
  }
}
