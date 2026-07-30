import mongoose from "mongoose";
import { Address } from "../../domain/entities/Address.ts";
import type { IAddressRepository } from "../../domain/repositories/IAddressRepository.ts";
import { AddressModel, type IAddress } from "../models/address.model.ts";
import { MongooseBaseRepository } from "./base/mongoose-base.repository.ts";

export class MongooseAddressRepository extends MongooseBaseRepository<Address, IAddress> implements IAddressRepository {
    
    constructor() {
        super(AddressModel)
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.model.deleteOne({ userId: new mongoose.Types.ObjectId(userId) });
    }

    protected toDomain(doc: IAddress): Address {
        return Address.create({
            id: doc._id.toString(),
            ownerId: doc.ownerId.toString(),
            ownerType: doc.ownerType,
            addressLine: doc.addressLine,
            country: doc.country,
            state: doc.state,
            city: doc.city,
            pincode: doc.pincode,
            createdAt: doc.createdAt ?? null,
            updatedAt: doc.updatedAt ?? null,
        })
    }
    
    protected toPersistence(entity: Address): Partial<IAddress> {
        return {
            ownerId: new mongoose.Types.ObjectId(entity.ownerId),
            ownerType: entity.ownerType,
            addressLine: entity.addressLine,
            country: entity.country,
            state: entity.state,
            city: entity.city,
            pincode: entity.pincode,
            createdAt: entity.createdAt ?? null,
            updatedAt: entity.updatedAt ?? null
        };
    }
}