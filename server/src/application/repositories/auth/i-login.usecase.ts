import type { LoginDTO, LoginResponseDTO, LoginVerificationResponseDTO } from "../../dto/auth.dto.ts";

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<LoginResponseDTO | LoginVerificationResponseDTO>;
}
