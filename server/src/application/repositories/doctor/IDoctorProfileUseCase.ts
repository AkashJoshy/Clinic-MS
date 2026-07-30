import type { DoctorInfo } from "../../dto/doctor.dto.ts";
import type { PatientProfile } from "../../dto/patient.dto.ts";

export interface IDoctorProfileUseCase {
  execute(userId: string): Promise<DoctorInfo>;
}