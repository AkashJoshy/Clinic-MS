import { model } from "mongoose";
import { walletSchema } from "./wallet.schema.ts";
import type { IWallet } from "./wallet.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const WalletModel = model<IWallet>(MODEL_NAMES.WALLET, walletSchema);
