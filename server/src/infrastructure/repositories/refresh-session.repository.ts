import { Types } from "mongoose";
import RefreshSession from "../../domain/entities/RefreshSession.ts";
import type { IRefreshSessionRepository } from "../../domain/repositories/IRefreshSessionRepository.ts";
import type { IRefreshSessionDocument } from "../models/refresh-session.model.ts";
import RefreshSessionModel from "../models/refresh-session.model.ts";
import { BaseRepository } from "./base/base.repository.ts";

export class RefreshSessionRepository
  extends BaseRepository<RefreshSession, IRefreshSessionDocument>
  implements IRefreshSessionRepository
{
  constructor() {
    super(RefreshSessionModel);
  }

  protected toDomain(doc: IRefreshSessionDocument): RefreshSession {
    return RefreshSession.create({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      tokenId: doc.tokenId,
      expiresAt: doc.expiresAt,
      revoked: doc.revoked,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(
    session: RefreshSession,
  ): Partial<IRefreshSessionDocument> {
    return {
      userId: new Types.ObjectId(session.userId),
      tokenId: session.tokenId,
      expiresAt: session.expiresAt,
      revoked: session.revoked,
      createdAt: session.createdAt ?? null,
      updatedAt: session.updatedAt ?? null,
    };
  }

  async findByTokenId(tokenId: string): Promise<RefreshSession | null> {
    if (!tokenId) return null;

    const refreshDoc = await RefreshSessionModel.findOne({ tokenId });

    if (!refreshDoc) return null;

    return this.toDomain(refreshDoc);
  }

  async findAllByUserId(
    userId: string,
    isActive?: boolean,
  ): Promise<RefreshSession[]> {
    if (!userId) return [];

    const revoked = isActive ? isActive : false;

    const refreshDocs = await RefreshSessionModel.find({ userId, revoked });

    return refreshDocs.map((doc) => this.toDomain(doc));
  }
}
