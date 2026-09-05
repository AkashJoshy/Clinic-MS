import type { CreatePatientProfileDto, PatientProfile } from "../../dto/patient.dto.ts";

export interface ICreatePatientProfileUseCase {
  execute(data: CreatePatientProfileDto): Promise<PatientProfile>;
}