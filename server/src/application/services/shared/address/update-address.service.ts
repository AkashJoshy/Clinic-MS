import type { IUpdateAddressService } from "../../../interfaces/services/shared/address/i-update-address.service.ts";
import type { Address } from "../../../../domain/entities/address.entity.ts";
import type {
  FullAddressResponseDto,
  UpdateAddressEntityDto,
} from "../../../dto/shared.dto.ts";

export class UpdateAddressService implements IUpdateAddressService {
  async execute(data: UpdateAddressEntityDto): Promise<FullAddressResponseDto> {
    const { address, updates } = data;
    const { addressLine, city, country, pincode, state } = updates;

    address.update({
      ...(addressLine !== undefined && { addressLine }),
      ...(city !== undefined && { city }),
      ...(country !== undefined && { country }),
      ...(pincode !== undefined && { pincode }),
      ...(state !== undefined && { state }),
    });

    return address;
  }
}
