import type { VerifyOtpDTO } from "../../dto/auth.dto.ts";


export interface IVerifyEmailUseCase {
  execute(data: VerifyOtpDTO): Promise<boolean>;
}