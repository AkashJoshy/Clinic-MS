import Patient from "../../../../domain/entities/Patient.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type {
  UpdateProfilePictureDto,
  UpdateProfilePictureResponseDto,
} from "../../../dto/patient.dto.ts";
import type { IUpdatePatientProfilePictureUseCase } from "../../../repositories/patient/IUpdatePatientProfilePicture.UseCase.ts";

export class UpdatePatientProfilePictureUseCase implements IUpdatePatientProfilePictureUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _patientRepository: IPatientRepository,
  ) {}

  async execute(
    data: UpdateProfilePictureDto,
  ): Promise<UpdateProfilePictureResponseDto> {
    const user = await this._userRepository.findById(data.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Patient");
    }

    const patient = await this._patientRepository.findByUserId(user.id);

    if (!patient || !patient.id) {
      throw new NotFoundError("Patient");
    }

    if (patient.imageUrl.publicId && patient.imageUrl.url) {
      let existingImageUrl = {
        publicId: patient.imageUrl.publicId,
        url: patient.imageUrl.url,
      };

      let isDeleted = await deleteFromCloudinary(
        existingImageUrl.publicId,
        "image",
      );

      console.log(`Image Deleted`)

      if (!isDeleted) {
        patient.updateProfilePicture(existingImageUrl);
        throw new InternalServerError(
          "Error while deleting the profile picture",
        );
      }
    }

    const profileUrl = await uploadToCloudinary(
      data.picture.buffer,
      "patient/image",
      "image",
    );

    patient.updateProfilePicture(profileUrl);

    await this._patientRepository.findByIdAndUpdate(patient.id, {
      imageUrl: patient.imageUrl,
    });

    return {
      ownerId: patient.id,
      pictureUrl: patient.imageUrl.url,
    };
  }
}
