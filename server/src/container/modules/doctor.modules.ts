import { UserCreationService } from "../../application/services/user-creation.service.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { DoctorRegisterUseCase } from "../../application/use-cases/doctor/profile/doctor-register.usecase.ts";
import { UpdateDoctorAddressUseCase } from "../../application/use-cases/doctor/profile/update-doctor-address.usecase.ts";
import { UpdateDoctorConsultationDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-consultation-details.useCase.ts";
import { UpdateDoctorProfessionalDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-professional-details.useCase.ts";
import { UpdateDoctorProfilePictureUseCase } from "../../application/use-cases/doctor/profile/update-doctor-profile-picture.usecase.ts";
import { DoctorProfileController } from "../../presentation/controllers/doctor/doctor-profile.controller.ts";
import { DoctorRegisterController } from "../../presentation/controllers/doctor/doctor-register.controller.ts";
import { UpdateDoctorAddressController } from "../../presentation/controllers/doctor/update-doctor-address.controller.ts";
import { UpdateDoctorConsultationDetailsController } from "../../presentation/controllers/doctor/update-doctor-consultation-details.controller.ts";
import { UpdateDoctorProfessionalDetailsController } from "../../presentation/controllers/doctor/update-doctor-professional-details.controller.ts";
import { UpdateDoctorProfilePictureController } from "../../presentation/controllers/doctor/update-doctor-profile-picture.controller.ts";
import {
  mongooseAddressRepository,
  mongooseClinicRepository,
  mongooseDepartmentRepository,
  mongooseDoctorClinicRepository,
  mongooseDoctorRepository,
  mongooseUserRepository,
  argonHashService
} from "../index.ts";

// Service-Usecase
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonHashService,
);

// Use-cases
const doctorProfileUseCase = new DoctorProfileUseCase(
  mongooseUserRepository,
  mongooseDoctorRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  mongooseDepartmentRepository,
);

const doctorRegisterUseCase = new DoctorRegisterUseCase(
  mongooseDoctorRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  userCreationService,
);

const updateDoctorProfessionalDetailsUseCase =
  new UpdateDoctorProfessionalDetailsUseCase(
    mongooseUserRepository,
    mongooseDoctorRepository,
  );

const updateDoctorConsultationDetailsUseCase =
  new UpdateDoctorConsultationDetailsUseCase(
    mongooseUserRepository,
    mongooseDoctorRepository,
    mongooseDoctorClinicRepository,
    mongooseClinicRepository,
  );

const updateDoctorAddressUseCase = new UpdateDoctorAddressUseCase(
  mongooseDoctorRepository,
  mongooseAddressRepository,
);

const updateDoctorProfilePictureUseCase = new UpdateDoctorProfilePictureUseCase(
  mongooseUserRepository,
  mongooseDoctorRepository,
);

// Controllers
export const doctorProfileController = new DoctorProfileController(
  doctorProfileUseCase,
);

export const doctorRegisterController = new DoctorRegisterController(
  doctorRegisterUseCase,
);

export const updateDoctorProfessionalDetailsController =
  new UpdateDoctorProfessionalDetailsController(
    updateDoctorProfessionalDetailsUseCase,
  );

export const updateDoctorConsultationDetailsController =
  new UpdateDoctorConsultationDetailsController(
    updateDoctorConsultationDetailsUseCase,
  );

export const updateDoctorAddressController = new UpdateDoctorAddressController(
  updateDoctorAddressUseCase,
);

export const updateDoctorProfilePictureController =
  new UpdateDoctorProfilePictureController(updateDoctorProfilePictureUseCase);
