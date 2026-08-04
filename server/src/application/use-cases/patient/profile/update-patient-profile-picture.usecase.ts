import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { IUpdatePatientProfilePictureUseCase } from "../../../repositories/patient/IUpdatePatientProfilePicture.UseCase.ts";

export class UpdatePatientProfilePictureUseCase implements IUpdatePatientProfilePictureUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _patientRepository: IPatientRepository,
  ) {}

  async execute(data: any): Promise<boolean> {
    
    return true;
  }
}