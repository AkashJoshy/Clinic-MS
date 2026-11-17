import type {
  DoctorBankDetailsResponseDto,
  UpdateDoctorBankDetailsDto,
} from "../../../../dto/kyc.dto.ts";

export interface IUpdateDoctorBankDetailsUseCase {
  execute(
    userId: string,
    data: UpdateDoctorBankDetailsDto,
  ): Promise<DoctorBankDetailsResponseDto>;
}
