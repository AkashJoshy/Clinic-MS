import type { ChangePasswordDto } from "../../../dto/auth.dto.ts";

export interface IChangePasswordUseCase {
  execute(data: ChangePasswordDto): Promise<void>;
}
