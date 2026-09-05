import type { Department } from "../entities/department.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDepartmentRepository extends IBaseRepository<Department> {
  findByName: (name: string) => Promise<Department | null>;
}
