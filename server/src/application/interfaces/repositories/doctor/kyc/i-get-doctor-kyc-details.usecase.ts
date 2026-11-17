import type { GetDoctorKycDetailsResponseDto } from "../../../../dto/kyc.dto.ts";

export interface IGetDoctorKycDetailsUseCase {
  execute(userId: string): Promise<GetDoctorKycDetailsResponseDto>;
}
