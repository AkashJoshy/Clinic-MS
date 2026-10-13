import type { Document, Types } from "mongoose";

export interface IRefreshSessionDocument extends Document {
  userId: Types.ObjectId
  tokenId: string;
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date |  null;
  updatedAt: Date |  null;
}