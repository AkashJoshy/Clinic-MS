import type { DoctorClinicContextResponseDto } from "../../../dto/doctor-clinic.dto.ts";

export interface IDoctorClinicContextService {
  executeOne(doctorId: string): Promise<DoctorClinicContextResponseDto[]>;
  executeMany(doctorIds: string[]): Promise<DoctorClinicContextResponseDto[][]>;
}
