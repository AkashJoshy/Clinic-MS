import type { ResetPasswordDto } from "../../dto/auth.dto.ts";

export interface IResetPasswordUseCase {
  execute(passwordData: ResetPasswordDto): Promise<void>;
}