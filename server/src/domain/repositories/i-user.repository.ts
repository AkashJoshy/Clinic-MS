import type User from "../entities/user.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
