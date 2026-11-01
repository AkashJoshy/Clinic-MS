import type {
  DoctorProfessionalDto,
  DoctorProfessionalResponseDto,
} from "../../../../dto/doctor.dto.ts";

export interface IDoctorProfessionalUseCase {
  execute(data: DoctorProfessionalDto): Promise<DoctorProfessionalResponseDto>;
}
