import argon2 from "argon2";
import type { IHashService } from "../../domain/services/hashService.ts";

export class ArgonHashService implements IHashService {
  async hash(value: string, label: string): Promise<string | undefined> {
    try {
      const hash = await argon2.hash(value, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
      return hash;
    } catch (error: any) {
      throw new Error(`${label} doesn't match`);
    }
  }

  async compare(
    value: string,
    hashedValue: string,
    label: string,
  ): Promise<boolean | undefined> {
    try {
      if (await argon2.verify(hashedValue, value)) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error(`${label} doesn't match`);
    }
  }

}
