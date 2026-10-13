import type mongoose from "mongoose";
import type { ModeRoleRef } from "../../../domain/types/user.types.ts";
import type { Document } from "mongoose";

export interface IAddress extends Document {
  ownerId: mongoose.Types.ObjectId;
  ownerType: ModeRoleRef;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}