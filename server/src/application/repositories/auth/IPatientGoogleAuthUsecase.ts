import type { GoogleLoginDTO, LoginResponseDTO } from "../../dto/auth.dto.ts";


export interface IPatientGoogleAuthUseCase {
  execute(user: GoogleLoginDTO): Promise<LoginResponseDTO>;
}