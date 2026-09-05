import type { PatientProfile } from "../../dto/patient.dto.ts";

export interface IPatientProfilesUseCase {
  execute(userId: string): Promise<PatientProfile[]>;
}