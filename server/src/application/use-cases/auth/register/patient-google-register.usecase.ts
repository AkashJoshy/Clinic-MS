import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type {
  GoogleLoginDTO,
  LoginResponseDTO,
  TokenPair,
} from "../../../dto/auth.dto.ts";
import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { IAddressRepository } from "../../../../domain/repositories/IAddressRepository.ts";
import User from "../../../../domain/entities/User.ts";
import Patient from "../../../../domain/entities/Patient.ts";
import { Address } from "../../../../domain/entities/Address.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { welcomeTemplate } from "../../../../infrastructure/services/mail/templates/welcome.template.ts";
import { EMAIL_FOOTER } from "../../../../domain/constants/email.constants.ts";
import type { IMailService } from "../../../../domain/services/EmailService.ts";
import type { IPatientGoogleAuthUseCase } from "../../../repositories/auth/IPatientGoogleAuthUsecase.ts";
import type { IAccessTokenGenerationService } from "../../../IService/IAccessTokenGenerationService.ts";

export class PatientGoogleRegisterUseCase implements IPatientGoogleAuthUseCase {
  constructor(
    private _accessTokenGenerationService: IAccessTokenGenerationService,
    private _userRepository: IUserRepository,
    private _patientRepository: IPatientRepository,
    private _addressRepository: IAddressRepository,
    private _mailService: IMailService,
  ) {}

  async execute(user: GoogleLoginDTO): Promise<LoginResponseDTO> {
    const isUserExisted = await this._userRepository.findByEmail(user.email);

    const tokenPair: TokenPair = {
      access: "",
      refresh: "",
    };

    if (isUserExisted) {
      return {
        user: null,
        tokenPair,
        role: "patient",
        message: "User Already Exists. Redirecting to Login...",
      };
    }

    const newUser = await this._userRepository.save(
      User.create({
        id: null,
        fullName: user.name,
        email: user.email,
        password: "",
        role: "PATIENT",
        provider: user.provider,
        isEmailVerified: user.isVerified,
      }),
    );

    if (!newUser || !newUser.id) {
      throw new DatabaseError("Error while registering!!!, Try again later");
    }

    const patientCount = await this._patientRepository.getPatientNumber();
    const patientNumber = `${process.env.PATIENT_NUMBER_MODEL}-${patientCount}`;

    const body = `
          <div>
            ${welcomeTemplate.body.replace("{{NAME}}", newUser.fullName)}
            ${EMAIL_FOOTER.FOOTER1}
          </div>
        `

    const [patient, mail] = await Promise.all([
      this._patientRepository.save(
        Patient.createSelf(
          {
            id: null,
            displayName: newUser.fullName,
            userId: newUser.id!,
          },
          patientNumber,
        ),
      ),
      this._mailService.sendMail(newUser.email, welcomeTemplate.subject, body),
    ]).catch((err: any) => {
      throw new InternalServerError(err.message);
    });

    if (!patient || !patient.id) {
      throw new DatabaseError(
        "Error while creating the user, tray again later",
      );
    }

    await this._addressRepository.save(
      Address.createForOwner(
        {
          id: null,
          ownerId: patient.id,
        },
        "Patient",
      ),
    );

    const accessToken =
      await this._accessTokenGenerationService.generate(newUser);

    tokenPair.access = accessToken!

    if (!accessToken || accessToken == "") {
      return {
        user: null,
        tokenPair,
        role: "patient",
        message: "Token expired!, Login again",
      };
    }

    const { password, ...updatedUser } = newUser;

    return {
      user: updatedUser,
      tokenPair,
      role: "patient",
    };
  }
}
