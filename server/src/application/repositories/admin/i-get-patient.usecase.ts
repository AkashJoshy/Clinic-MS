import type { PatientInfoDto } from "../../dto/shared.dto.ts";

export interface IGetPatientUseCase {
  execute(patientId: string): Promise<PatientInfoDto | null>;
}