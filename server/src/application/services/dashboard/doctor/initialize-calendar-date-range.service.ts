import type { InitializeCalendarDateRangeDto } from "../../../dto/doctor-dashboard.dto.ts";
import type { IInitializeCalendarDateRangeUseCase } from "../../../interfaces/services/dashboard/doctor/i-initialize-calendar-date-range.service.ts";

export class InitializeCalendarDateRangeUseCase
  implements IInitializeCalendarDateRangeUseCase
{
  execute(dto: InitializeCalendarDateRangeDto): Map<string, []> {
    const { from, to } = dto;

    const slotsMap = new Map<string, []>();

    const current = new Date(from);
    const end = new Date(to);

    current.setUTCHours(12, 0, 0, 0);
    end.setUTCHours(12, 0, 0, 0);

    while (current <= end) {
      const dateKey = current.toISOString().slice(0, 10);

      slotsMap.set(dateKey, []);

      current.setUTCDate(current.getUTCDate() + 1);
    }

    return slotsMap;
  }
}
