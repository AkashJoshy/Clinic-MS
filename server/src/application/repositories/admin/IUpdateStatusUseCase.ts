import type { DeletePatientDto } from "../../dto/patient.dto.ts";

export interface IUpdateStatusUseCase {
  execute(data: DeletePatientDto): Promise<string>;
}