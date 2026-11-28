import type {
  GetAllPatientsQueryDto,
  PatientBasicInfoResponseDto,
} from "../../../../dto/patient.dto.ts";
import type { PaginatedResponseDto } from "../../../../dto/shared.dto.ts";

export interface IGetAllPatientsBasicUseCase {
  execute(
    query: GetAllPatientsQueryDto,
  ): Promise<PaginatedResponseDto<PatientBasicInfoResponseDto>>;
}
