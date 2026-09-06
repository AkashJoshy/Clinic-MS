import type { Address } from "../entities/address.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IAddressRepository extends IBaseRepository<Address> {
  deleteByUserId(userId: string): Promise<void>;
}
