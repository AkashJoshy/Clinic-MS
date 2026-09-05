import type RefreshSession from "../entities/refresh-session.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IRefreshSessionRepository extends IBaseRepository<RefreshSession> {
  findByTokenId(tokenId: string): Promise<RefreshSession | null>;

  findAllByUserId(userId: string): Promise<RefreshSession[]>;
}
