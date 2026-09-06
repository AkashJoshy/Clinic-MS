import type { IBaseRepository } from "./i-base.repository.ts";
import type { Clinic } from "../entities/clinic.entity.ts";

export interface IClinicRepository extends IBaseRepository<Clinic> {
  findByRegistrationNumber(registrationNumber: string): Promise<Clinic | null>;
  findNearClinics(
    longitude: number,
    latitude: number,
    radius: number,
  ): Promise<Clinic[]>;
}
