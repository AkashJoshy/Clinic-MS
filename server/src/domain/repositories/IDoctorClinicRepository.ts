import type { DoctorClinic } from "../entities/DoctorClinic.ts";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IDoctorClinicRepository extends IBaseRepository<DoctorClinic> {
    findByClinicIds(ids: string[]): Promise<DoctorClinic[] | []>;
}