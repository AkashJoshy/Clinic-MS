import type {
  GetAllPatientsQueryDto,
  PatientBasicInfoResponseDto,
} from "../../../../dto/patient.dto.ts";
import type { PaginatedResponseDto } from "../../../../dto/shared.dto.ts";

export interface IGetAllPatientsUseCase {
  execute(
    query: GetAllPatientsQueryDto,
  ): Promise<PaginatedResponseDto<PatientBasicInfoResponseDto>>;
}
