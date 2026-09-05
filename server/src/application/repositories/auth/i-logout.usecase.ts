import type { LogoutResponseDto } from "../../dto/auth.dto.ts";

export interface ILogoutUseCase {
  execute(refreshToken: string): Promise<LogoutResponseDto>;
}
