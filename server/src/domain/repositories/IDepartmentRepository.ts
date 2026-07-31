import type { Department } from "../entities/Department.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";


export interface IDepartmentRepository extends IBaseRepository<Department> {
    findByName: (name: string) => Promise<Department | null>
}