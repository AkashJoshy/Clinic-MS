import type { UpdateProfilePictureDto, UpdateProfilePictureResponseDto } from "../../dto/patient.dto.ts";

export interface IUpdateProfilePictureUseCase {
  execute(data: UpdateProfilePictureDto): Promise<UpdateProfilePictureResponseDto>;
}