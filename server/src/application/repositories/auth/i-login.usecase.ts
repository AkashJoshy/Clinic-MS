import type { LoginDTO, LoginResponseDTO } from "../../dto/auth.dto.ts";

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<LoginResponseDTO>;
}
