import { Model, model } from "mongoose";
import type { IAddress } from "./address.types.ts";
import { addressSchema } from "./address.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const AddressModel: Model<IAddress> = model<IAddress>(
  MODEL_NAMES.ADDRESS,
  addressSchema,
);
