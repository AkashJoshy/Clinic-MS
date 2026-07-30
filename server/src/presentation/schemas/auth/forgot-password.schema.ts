import { z } from "zod";
import { email, role } from "../base.schema.ts";

export const forgotPasswordSchema = z.object({
  email,
  role,
});
