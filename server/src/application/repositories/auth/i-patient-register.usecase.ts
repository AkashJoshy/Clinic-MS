import type { RegisterUserDTO, VerificationResponseDto } from "../../dto/auth.dto.ts";


export interface IPatientRegisterUseCase {
  execute(data: RegisterUserDTO): Promise<VerificationResponseDto>;
}