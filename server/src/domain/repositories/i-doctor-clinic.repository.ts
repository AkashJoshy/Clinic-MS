import type { DoctorClinic } from "../entities/doctor-clinic.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDoctorClinicRepository extends IBaseRepository<DoctorClinic> {
  findByClinicIds(ids: string[]): Promise<DoctorClinic[] | []>;
}
