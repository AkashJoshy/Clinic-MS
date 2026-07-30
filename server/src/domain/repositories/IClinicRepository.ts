import type { IBaseRepository } from "./IBaseRepository.js";
import type { Clinic } from "../entities/Clinic.js";

export interface IClinicRepository extends IBaseRepository<Clinic> {
    findByRegistrationNumber(registrationNumber: string): Promise<Clinic | null>
    findNearClinics(longitude: number, latitude: number, radius: number): Promise<Clinic[]>
}