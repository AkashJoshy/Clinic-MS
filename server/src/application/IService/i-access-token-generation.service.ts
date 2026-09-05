import type { AccessPayloadDto } from "../dto/auth.dto.ts";

export interface IAccessTokenGenerationService {
  generate(user: AccessPayloadDto): Promise<string | void>;
}