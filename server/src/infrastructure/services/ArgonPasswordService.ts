import argon2 from 'argon2';
import type { IHashService } from '../../domain/services/PasswordService.js';

export class ArgonPasswordService implements IHashService {
  async hashPassword(password: string): Promise<string | undefined> {
    try {
      const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
      return hash;
    } catch (error: any) {
      throw new Error("Password doesn't match");
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      if (await argon2.verify(hashedPassword, password)) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error("Password doesn't match");
    }
  }
}
