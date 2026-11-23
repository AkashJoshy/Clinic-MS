import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { RestrictionStatus } from "../../../../domain/types/shared.types.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type {
  AccessPayloadDto,
  LoginDTO,
  LoginResponseDTO,
  LoginVerificationResponseDTO,
  RefreshPayloadDto,
  UserWithTheme,
} from "../../../dto/auth.dto.ts";
import type { IAccessTokenGenerationService } from "../../../interfaces/services/shared/token/i-access-token-generation.service.ts";
import type { IEmailVerificationService } from "../../../interfaces/services/shared/user/i-email-verification.service.ts";
import type { IRefreshTokenGenerationService } from "../../../interfaces/services/shared/token/i-refresh-token-generation.service.ts";
import type { IDoctorLoginUseCase } from "../../../interfaces/repositories/auth/i-doctor-login.usecase.ts";
import type { IUserExistenceService } from "../../../interfaces/services/shared/user/i-user-existence.service.ts";
import type { IDoctorSettingsRepository } from "../../../../domain/repositories/i-doctor-settings.repository.ts";

export class DoctorLoginUseCase implements IDoctorLoginUseCase {
  constructor(
    private readonly _userExistenceService: IUserExistenceService,
    private readonly _mailVerficationService: IEmailVerificationService,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSettingsRepository: IDoctorSettingsRepository,
    private readonly _accesstokenGenerationService: IAccessTokenGenerationService,
    private readonly _refreshtokenGenerationService: IRefreshTokenGenerationService,
  ) {}

  async execute(
    data: LoginDTO,
  ): Promise<
    LoginResponseDTO | LoginVerificationResponseDTO | RestrictionStatus
  > {
    const user = await this._userExistenceService.execute(data);

    let status: RestrictionStatus | null = null;
    if (!user || !user.id) {
      throw new NotFoundError("doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId: user.id });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("doctor");
    }

    if (doctor.status === "PENDING") {
      status = "PENDING";
      return status;
    } else if (doctor?.status === "REJECTED") {
      status = "REJECTED";
      return status;
    }

    if (!user.isEmailVerified) {
      const token = await this._mailVerficationService.execute({
        email: user.email,
        name: user.fullName,
        role: user.role as Role,
      });

      return {
        token,
        email: user.email,
        role: user.role,
      };
    }

    const { password, ...updatedUser } = user;

    const doctorSettings = await this._doctorSettingsRepository.findByDoctorId(
      doctor.id,
    );

    if (!doctorSettings || !doctorSettings.id || !doctorSettings.doctorId) {
      throw new NotFoundError("Settings");
    }

    const updatedUserWithTheme = {
      ...user,
      theme: doctorSettings.appearance.theme,
    } as UserWithTheme;

    const accessPayload: AccessPayloadDto = {
      id: updatedUser.id!,
      role: updatedUser.role,
    };

    const refreshPayload: RefreshPayloadDto = {
      id: updatedUser.id!,
      tokenId: "",
    };

    const accessToken =
      await this._accesstokenGenerationService.generate(accessPayload);

    const refreshToken =
      await this._refreshtokenGenerationService.generate(refreshPayload);

    const tokenPair = {
      access: accessToken!,
      refresh: refreshToken!,
    };

    let role = user.role.toLowerCase();

    return {
      user: updatedUserWithTheme,
      tokenPair,
      role,
    };
  }
}
