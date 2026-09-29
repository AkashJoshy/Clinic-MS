import type { PatientDoctorDetailsCardDto } from "../../dto/doctor.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(): Promise<PatientDoctorDetailsCardDto[]>;
}