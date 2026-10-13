import { model } from "mongoose";
import { counterSchema } from "./counter.schema.ts";

export const CounterModel = model("Counter", counterSchema)