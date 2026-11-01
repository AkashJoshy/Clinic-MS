import type { DoctorDetailsCardResponseDto } from "../../../../dto/doctor.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(): Promise<DoctorDetailsCardResponseDto[]>;
}
