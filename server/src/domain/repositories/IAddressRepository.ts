import type { Address } from "../entities/Address.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IAddressRepository extends IBaseRepository<Address> {
    deleteByUserId(userId: string): Promise<void>;
}