import type Patient from "../../domain/entities/Patient.ts";
import type { PatientInfoDto } from "../dto/shared.dto.ts";

export interface IPatientDetailsService {
  execute(patients: Patient[]): Promise<PatientInfoDto[]>
}
