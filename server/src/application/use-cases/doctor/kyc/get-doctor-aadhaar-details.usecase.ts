import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";
import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import type { GetDoctorAadhaarDetailsResponseDto } from "../../../dto/kyc.dto.ts";
import type { IGetDoctorAadhaarDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-get-doctor-aadhaar-details.usecase.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";

export class GetDoctorAadhaarDetailsUseCase implements IGetDoctorAadhaarDetailsUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(userId: string): Promise<GetDoctorAadhaarDetailsResponseDto> {

    const doctor = await this._doctorRepository.findOneBy({ userId })

    if (!doctor ||  !doctor.id) {
        throw new NotFoundError("Doctor")
    }

    const kyc = await this._kycRepository.findByUserId(userId);

    if (!kyc) {
      throw new NotFoundError("Doctor KYC");
    }

    const aadhaarNumber = kyc.aadhaar.aadhaarNumber
      ? this._kycEncryptionService.decrypt(kyc.aadhaar.aadhaarNumber)
      : "";

    return {
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
  }
}
