import type { PatientInfoResponseDto } from "../../../../dto/patient.dto.ts";

export interface IGetPatientUseCase {
  execute(patientId: string): Promise<PatientInfoResponseDto | null>;
}
