import type { PatientDoctorDetailsResponseDto } from "../../../../dto/doctor.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(): Promise<PatientDoctorDetailsResponseDto[]>;
}
