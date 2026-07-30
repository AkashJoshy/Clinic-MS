import * as z from "zod"
import { email, password, role } from "../base.schema.ts"

export const loginSchema = z.object({
    email: email,
    password: password,
    role: role
})