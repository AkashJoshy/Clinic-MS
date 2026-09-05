import { CreatePatientProfileUseCase } from "../../application/use-cases/patient/profile/create-patient-profile.usecase.ts";
import { PatientProfilesUseCase } from "../../application/use-cases/patient/profile/patient-profiles.usecase.ts";
import { UpdatePatientAddressUseCase } from "../../application/use-cases/patient/profile/update-patient-address.usecase.ts";
import { UpdatePatientProfilePictureUseCase } from "../../application/use-cases/patient/profile/update-patient-profile-picture.usecase.ts";
import { UpdatePatientProfileUseCase } from "../../application/use-cases/patient/profile/update-patient-profile.usecase.ts";
import { CreatePatientProfileController } from "../../presentation/controllers/patient/create-patient-profile.controller.ts";
import { PatientProfilesController } from "../../presentation/controllers/patient/patient-profiles.controller.ts";
import { UpdatePatientAddressController } from "../../presentation/controllers/patient/update-patient-address.controller.ts";
import { UpdatePatientProfilePictureController } from "../../presentation/controllers/patient/update-patient-profile-picture.controller.ts";
import { UpdatePatientProfileController } from "../../presentation/controllers/patient/update-patient-profile.controller.ts";
import {
  mongooseAddressRepository,
  mongooseUserRepository,
  mongoosePatientRepository
} from "../index.ts";

// Service-Usecase

// Use-cases
const patientProfilesUseCase = new PatientProfilesUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
);

const updatePatientProfileUseCase = new UpdatePatientProfileUseCase(
  mongooseUserRepository,
  mongoosePatientRepository,
);

const updatePatientProfilePictureUseCase =
  new UpdatePatientProfilePictureUseCase(
    mongooseUserRepository,
    mongoosePatientRepository,
  );

const updatePatientAddressUseCase = new UpdatePatientAddressUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
);

const createPatientProfileUseCase = new CreatePatientProfileUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
);

// Controllers
export const patientProfilesController = new PatientProfilesController(
  patientProfilesUseCase,
);

export const updatePatientProfileController = new UpdatePatientProfileController(
  updatePatientProfileUseCase,
);

export const updatePatientProfilePictureController =
  new UpdatePatientProfilePictureController(updatePatientProfilePictureUseCase);

export const updatePatientAddressController = new UpdatePatientAddressController(
  updatePatientAddressUseCase,
);

export const createPatientProfileController = new CreatePatientProfileController(
  createPatientProfileUseCase,
);
