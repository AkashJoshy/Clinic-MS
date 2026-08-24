import type { SignOptions } from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import type { StringValue } from "ms";

export const generateVerificationToken = (): string => {
  return randomBytes(32).toString("hex");
};

export const narrowedExpiresIn = (
  value: string,
): Exclude<SignOptions["expiresIn"], undefined> => {
  return value as Exclude<SignOptions["expiresIn"], undefined>;
};

export const tokenSignInOptions = (expiresIn: number | StringValue): SignOptions => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn,
  }
  return options
}
