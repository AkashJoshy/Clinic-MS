import type { ForgotRolePasswordDto } from "../../dto/auth.dto.ts";


export interface IForgotPasswordUseCase {
  execute(data: ForgotRolePasswordDto): Promise<void>;
}