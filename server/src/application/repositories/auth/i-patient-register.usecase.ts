import type { RegisterUserDTO, VerificationTokenDto } from "../../dto/auth.dto.ts";


export interface IPatientRegisterUseCase {
  execute(data: RegisterUserDTO): Promise<VerificationTokenDto>;
}