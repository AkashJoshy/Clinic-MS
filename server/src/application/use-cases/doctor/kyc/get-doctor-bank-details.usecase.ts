import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";
import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import type { GetDoctorBankDetailsResponseDto } from "../../../dto/kyc.dto.ts";
import type { IGetDoctorBankDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-get-doctor-bank-details.usecase.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";

export class GetDoctorBankDetailsUseCase
  implements IGetDoctorBankDetailsUseCase
{
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(userId: string): Promise<GetDoctorBankDetailsResponseDto> {
    const kyc = await this._kycRepository.findByUserId(userId);

    if (!kyc) {
      throw new NotFoundError("Doctor KYC");
    }

    const accountNumber = this._kycEncryptionService.decrypt(
      kyc.bank.accountNumber,
    );

    return {
      section: "KYC_BANK",
      accountHolderName: kyc.bank.accountHolderName,
      maskedAccountNumber: `********${accountNumber.slice(-4)}`,
      accountNumber,
      bankName: kyc.bank.bankName,
      accountType: kyc.bank.accountType,
      ifscCode: kyc.bank.ifscCode,
      status: kyc.bank.status,
      rejectionReason: kyc.bank.rejectionReason,
      updatedAt: kyc.updatedAt!,
    };
  }
}