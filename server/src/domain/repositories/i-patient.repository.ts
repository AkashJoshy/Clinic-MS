import type Patient from "../entities/patient.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IPatientRepository extends IBaseRepository<Patient> {
  getPatientNumber(): Promise<number>;
  findByUserId(userId: string): Promise<Patient | null>;
  findAllByUserId(userId: string): Promise<Patient[] | null>;
}
