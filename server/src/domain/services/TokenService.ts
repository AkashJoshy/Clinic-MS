import type { PayloadDTO } from "../../application/dto/auth.dto.ts"

export interface ITokenService {
    generateToken(payload: PayloadDTO): string
    verifyToken(token: string): Record<string, unknown>
}