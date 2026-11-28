import type {
  DepartmentResponseDto,
  GetAllDepartmentsQueryDto,
} from "../../../../dto/department.dto.ts";
import type { PaginatedResponseDto } from "../../../../dto/shared.dto.ts";

export interface IGetAllDepartmentsAdminUseCase {
  execute(
    query: GetAllDepartmentsQueryDto,
  ): Promise<PaginatedResponseDto<DepartmentResponseDto>>;
}
