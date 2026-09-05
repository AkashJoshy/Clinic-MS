import type { DoctorInfo } from "../../dto/doctor.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(): Promise<DoctorInfo[]>;
}