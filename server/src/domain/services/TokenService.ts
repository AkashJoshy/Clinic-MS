import type { AccessTokenPayloadDto, RefreshTokenPayloadDto } from "../../application/dto/auth.dto.ts"

export interface ITokenService {
    generateAccessToken(payload: AccessTokenPayloadDto): string
    generateRefreshToken(payload: RefreshTokenPayloadDto): string
    
    verifyAccessToken(token: string): Record<string, unknown>
    verifyRefreshToken(token: string): Record<string, unknown>
}