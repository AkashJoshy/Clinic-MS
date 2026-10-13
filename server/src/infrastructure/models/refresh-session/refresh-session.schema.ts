import { Schema } from "mongoose";
import type { IRefreshSessionDocument } from "./refresh-session.types.ts";

export const refreshSessionSchema = new Schema<IRefreshSessionDocument>(
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