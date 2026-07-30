import type { LoginDTO, UserDto } from "../dto/auth.dto.ts";

export interface IUserExistenceService {
  execute(data: LoginDTO): Promise<UserDto>;
}