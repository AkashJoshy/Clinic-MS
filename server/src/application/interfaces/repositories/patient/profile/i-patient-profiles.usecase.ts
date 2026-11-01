import type { PatientProfileResponseDto } from "../../../../dto/patient.dto.ts";

export interface IPatientProfilesUseCase {
  execute(userId: string): Promise<PatientProfileResponseDto[]>;
}
