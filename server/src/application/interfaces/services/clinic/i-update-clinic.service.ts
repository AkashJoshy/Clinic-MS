import type {
  ClinicEntityDto,
  ClinicEntityResponseDto,
} from "../../../dto/clinic.dto.ts";

export interface IUpdateClinicService {
  execute(data: ClinicEntityDto): Promise<ClinicEntityResponseDto>;
}
