import type {
  DoctorAadhaarDetailsResponseDto,
  UpdateDoctorAadhaarDetailsDto,
} from "../../../../dto/kyc.dto.ts";

export interface IUpdateDoctorAadhaarDetailsUseCase {
  execute(
    userId: string,
    data: UpdateDoctorAadhaarDetailsDto,
    file: Express.Multer.File | string,
  ): Promise<DoctorAadhaarDetailsResponseDto>;
}
