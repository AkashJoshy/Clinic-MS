import type {
  DoctorSlotsWithDateResponseDto,
  GenerateSlotsDto,
} from "../../../../dto/doctor-clinic.dto.ts";

export interface IGenerateSlotsUseCase {
  excute(data: GenerateSlotsDto): Promise<DoctorSlotsWithDateResponseDto>;
}
