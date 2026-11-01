import type { AccessPayloadDto, TokenResponseDto } from "../../../../dto/auth.dto.ts";

export interface IAccessTokenGenerationService {
  generate(user: AccessPayloadDto): Promise<TokenResponseDto>;
}
