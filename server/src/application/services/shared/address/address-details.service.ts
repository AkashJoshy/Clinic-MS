import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { ModeRoleRef } from "../../../../domain/types/user.types.ts";
import type {
  AddressDetailsResponseDto,
  AddressLookupResultDto,
} from "../../../dto/shared.dto.ts";
import type { IAddressDetailsService } from "../../../interfaces/services/shared/address/i-address-details.service.ts";

export class AddressDetailsService implements IAddressDetailsService {
  constructor(private _addressRepository: IAddressRepository) {}

  async executeOne(
    ownerType: ModeRoleRef,
    ownerId: string,
  ): Promise<AddressDetailsResponseDto | null> {
    const address = await this._addressRepository.findOneBy({
      ownerId,
      ownerType,
    });

    if (!address) return null;

    return address;
  }

  async executeMany(
    ownerType: ModeRoleRef,
    ownerIds: string[],
  ): Promise<AddressLookupResultDto> {
    const addresses = await this._addressRepository.findByIds(
      "ownerId",
      ownerIds,
    );

    const addressMap = new Map(addresses.map((a) => [a.ownerId, a]));

    return {
      addresses,
      addressMap,
    };
  }
}
