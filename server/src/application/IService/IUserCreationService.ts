import type { RegisterUserDTO, UserDto } from "../dto/auth.dto.ts";

export interface IUserCreationService {
  execute(dto: RegisterUserDTO, message?: string): Promise<UserDto>;
}