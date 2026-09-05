import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type {
  RegisterUserDTO,
  VerificationTokenDto,
} from "../../../dto/auth.dto.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import { Address } from "../../../../domain/entities/address.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import Patient from "../../../../domain/entities/patient.ts";
import type { IPatientRegisterUseCase } from "../../../repositories/auth/i-patient-register.usecase.ts";
import type { IUserCreationService } from "../../../IService/i-user-creation.service.ts";
import type { IEmailVerificationService } from "../../../IService/i-email-verification.service.ts";
import type { Role } from "../../../../domain/types/user.types.ts";

export class PatientRegisterUseCase implements IPatientRegisterUseCase {
  constructor(
    private readonly _userCreation: IUserCreationService,
    private readonly _patientRepository: IPatientRepository,
    private readonly _mailVerficationService: IEmailVerificationService,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(data: RegisterUserDTO): Promise<VerificationTokenDto> {
    const message = "User Already Exists";
    let newUser = await this._userCreation.execute(data, message);

    if (!newUser)
      throw new DatabaseError(
        "Error occured during registration, Try again later",
      );

    const patientCount = await this._patientRepository.getPatientNumber();

    const patientNumber = `${process.env.PATIENT_NUMBER_MODEL}-${patientCount}`;

    if (!patientNumber || !patientCount || !newUser.id) {
      throw new InternalServerError();
    }

    const patient = await this._patientRepository.save(
      Patient.createSelf(
        {
          id: null,
          userId: newUser.id,
          displayName: newUser.fullName,
          imageUrl: {
            publicId: "",
            url: "",
          },
        },
        patientNumber,
      ),
    );

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
          addressLine: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
        },
        "Patient",
      ),
    );

    const token = await this._mailVerficationService.execute(
      newUser.email,
      newUser.fullName,
      newUser.role as Role,
    );
    return { token };
  }
}
