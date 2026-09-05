import type { Doctor } from "../entities/doctor.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDoctorRepository extends IBaseRepository<Doctor> {
  getDoctorNumber(): Promise<number | null>;
}
