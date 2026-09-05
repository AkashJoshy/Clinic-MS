import type { VerificationTokenDto } from "../../dto/auth.dto.ts";


export interface IResendOtpUseCase {
  execute(data: VerificationTokenDto): Promise<void>;
}