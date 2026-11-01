import type { ModeRoleRef } from "../../../../../domain/types/user.types.ts";
import type {
  AddressDetailsResponseDto,
  AddressLookupResultDto,
} from "../../../../dto/shared.dto.ts";

export interface IAddressDetailsService {
  
  executeOne(
    ownerType: ModeRoleRef,
    ownerId: string,
  ): Promise<AddressDetailsResponseDto | null>;

  executeMany(
    ownerType: ModeRoleRef,
    ownerIds: string[],
  ): Promise<AddressLookupResultDto>;
}
