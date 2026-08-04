import type { DeletePatientDto } from "../../dto/patient.dto.ts";

export interface IUpdatePatientStatusUseCase {
  execute(data: DeletePatientDto): Promise<string>;
}