import { Model, model } from "mongoose";
import { MODEL_NAMES } from "../model-names.ts";
import { kycSchema } from "./kyc.schema.ts";
import type { IKyc } from "./kyc.types.ts";

export const KycModel: Model<IKyc> = model<IKyc>(MODEL_NAMES.KYC, kycSchema);