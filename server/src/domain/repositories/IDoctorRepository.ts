import type { Doctor } from "../entities/Doctor.ts";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IDoctorRepository extends IBaseRepository<Doctor> {
    getDoctorNumber(): Promise<number |  null>
}