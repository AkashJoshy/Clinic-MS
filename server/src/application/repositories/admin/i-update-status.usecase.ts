import type { UserStatusDto } from "../../dto/admin.dto.ts";
import type { DeletePatientDto } from "../../dto/patient.dto.ts";

export interface IUpdateStatusUseCase {
  execute(data: DeletePatientDto): Promise<UserStatusDto>;
}