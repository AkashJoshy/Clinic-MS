import type { RefreshTokenResponseDto } from "../../dto/auth.dto.ts";

export interface IRefreshUseCase {
  execute(refreshToken: string): Promise<RefreshTokenResponseDto>;
}
