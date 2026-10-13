import { model } from "mongoose";
import type { ISlot } from "./slot.types.ts";
import { SlotSchema } from "./slot.schema.ts";

export const SlotModel = model<ISlot>("Slot", SlotSchema);
