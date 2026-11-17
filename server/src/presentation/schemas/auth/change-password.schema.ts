import { z } from "zod";
import { password } from "../base.schema.ts";

export const changePasswordSchema = z.object({
  currentPassword: password,
  newPassword: password,
});
