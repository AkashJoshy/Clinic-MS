import { model } from "mongoose";
import type { ISlot } from "./slot.types.ts";
import { SlotSchema } from "./slot.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const SlotModel = model<ISlot>(MODEL_NAMES.SLOT, SlotSchema);
