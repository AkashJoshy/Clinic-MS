import { Doctor } from "../../../../domain/entities/doctor.entity.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type {
  UpdateProfilePictureDto,
  UpdateProfilePictureResponseDto,
} from "../../../dto/patient.dto.ts";
import type { IUpdateProfilePictureUseCase } from "../../../repositories/patient/i-update-profile-picture.usecase.ts";

export class UpdateDoctorProfilePictureUseCase implements IUpdateProfilePictureUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
  ) {}

  async execute(
    data: UpdateProfilePictureDto,
  ): Promise<UpdateProfilePictureResponseDto> {
    const user = await this._userRepository.findById(data.userId);

    const { userId, ownerId, picture } = data;

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    const doctor = await this._doctorRepository.findById(ownerId);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    if (doctor.profilePicture.publicId && doctor.profilePicture.url) {
      let existingImageUrl = {
        publicId: doctor.profilePicture.publicId,
        url: doctor.profilePicture.url,
      };

      let isDeleted = await deleteFromCloudinary(
        existingImageUrl.publicId,
        "image",
      );

      if (!isDeleted) {
        doctor.updateProfilePicture(existingImageUrl);
        throw new InternalServerError(
          "Error while deleting the profile picture",
        );
      }
    }

    const profileUrl = await uploadToCloudinary(
      data.picture.buffer,
      "doctor/image",
      "image",
    );

    doctor.updateProfilePicture(profileUrl);

    const updatedDoctor = await this._doctorRepository.findByIdAndUpdate(
      doctor.id,
      {
        profilePicture: doctor.profilePicture,
      },
    );

    return {
      ownerId: doctor.id,
      pictureUrl: updatedDoctor?.profilePicture.url
        ? updatedDoctor?.profilePicture.url
        : "",
    };
  }
}
