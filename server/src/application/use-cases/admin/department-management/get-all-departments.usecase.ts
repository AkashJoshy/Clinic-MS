import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import { DepartmentMapper } from "../../../mappers/admin/department.mapper.ts";
import type { IGetAllDepartmentsAdminUseCase } from "../../../interfaces/repositories/admin/department/i-get-all-departments.usecase.ts";
import type {
  DepartmentResponseDto,
  GetAllDepartmentsQueryDto,
} from "../../../dto/department.dto.ts";
import type { PaginatedResponseDto } from "../../../dto/shared.dto.ts";

export class GetAllDepartmentsUseCase implements IGetAllDepartmentsAdminUseCase {
  constructor(private _departmentRepository: IDepartmentRepository) {}

  async execute(
    query: GetAllDepartmentsQueryDto,
  ): Promise<PaginatedResponseDto<DepartmentResponseDto>> {
    const filter: Record<string, any> = {};

    if (query.search) {
      const escaped = query.search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: escaped, $options: "i" };
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1 };
    if (query.sortBy === "OLDEST") {
      sort = { createdAt: 1 };
    } else if (query.sortBy === "NAME_ASC") {
      sort = { name: 1 };
    } else if (query.sortBy === "NAME_DESC") {
      sort = { name: -1 };
    }

    const paginatedResult = await this._departmentRepository.paginate(filter, {
      page: query.page,
      limit: query.limit,
      sort,
    });

    return {
      data: paginatedResult.data.map((dept) =>
        DepartmentMapper.toBaseDepartment(dept),
      ),
      total: paginatedResult.total,
      page: paginatedResult.page,
      limit: paginatedResult.limit,
      totalPages: paginatedResult.totalPages,
      hasNextPage: paginatedResult.hasNextPage,
      hasPreviousPage: paginatedResult.hasPreviousPage,
    };
  }
}
