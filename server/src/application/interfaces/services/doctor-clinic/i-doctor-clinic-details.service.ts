import type { SafeDoctorClinicResponseDto } from "../../../dto/doctor-clinic.dto.ts";
import type { DoctorClinicDetailsResponseDto } from "../../../dto/shared.dto.ts";

export interface IDoctorClinicDetailsService {
  executeOne(doctorId: string): Promise<SafeDoctorClinicResponseDto[]>;
  executeMany(doctorIds: string[]): Promise<DoctorClinicDetailsResponseDto>;
}
