import { z } from "zod";
import { email, fullName, password, phone, role } from "../base.schema.ts";

export const registerSchema = z.object({
  fullName: fullName,
  email: email,
  password: password,
  phone: phone,
  role: role
});