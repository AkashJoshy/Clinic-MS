import type { DoctorClinicContextDto } from "../dto/shared.dto.ts";

export interface IDoctorClinicContextService {
  executeOne(doctorId: string): Promise<DoctorClinicContextDto[]>;
  executeMany(doctorIds: string[]): Promise<DoctorClinicContextDto[][]>;
}
