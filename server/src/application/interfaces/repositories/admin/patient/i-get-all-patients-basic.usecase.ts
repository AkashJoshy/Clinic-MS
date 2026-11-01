import type { PatientBasicInfoResponseDto } from "../../../../dto/patient.dto.ts";

export interface IGetAllPatientsBasicUseCase {
  execute(): Promise<PatientBasicInfoResponseDto[]>;
}
