import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";

import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import type { GetDoctorKycDetailsResponseDto } from "../../../dto/kyc.dto.ts";
import type { IGetDoctorKycDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-get-doctor-kyc-details.usecase.ts";

export class GetDoctorKycDetailsUseCase implements IGetDoctorKycDetailsUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(userId: string): Promise<GetDoctorKycDetailsResponseDto> {
    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const kyc = await this._kycRepository.findByUserId(userId);

    if (!kyc) {
      throw new NotFoundError("Doctor KYC");
    }

    const panNumber = kyc.pan.panNumber
      ? this._kycEncryptionService.decrypt(kyc.pan.panNumber)
      : "";

    const pan: GetDoctorKycDetailsResponseDto["pan"] = {
      section: "KYC_PAN",
      maskedPanNumber: panNumber
        ? `${panNumber.slice(0, 2)}*****${panNumber.slice(-2)}`
        : "",
      panNumber,
      nameOnPan: kyc.pan.nameOnPan,
      dateOfBirth: kyc.pan.dateOfBirth,
      panCardDoc: kyc.pan.panCardDoc.url,
      status: kyc.pan.status,
      rejectionReason: kyc.pan.rejectionReason,
      updatedAt: kyc.updatedAt!,
    };

    const accountNumber = kyc.bank.accountNumber
      ? this._kycEncryptionService.decrypt(kyc.bank.accountNumber)
      : "";

    const bank: GetDoctorKycDetailsResponseDto["bank"] = {
      section: "KYC_BANK",
      accountHolderName: kyc.bank.accountHolderName,
      maskedAccountNumber: accountNumber
        ? `********${accountNumber.slice(-4)}`
        : "",
      accountNumber,
      bankName: kyc.bank.bankName,
      accountType: kyc.bank.accountType,
      ifscCode: kyc.bank.ifscCode,
      status: kyc.bank.status,
      rejectionReason: kyc.bank.rejectionReason,
      updatedAt: kyc.updatedAt!,
    };

    const aadhaarNumber = kyc.aadhaar.aadhaarNumber
      ? this._kycEncryptionService.decrypt(kyc.aadhaar.aadhaarNumber)
      : "";

    const aadhaar: GetDoctorKycDetailsResponseDto["aadhaar"] = {
      section: "KYC_AADHAAR",
      nameOnAadhaar: kyc.aadhaar.nameOnAadhaar,
      maskedAadhaarNumber: aadhaarNumber
        ? `XXXX XXXX ${aadhaarNumber.slice(-4)}`
        : "",
      aadhaarNumber,
      aadhaarCardDoc: kyc.aadhaar.aadhaarCardDoc.url,
      status: kyc.aadhaar.status,
      rejectionReason: kyc.aadhaar.rejectionReason,
      updatedAt: kyc.updatedAt!,
    };

    return {
      pan,
      bank,
      aadhaar,
    };
  }
}
