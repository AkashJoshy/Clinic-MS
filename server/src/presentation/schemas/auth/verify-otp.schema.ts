import { z } from "zod";
import { otp, token } from "../base.schema.ts";

export const verifyOtpSchema = z.object({
  token: token,
  otp: otp,
});