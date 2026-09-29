import type { IAddressRepository } from "../../domain/repositories/i-address.repository.ts";
import type { ModeRoleRef } from "../../domain/types/user.types.ts";
import type {
  AddressDetailsResponseDto,
  SafeAddress,
} from "../dto/shared.dto.ts";
import type { IAddressDetailsService } from "../i-service/i-address-details.service.ts";

export class AddressDetailsService implements IAddressDetailsService {
  constructor(private _addressRepository: IAddressRepository) {}

  async executeOne(
    ownerType: ModeRoleRef,
    ownerId: string,
  ): Promise<SafeAddress | null> {
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
  ): Promise<AddressDetailsResponseDto> {
    const addressess = await this._addressRepository.findByIds(
      "ownerId",
      ownerIds,
    );

    const addressMap = new Map(addressess.map((a) => [a.ownerId, a]));

    return {
      addressess,
      addressMap,
    };
  }
}
