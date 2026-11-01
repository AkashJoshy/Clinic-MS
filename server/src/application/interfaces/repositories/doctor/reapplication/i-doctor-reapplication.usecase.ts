import type { ReapplicationResponseDto } from "../../../../dto/doctor.dto.ts";

export interface IDoctorReapplicationUseCase {
  execute(token: string): Promise<ReapplicationResponseDto>;
}
