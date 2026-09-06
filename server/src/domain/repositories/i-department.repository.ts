import type { Department } from "../entities/department.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDepartmentRepository extends IBaseRepository<Department> {
  findByName: (name: string) => Promise<Department | null>;
}
