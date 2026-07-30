import {
  EMAIL_BODY,
  EMAIL_SUBJECTS,
  ERROR_MESSAGES,
} from "../../../../domain/constants/email.constants.js";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.js";
import type { ICacheService } from "../../../../domain/services/CacheService.js";
import type { IMailService } from "../../../../domain/services/EmailService.js";
import { generateOTP } from "../../../../shared/utils/otp.helper.js";
import type { CacheDTO, VerificationTokenDto } from "../../../dto/auth.dto.js";
import type { IResendOtpUseCase } from "../../../repositories/auth/IResendOtpUseCase.ts";

export class ResendOtp implements IResendOtpUseCase {
  constructor(
    private _cacheService: ICacheService,
    private _mailService: IMailService,
  ) {}

  async execute(data: VerificationTokenDto): Promise<void> {
    try {
      const existing = await this._cacheService.get<CacheDTO>(
        `verify:${data.token}`,
      );

      if (!existing) {
        throw new InvalidCredentialsError(
          "Verification session expired. Please try again Later.",
        );
      }
      let newOtp = generateOTP();

      this._cacheService.set<CacheDTO>(`verify:${data.token}`, {
        email: existing.email,
        otp: newOtp,
      });

      this._mailService
        .sendMail(
          existing.email,
          EMAIL_SUBJECTS.OTP_VERIFY,
          EMAIL_BODY.OTP_VERIFY,
          newOtp,
        )
        .catch((err) => {
          if (err) {
            throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG, err);
          }
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}