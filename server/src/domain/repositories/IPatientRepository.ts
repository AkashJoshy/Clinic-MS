import type Patient from "../entities/Patient.js";
import type { IBaseRepository } from "./IBaseRepository.js";


export interface IPatientRepository extends IBaseRepository<Patient> {
    getPatientNumber(): Promise<number>,
    findByUserId(userId: string): Promise<Patient | null>
    findAllByUserId(userId: string): Promise<Patient[] | null>
}