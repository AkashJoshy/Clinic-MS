import type { UpdateEmergencyContactDto } from "../../dto/patient.dto.ts";

export interface IUpdateEmergencyContactUseCase {
  execute(data: UpdateEmergencyContactDto): Promise<UpdateEmergencyContactDto>;
}

