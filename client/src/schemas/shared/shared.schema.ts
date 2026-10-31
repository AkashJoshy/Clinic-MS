import type z from "zod";
import { addMoneySchema } from "./add-money.schema";


export type AddMoneyFormData = z.infer<typeof addMoneySchema>