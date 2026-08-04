import type { UpdateAddressDto } from "../../dto/shared.dto.ts";

export interface IUpdatePatientProfileAddressUseCase {
  execute(data: UpdateAddressDto): Promise<boolean>;
}