import type { GetDoctorBankDetailsResponseDto } from "../../../../dto/kyc.dto.ts";

export interface IGetDoctorBankDetailsUseCase {
  execute(userId: string): Promise<GetDoctorBankDetailsResponseDto>;
}