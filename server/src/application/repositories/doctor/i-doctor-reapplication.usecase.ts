import type { GetReapplicationDetailsResponseDto } from "../../dto/doctor.dto.ts";

export interface IDoctorReapplicationUseCase {
  execute(token: string): Promise<GetReapplicationDetailsResponseDto>;
}