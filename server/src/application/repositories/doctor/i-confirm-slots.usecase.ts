import type { ConfirmSlotsDto } from "../../dto/doctor-clinic.dto.ts";

export interface IConfirmSlotsUseCase {
  execute(data: ConfirmSlotsDto): Promise<void>;
}