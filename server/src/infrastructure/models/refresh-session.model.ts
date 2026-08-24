import { Schema, model, type Document, Types } from "mongoose";

export interface IRefreshSessionDocument extends Document {
  userId: Types.ObjectId
  tokenId: string;
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date |  null;
  updatedAt: Date |  null;
}

const refreshSessionSchema = new Schema<IRefreshSessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tokenId: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revoked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

refreshSessionSchema.index(
    { expiresAt: 1 }, 
    { expireAfterSeconds: 0 }
)

const RefreshSessionModel = model<IRefreshSessionDocument>(
  "RefreshSession",
  refreshSessionSchema
);

export default RefreshSessionModel;