import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUpdateDoctorPanDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-update-doctor-pan-details.usecase.ts";
import type {
  UpdateDoctorPanDetailsDto,
  DoctorPanDetailsResponseDto,
} from "../../../dto/kyc.dto.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";
import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import { uploadToCloudinary } from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";

export class UpdateDoctorPanDetailsUseCase implements IUpdateDoctorPanDetailsUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(
    userId: string,
    data: UpdateDoctorPanDetailsDto,
    file: Express.Multer.File | string,
  ): Promise<DoctorPanDetailsResponseDto> {
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

    if (kyc.isPending(data.section)) {
      throw new ConflictError(`${data.section} is pending to verify`);
    }

    const { section, status, ...updatedData } = data;

    let newPanCardDoc;

    if (typeof file !== "string") {
      if (file.mimetype.includes("image")) {
        newPanCardDoc = await uploadToCloudinary(
          file.buffer,
          "doctor/kyc/pan/image",
          "image",
        );
      } else {
        newPanCardDoc = await uploadToCloudinary(
          file.buffer,
          "doctor/kyc/pan/document",
          "raw",
        );
      }
    }

    if (newPanCardDoc) {
      kyc.submitPan({
        ...updatedData,
        panCardDoc: newPanCardDoc,
      });
    } else {
      kyc.submitPan({
        ...updatedData,
        panCardDoc: kyc.pan.panCardDoc,
      });
    }

    const encryptedPanNumber = this._kycEncryptionService.encrypt(
      kyc.pan.panNumber,
    );

    const response = await this._kycRepository.findByIdAndUpdate(kyc.id, {
      pan: { ...kyc.pan, panNumber: encryptedPanNumber },
    });

    if (!response) {
      throw new DatabaseError("Error While Updating the PAN Details");
    }

    return {
      panImageUrl: response.pan.panCardDoc.url,
      maskedPanNumber: kyc.maskedPan(),
      verificationStatus: response.pan.status,
      updatedAt: response.updatedAt!,
    };
  }
}
