import * as z from "zod";
import { UPDATE_METHODS } from "../../../domain/constants/shared.constants.ts";

export const updateUserSchema = z.object({
  method: z.enum(UPDATE_METHODS, {
    message: "Invalid user action"
  }),
});
