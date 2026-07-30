import {
  EMAIL_FOOTER,
  EMAIL_SUBJECTS,
} from "../../domain/constants/email.constants.js";
import { InternalServerError } from "../../domain/errors/internal-server.error.js";
import type { ICacheService } from "../../domain/services/CacheService.js";
import type { IMailService } from "../../domain/services/EmailService.js";
import type { Role } from "../../domain/types/user.types.ts";
import { otpVerifyTemplate } from "../../infrastructure/services/mail/templates/otp-verify.template.ts";
import { welcomeTemplate } from "../../infrastructure/services/mail/templates/welcome.template.ts";
import { generateOTP } from "../../shared/utils/otp.helper.js";
import { generateVerificationToken } from "../../shared/utils/token.helper.js";
import type { CacheDTO } from "../dto/auth.dto.js";

export class EmailVerificationService {
  constructor(
    private readonly _mailService: IMailService,
    private readonly _cacheService: ICacheService,
  ) {}

  async execute(email: string, name: string, role: Role): Promise<string> {
    if (!email) {
      throw new InternalServerError();
    }

    let roleRoute = role === "PATIENT" ? "" : role.toLowerCase()
    let otp = generateOTP();
    let verificationToken = generateVerificationToken();

    const pathToRoleRoute = role !== "PATIENT" ? "/"+roleRoute : ""
    console.log(pathToRoleRoute)

    const body = `
      <div>
        ${welcomeTemplate.body.replace("{{NAME}}", name)}
        ${otpVerifyTemplate.body.replace("{{VERIFY_URL}}", `${process.env.CLIENT_ORIGIN}/verify-email?token=${verificationToken}`)
          .replace("{{OTP}}", otp)}
        ${EMAIL_FOOTER.FOOTER1}
      </div>
    `

    Promise.all([
      this._mailService.sendMail(email, EMAIL_SUBJECTS.WELCOME, body),
      this._cacheService.set<CacheDTO>(`verify:${verificationToken}`, {
        email: email,
        otp,
      }, 3600),
    ]).catch((error) => {
      throw new InternalServerError(error.message);
    });

    return verificationToken;
  }
}
