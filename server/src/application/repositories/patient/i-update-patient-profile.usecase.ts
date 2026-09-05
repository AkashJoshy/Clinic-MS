import type { UpdatePatientDto } from "../../dto/patient.dto.ts";

export interface IUpdatePatientProfileUseCase {
  execute(data: UpdatePatientDto): Promise<boolean>;
}