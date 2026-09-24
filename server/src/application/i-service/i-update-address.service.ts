import type { Address } from "../../domain/entities/address.entity.ts";
import type { UpdateAddressEntityDto } from "../dto/shared.dto.ts";

export interface IUpdateAddressService {
  execute(data: UpdateAddressEntityDto): Promise<Address>;
}
