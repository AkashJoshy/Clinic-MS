import type { SafeDoctorClinic } from "../dto/doctor-clinic.dto.ts";
import type { DoctorClinicDetailsDto } from "../dto/shared.dto.ts";

export interface IDoctorClinicDetailsService {
  executeOne(doctorId: string): Promise<SafeDoctorClinic[]>;
  executeMany(doctorIds: string[]): Promise<DoctorClinicDetailsDto>;
}
