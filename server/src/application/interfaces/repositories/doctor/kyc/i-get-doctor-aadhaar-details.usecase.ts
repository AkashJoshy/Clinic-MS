import type { GetDoctorAadhaarDetailsResponseDto } from "../../../../dto/kyc.dto.ts";

export interface IGetDoctorAadhaarDetailsUseCase {
  execute(userId: string): Promise<GetDoctorAadhaarDetailsResponseDto>;
}