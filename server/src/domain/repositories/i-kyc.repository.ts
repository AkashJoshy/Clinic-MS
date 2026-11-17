import type { Kyc } from "../entities/kyc.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IKycRepository extends IBaseRepository<Kyc> {
  findByUserId(userId: string): Promise<Kyc | null>;
}