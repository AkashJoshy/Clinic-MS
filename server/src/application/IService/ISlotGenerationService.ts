import type Slot from "../../domain/entities/Slot.ts";
import type { DayOfWeek } from "../../domain/types/shared.types.ts";
import type { SlotGenerationDto } from "../dto/doctor.dto.ts";


export interface ISlotGenerationService {
  execute(dto: SlotGenerationDto): Slot[];
  getDayName(dayIndex: number): DayOfWeek;
}