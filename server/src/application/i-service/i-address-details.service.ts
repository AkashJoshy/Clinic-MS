import type { ModeRoleRef } from "../../domain/types/user.types.ts";
import type { AddressDetailsResponseDto, SafeAddress } from "../dto/shared.dto.ts";

export interface IAddressDetailsService {
  executeOne(ownerType: ModeRoleRef, ownerId: string): Promise<SafeAddress | null>;
  executeMany(ownerType: ModeRoleRef, ownerIds: string[]): Promise<AddressDetailsResponseDto>;
}
