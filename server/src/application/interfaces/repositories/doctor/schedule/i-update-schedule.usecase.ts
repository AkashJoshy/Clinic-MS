import type {
  DoctorScheduleResponseDto,
  UpdateScheduleDto,
} from "../../../../dto/doctor-clinic.dto.ts";

export interface IUpdateScheduleUseCase {
  execute(data: UpdateScheduleDto): Promise<DoctorScheduleResponseDto>;
}
