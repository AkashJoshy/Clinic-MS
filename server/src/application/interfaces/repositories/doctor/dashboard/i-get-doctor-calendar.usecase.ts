import type { Slot } from "../../../../../domain/entities/slot.entity.ts";
import type { GetDoctorCalendarDto, GetDoctorCalendarResponseDto } from "../../../../dto/doctor-dashboard.dto.ts";

export interface IGetDoctorCalendarUseCase {
  execute(dto: GetDoctorCalendarDto): Promise<GetDoctorCalendarResponseDto>;
}
