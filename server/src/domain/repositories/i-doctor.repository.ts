import type { Doctor } from "../entities/doctor.entity.ts";
import type {
  PaginatedResult,
  PaginationOptions,
} from "../types/shared.types.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDoctorRepository extends IBaseRepository<Doctor> {
  getDoctorNumber(): Promise<number | null>;
  paginateDoctor(
    filter: Record<string, any>,
    options: PaginationOptions & {
      search?: string | undefined;
      searchDepartmentIds?: string[] | undefined;
    },
  ): Promise<PaginatedResult<Doctor>>;
}
