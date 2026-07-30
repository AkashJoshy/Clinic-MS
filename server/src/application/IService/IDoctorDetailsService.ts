import type { Clinic } from "../../domain/entities/Clinic.ts";
import type { DoctorClinic } from "../../domain/entities/DoctorClinic.ts";
import type { DoctorProfileServiceResponseDto } from "../dto/shared.dto.ts";

export interface IDoctorDetailsService {
  execute(clinicDoctors: DoctorClinic[], allClinics: Clinic[]): Promise<DoctorProfileServiceResponseDto[]>;
}