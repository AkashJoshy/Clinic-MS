import type { SafeAddress } from "../../dto/shared.dto.ts";

export class AddressMapper {
  static toDomain(addressDetails: SafeAddress) {
    const { id, ownerId, addressLine, city, state, country, pincode } =
      addressDetails;

    return {
      id,
      ownerId: ownerId,
      addressLine: addressLine,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };
  }
}
