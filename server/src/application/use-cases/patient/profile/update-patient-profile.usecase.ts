import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type {
  PatientUpdateFields,
  UpdatePatientDto,
} from "../../../dto/patient.dto.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IUpdatePatientProfileUseCase } from "../../../repositories/patient/i-update-patient-profile.usecase.ts";

export class UpdatePatientProfileUseCase implements IUpdatePatientProfileUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _patientRepository: IPatientRepository,
  ) {}

  async execute(data: UpdatePatientDto): Promise<boolean> {
    if (!data.id) {
      throw new NotFoundError("Patient");
    }
    let user = await this._userRepository.findByEmail(data.email);

    if (!user || !user.id) {
      throw new NotFoundError("User");
    }

    let patient = await this._patientRepository.findById(data.id);

    if (!patient || !patient.id) {
      throw new NotFoundError("Patient");
    }

    if (patient.userId !== user.id) {
      throw new NotFoundError("Patient");
    }

    let userDetailsToUpdate: PatientUpdateFields = {
      fullName: "",
    };

    let patientDetailsToUpdate = {
      displayName: data.displayName,
      dateOfBirth: data.dateOfBirth,
      medicalInformation: data.medicalInformation,
      gender: data.gender,
    };
    if (patient.isSelf()) {
      userDetailsToUpdate.fullName = data.displayName;
    } else {
      userDetailsToUpdate.fullName = user.fullName;
    }

    await Promise.all([
      this._userRepository.findByIdAndUpdate(user.id, userDetailsToUpdate),
      this._patientRepository.findByIdAndUpdate(
        patient.id,
        patientDetailsToUpdate,
      ),
    ]).catch((error: any) => {
      throw new error(error);
    });

    return true;
  }
}
