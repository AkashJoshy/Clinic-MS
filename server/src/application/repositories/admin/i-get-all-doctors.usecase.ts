import type { DoctorDetailsCardDto } from "../../dto/doctor.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(): Promise<DoctorDetailsCardDto[]>;
}