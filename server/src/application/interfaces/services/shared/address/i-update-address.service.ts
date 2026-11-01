import type { FullAddressResponseDto, UpdateAddressEntityDto } from "../../../../dto/shared.dto.ts";

export interface IUpdateAddressService {
  execute(data: UpdateAddressEntityDto): Promise<FullAddressResponseDto>;
}
