import type { UpdateProfilePictureDto, UpdateProfilePictureResponseDto } from "../../dto/patient.dto.ts";

export interface IUpdatePatientProfilePictureUseCase {
  execute(data: UpdateProfilePictureDto): Promise<UpdateProfilePictureResponseDto>;
}