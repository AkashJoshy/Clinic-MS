import type { LoginVerificationResponseDTO } from "../../dto/auth.dto.ts";
import type { DoctorRegisterDto } from "../../dto/doctor.dto.ts";

export interface IDoctorRegisterUseCase {
  execute(data: DoctorRegisterDto): Promise<LoginVerificationResponseDTO>;
}