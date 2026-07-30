import { z } from "zod";
import { token } from "../base.schema.ts";

export const resendOtpSchema = z.object({
  token: token,
});
