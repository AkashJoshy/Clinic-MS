import { model } from "mongoose";
import { counterSchema } from "./counter.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const CounterModel = model(MODEL_NAMES.COUNTER, counterSchema);
