import type { GetDoctorPanDetailsResponseDto } from "../../../../dto/kyc.dto.ts";

export interface IGetDoctorPanDetailsUseCase {
  execute(userId: string): Promise<GetDoctorPanDetailsResponseDto>;
}