import type { RegisterUserDTO } from "../../dto/auth.dto.ts";
import type { RegisterClinicDto } from "../../dto/clinic.dto.ts";


export interface IClinicRegisterUseCase {
  execute(userDto: RegisterUserDTO, clinicDto: RegisterClinicDto): Promise<void>;
}