import type {
  CreatePatientProfileDto,
  PatientProfileResponseDto,
} from "../../../../dto/patient.dto.ts";

export interface ICreatePatientProfileUseCase {
  execute(data: CreatePatientProfileDto): Promise<PatientProfileResponseDto>;
}
