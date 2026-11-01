import type {
  DoctorExistsDto,
  DoctorExistsResponseDto,
} from "../../../dto/doctor.dto.ts";

export interface IDoctorExistsService {
  execute(data: DoctorExistsDto): Promise<DoctorExistsResponseDto>;
}
