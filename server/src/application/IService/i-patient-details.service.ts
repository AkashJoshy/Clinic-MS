import type Patient from "../../domain/entities/patient.entity.ts";
import type { PatientFullDetailsDto } from "../dto/shared.dto.ts";

export interface IPatientDetailsService {
  execute(patients: Patient[]): Promise<PatientFullDetailsDto[]>;
}
