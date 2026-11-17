import type {
  DoctorPanDetailsResponseDto,
  UpdateDoctorPanDetailsDto,
} from "../../../../dto/kyc.dto.ts";

export interface IUpdateDoctorPanDetailsUseCase {
  execute(
    userId: string,
    data: UpdateDoctorPanDetailsDto,
    file: Express.Multer.File | string,
  ): Promise<DoctorPanDetailsResponseDto>;
}
