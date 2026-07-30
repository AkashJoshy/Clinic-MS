import type { ModeRoleRef } from "./user.types.ts";

export interface AddressProps {
  id: string | null;
  ownerId: string;
  ownerType: ModeRoleRef;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
