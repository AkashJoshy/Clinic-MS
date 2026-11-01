import type { DoctorProfileInfoResponseDto } from "../../../../dto/doctor.dto.ts";

export interface IDoctorProfileUseCase {
  execute(userId: string): Promise<DoctorProfileInfoResponseDto>;
}
