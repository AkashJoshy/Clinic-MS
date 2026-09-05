import type { DoctorRegisterDto } from "../../dto/doctor.dto.ts";

export interface IDoctorRegisterUseCase {
  execute(data: DoctorRegisterDto): Promise<void>;
}