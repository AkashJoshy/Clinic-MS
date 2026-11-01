import type { RefreshPayloadDto, TokenResponseDto } from "../../../../dto/auth.dto.ts";

export interface IRefreshTokenGenerationService {
  generate(user: RefreshPayloadDto): Promise<TokenResponseDto>;
}
