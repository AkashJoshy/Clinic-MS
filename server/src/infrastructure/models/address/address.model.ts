import { Model, model } from "mongoose";
import type { IAddress } from "./address.types.ts";
import { addressSchema } from "./address.schema.ts";

export const AddressModel: Model<IAddress> = model<IAddress>("Address", addressSchema);
