import { z } from "zod";
import { password, role, token } from "../base.schema.ts";

export const resetPasswordSchema = z.object({
  token,
  password,
  role,
});