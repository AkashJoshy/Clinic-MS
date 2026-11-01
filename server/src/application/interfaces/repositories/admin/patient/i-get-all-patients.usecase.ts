import type { PatientBasicInfoResponseDto } from "../../../../dto/patient.dto.ts";

export interface IGetAllPatientsUseCase {
  execute(): Promise<PatientBasicInfoResponseDto[]>;
}
