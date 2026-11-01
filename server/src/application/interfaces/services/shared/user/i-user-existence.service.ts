import type { LoginDTO, UserResponseDto } from "../../../../dto/auth.dto.ts";

export interface IUserExistenceService {
  execute(data: LoginDTO): Promise<UserResponseDto>;
}
