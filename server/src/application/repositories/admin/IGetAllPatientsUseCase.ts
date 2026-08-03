import type { PatientBasicInfoDto } from "../../dto/shared.dto.ts";

export interface IGetAllPatientsUseCase {
  execute(): Promise<PatientBasicInfoDto[]>;
}