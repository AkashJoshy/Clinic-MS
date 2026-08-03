import type { PatientBasicInfoDto } from "../../dto/shared.dto.ts";

export interface IGetAllPatientsBasicUseCase {
  execute(): Promise<PatientBasicInfoDto[]>;
}