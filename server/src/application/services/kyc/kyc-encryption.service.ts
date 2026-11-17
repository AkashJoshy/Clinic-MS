import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import type { IKycEncryptionService } from "../../interfaces/services/kyc/ikyc-encryption.service.ts";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const VERSION = "v1";

const getEncryptionKey = (): Buffer => {
  const key = process.env.KYC_ENCRYPTION_KEY;

  if (!key || !/^[a-fA-F0-9]{64}$/.test(key)) {
    throw new Error("Invalid KYC encryption key configuration");
  }

  return Buffer.from(key, "hex");
};

export class KycEncryptionService implements IKycEncryptionService {
  encrypt(value: string): string {
    const key = getEncryptionKey();
    const iv = randomBytes(IV_LENGTH);

    const cipher = createCipheriv(ALGORITHM, key, iv);

    const encrypted = Buffer.concat([
      cipher.update(value, "utf8"),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return [
      VERSION,
      iv.toString("base64url"),
      authTag.toString("base64url"),
      encrypted.toString("base64url"),
    ].join(".");
  }

  decrypt(encryptedValue: string): string {
    const key = getEncryptionKey();

    const [version, ivEncoded, authTagEncoded, encryptedEncoded] =
      encryptedValue.split(".");

    if (
      version !== VERSION ||
      !ivEncoded ||
      !authTagEncoded ||
      !encryptedEncoded
    ) {
      throw new Error("Invalid encrypted KYC data format");
    }

    const iv = Buffer.from(ivEncoded, "base64url");
    const authTag = Buffer.from(authTagEncoded, "base64url");
    const encrypted = Buffer.from(encryptedEncoded, "base64url");

    if (iv.length !== IV_LENGTH || authTag.length !== AUTH_TAG_LENGTH) {
      throw new Error("Invalid encrypted KYC data");
    }

    try {
      console.log(iv);
      const decipher = createDecipheriv(ALGORITHM, key, iv);

      decipher.setAuthTag(authTag);

      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]);

      return decrypted.toString("utf8");
    } catch (err: any) {
      console.error("Decrypt failure:", err);
      throw new Error("Unable to decrypt KYC data");
    }
  }
}
