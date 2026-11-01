import type { EmergencyContactDto, EmergencyContactResponseDto } from "../../../../dto/patient.dto.ts";

export interface IUpdateEmergencyContactUseCase {
  execute(data: EmergencyContactDto): Promise<EmergencyContactResponseDto>;
}
