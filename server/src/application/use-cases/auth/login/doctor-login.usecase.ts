import { ForbiddenError } from "../../../../domain/errors/forbidden.error.ts";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.ts";
import { LockedError } from "../../../../domain/errors/locked.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/IDoctorRepository.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type { LoginDTO, LoginResponseDTO } from "../../../dto/auth.dto.ts";
import type { IEmailVerificationService } from "../../../IService/IEmailVerificationService.ts";
import type { ITokenGenerationService } from "../../../IService/ITokenGenerationService.ts";
import type { IUserExistenceService } from "../../../IService/IUserExistenceService.ts";
import type { ILoginUseCase } from "../../../repositories/auth/ILoginUseCase.ts";

export class DoctorLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _tokenGenerationService: ITokenGenerationService,
    private readonly _mailVerficationService: IEmailVerificationService,
    private _doctorRepository: IDoctorRepository
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._userExistenceService.execute(data);

    if (!user || !user.id) {
      throw new NotFoundError("doctor")
    }
    
    const doctor = await this._doctorRepository.findOneBy({ userId: user.id })
    
    if (!doctor || !doctor.id) {
      throw new NotFoundError("doctor")
    }

    if (doctor.status === "PENDING") {
        throw new LockedError("Your doctor is under review. An admin needs to approve it.")
    } else if (doctor?.status === "REJECTED") {
        throw new ForbiddenError("Your clinic has been rejected. Please apply again.");
    }
      
    if (!user.isEmailVerified) {
      await this._mailVerficationService.execute(user.email, user.fullName, user.role as Role);
      throw new InvalidCredentialsError(
        "A verification email has been sent. Please check your inbox and verify your account.",
      );
    }

    const accessToken = await this._tokenGenerationService.generate(user);
    let role = user.role.toLowerCase()

    return {
      user,
      accessToken,
      role
    };
  }
}