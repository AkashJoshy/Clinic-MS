import type { InitializeCalendarDateRangeDto } from "../../../../dto/doctor-dashboard.dto.ts";

export interface IInitializeCalendarDateRangeUseCase {
  execute<T>(dto: InitializeCalendarDateRangeDto): Map<string, T[]>;
}
