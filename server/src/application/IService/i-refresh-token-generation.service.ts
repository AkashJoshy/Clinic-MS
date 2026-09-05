import type { RefreshPayloadDto } from "../dto/auth.dto.ts";

export interface IRefreshTokenGenerationService {
  generate(user: RefreshPayloadDto): Promise<string | void>;
}