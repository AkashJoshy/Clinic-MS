import type { UpdateAddressDto } from "../../dto/shared.dto.ts";

export interface IUpdateAddressUseCase {
  execute(data: UpdateAddressDto): Promise<UpdateAddressDto>;
}