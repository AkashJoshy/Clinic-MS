import type { DayOfWeek } from "../../domain/types/shared.types.ts";


export interface ISlotGenerationService {
  execute(dto: any): any[];
  getDayName(dayIndex: number): DayOfWeek;
}