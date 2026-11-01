import type { EmailVerificationDto, EmailVerificationResponseDto } from "../../../../dto/auth.dto.ts";

export interface IEmailVerificationService {
  execute(data: EmailVerificationDto): Promise<EmailVerificationResponseDto>;
}
