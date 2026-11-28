import type {
  GetPatientDoctorsQueryDto,
  PatientDoctorDetailsResponseDto,
} from "../../../../dto/doctor.dto.ts";
import type { PaginatedResponseDto } from "../../../../dto/shared.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(
    query?: GetPatientDoctorsQueryDto,
  ): Promise<PaginatedResponseDto<PatientDoctorDetailsResponseDto>>;
}

