import type { UserDto } from "../dto/auth.dto.ts";

export interface ITokenGenerationService {
  generate(user: UserDto): Promise<string | void>;
}