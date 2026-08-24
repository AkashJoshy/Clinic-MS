import type RefreshSession from "../entities/RefreshSession.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IRefreshSessionRepository extends IBaseRepository<RefreshSession> {
  findByTokenId(tokenId: string): Promise<RefreshSession | null>;

  findAllByUserId(userId: string): Promise<RefreshSession[]>;
}
