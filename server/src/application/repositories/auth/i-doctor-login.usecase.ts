import type { RestrictionStatus } from "../../../domain/types/shared.types.ts";
import type { LoginDTO, LoginResponseDTO, LoginVerificationResponseDTO } from "../../dto/auth.dto.ts";

export interface IDoctorLoginUseCase {
  execute(data: LoginDTO): Promise<LoginResponseDTO | LoginVerificationResponseDTO | RestrictionStatus>;
}

