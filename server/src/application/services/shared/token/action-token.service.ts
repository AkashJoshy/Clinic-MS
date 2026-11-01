import type { DoctorReapplication } from "../../../../domain/entities/doctor-reapplication.entity.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import type { IDoctorReapplicationRepository } from "../../../../domain/repositories/i-doctor-reapplication.repository.ts";
import type { IHashService } from "../../../../domain/services/i-hash.service.ts";
import type { ITokenService } from "../../../../domain/services/i-token.service.ts";
import type {
  ActionTokenPayloadDto,
  TokenResponseDto,
} from "../../../dto/auth.dto.ts";
import type { IActionTokenGenerationService } from "../../../interfaces/services/shared/token/i-action-token-generation.service.ts";

export class ActionTokenGenerationService implements IActionTokenGenerationService {
  constructor(
    private _tokenService: ITokenService,
    private _doctorReapplicationRepository: IDoctorReapplicationRepository,
    private readonly _hashService: IHashService,
  ) {}

  async generate(
    doctorReapplication: DoctorReapplication,
  ): Promise<TokenResponseDto> {
    const tokenId = crypto.randomUUID();
    const payload = {
      id: doctorReapplication.id!,
      tokenId,
      tokenType: "doctor-reapplication",
    };

    const actionToken = this._tokenService.generateActionToken(
      payload as ActionTokenPayloadDto,
    );

    if (!actionToken) {
      throw new InternalServerError(
        "An internal error occurred. Please try again later.",
      );
    }

    const hashedTokenId = await this._hashService.hash(
      payload.tokenId,
      "Token",
    );

    if (!hashedTokenId) {
      throw new InternalServerError(
        "An internal error occurred. Please try again later.",
      );
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    doctorReapplication.updateToken(hashedTokenId, expiresAt);

    await this._doctorReapplicationRepository.findByIdAndUpdate(
      doctorReapplication.id!,
      {
        tokenHash: doctorReapplication.tokenHash,
        tokenExpiresAt: doctorReapplication.tokenExpiresAt,
      },
    );

    return actionToken;
  }
}
