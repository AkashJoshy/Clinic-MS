
import type { Document, Types } from "mongoose";
import type { WalletOwnerModel, WalletOwnerType, WalletStatus } from "../../../domain/types/wallet.types.ts";


export interface IWallet extends Document {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  ownerType: WalletOwnerType;
  ownerModel: WalletOwnerModel;
  balance: number;
  currency: "INR";
  status: WalletStatus;
  createdAt: Date;
  updatedAt: Date;
}
