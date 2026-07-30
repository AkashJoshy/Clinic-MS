import type { AddressProps } from "../types/address.types.ts";
import type { ModeRoleRef, Role } from "../types/user.types.ts";

export class Address {
    constructor(
        public id: string | null,
        public ownerId: string,
        public ownerType: ModeRoleRef,
        public addressLine: string,
        public country: string,
        public state: string,
        public city: string,
        public pincode: string,
        public createdAt: Date | null,
        public updatedAt: Date | null,
    ) { }
    
    static create(data: Partial<AddressProps>): Address {
        return new Address(
            data.id ?? null,
            data.ownerId!,
            data.ownerType!,
            data.addressLine ?? '',
            data.country ?? '',
            data.state ?? '',
            data.city ?? '',
            data.pincode ?? '',
            data.createdAt ?? null,
            data.updatedAt ?? null
        )
    }

    static createForOwner(data: Partial<Omit<AddressProps, "ownerType">>, ownerType: ModeRoleRef): Address {
        return this.create({
            ...data,
            ownerType
        })
    }

}

