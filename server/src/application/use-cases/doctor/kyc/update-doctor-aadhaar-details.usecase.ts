import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  DoctorAadhaarDetailsResponseDto,
  UpdateDoctorAadhaarDetailsDto,
} from "../../../dto/kyc.dto.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";
import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import type { IUpdateDoctorAadhaarDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-update-doctor-aadhaar-details.usecase.ts";
import { uploadToCloudinary } from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";

export class UpdateDoctorAadhaarDetailsUseCase implements IUpdateDoctorAadhaarDetailsUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(
    userId: string,
    data: UpdateDoctorAadhaarDetailsDto,
    file: Express.Multer.File | string,
  ): Promise<DoctorAadhaarDetailsResponseDto> {
    const { section, ...updatedData } = data;

    const doctor = await this._doctorRepository.findOneBy({
      userId,
    });

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const kyc = await this._kycRepository.findByUserId(doctor.userId);

    if (!kyc || !kyc.id) {
      throw new NotFoundError("Doctor KYC");
    }

    console.log(kyc);

    if (kyc.isPending("KYC_AADHAAR")) {
      throw new ConflictError("KYC_AADHAAR is pending to verify");
    }

    let updatedAadhaarDoc;

    if (typeof file !== "string")
      if (file.mimetype.includes("image")) {
        updatedAadhaarDoc = await uploadToCloudinary(
          file.buffer,
          "doctor/kyc/aadhaar/image",
          "image",
        );
      } else {
        updatedAadhaarDoc = await uploadToCloudinary(
          file.buffer,
          "doctor/kyc/aadhaar/document",
          "raw",
        );
      }

    const encryptedAadhaarNumber = this._kycEncryptionService.encrypt(
      data.aadhaarNumber,
    );

    if (updatedAadhaarDoc) {
      kyc.submitAadhaar({
        ...updatedData,
        aadhaarNumber: encryptedAadhaarNumber,
        aadhaarCardDoc: kyc.aadhaar.aadhaarCardDoc,
      });
    } else {
      kyc.submitAadhaar({
        ...updatedData,
        aadhaarNumber: encryptedAadhaarNumber,
        aadhaarCardDoc: kyc.aadhaar.aadhaarCardDoc,
      });
    }

    const response = await this._kycRepository.findByIdAndUpdate(kyc.id, {
      aadhaar: kyc.aadhaar,
    });

    if (!response) {
      throw new DatabaseError("Error While Updating the Aadhaar Details");
    }

    return {
      nameOnAadhaar: response.aadhaar.nameOnAadhaar,
      aadhaarNumber: kyc.maskedAadhaar(),
      aadhaarCardDoc: response.aadhaar.aadhaarCardDoc.url,
      verificationStatus: response.aadhaar.status,
      updatedAt: response.updatedAt!,
    };
  }
}
