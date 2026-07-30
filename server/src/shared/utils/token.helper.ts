import { randomBytes } from "node:crypto";

export const generateVerificationToken = (): string => {
    return randomBytes(32).toString("hex")
}
