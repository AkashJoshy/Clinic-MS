import type { Role } from "../../domain/types/user.types.ts";


export interface IEmailVerificationService {
  execute(email: string, name: string, role: Role): Promise<string>;
}