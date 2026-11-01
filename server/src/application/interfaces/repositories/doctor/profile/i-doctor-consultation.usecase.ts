import type {
  DoctorConsultationDto,
  DoctorConsultationResponseDto,
} from "../../../../dto/doctor.dto.ts";

export interface IDoctorConsultationUseCase {
  execute(data: DoctorConsultationDto): Promise<DoctorConsultationResponseDto>;
}
