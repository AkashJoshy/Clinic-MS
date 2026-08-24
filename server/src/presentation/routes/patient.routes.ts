import { Router } from "express";
import { PATIENT_ENDPOINTS } from "../endpoints/patient.endpoints.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { DoctorRepository } from "../../infrastructure/repositories/doctor.repository.ts";
import { UserRepository } from "../../infrastructure/repositories/user.repository.ts";
import { PatientRepository } from "../../infrastructure/repositories/patient.repository.ts";
import { PatientProfilesUseCase } from "../../application/use-cases/patient/profile/patient-profiles.usecase.ts";
import { PatientProfilesController } from "../controllers/patient/patient-profiles.controller.ts";
import { AddressRepository } from "../../infrastructure/repositories/address.repository.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import { profileupload } from "../middlewares/upload.middleware.ts";
import {
  createPatientProfileSchema,
  updatePersonalDetailsSchema,
} from "../schemas/patient/patient.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { UpdatePatientProfileUseCase } from "../../application/use-cases/patient/profile/update-patient-profile.usecase.ts";
import { UpdatePatientProfileController } from "../controllers/patient/update-patient-profile.controller.ts";
import {
  updateAddressSchema,
  updatePersonalProfilePictureSchema,
} from "../schemas/shared/shared.schema.ts";
import { UpdatePatientProfilePictureController } from "../controllers/patient/update-patient-profile-picture.controller.ts";
import { UpdatePatientProfilePictureUseCase } from "../../application/use-cases/patient/profile/update-patient-profile-picture.usecase.ts";
import { UpdatePatientAddressController } from "../controllers/patient/update-patient-address.controller.ts";
import { UpdatePatientAddressUseCase } from "../../application/use-cases/patient/profile/update-patient-address.usecase.ts";
import { CreatePatientProfileController } from "../controllers/patient/create-patient-profile.controller.ts";
import { CreatePatientProfileUseCase } from "../../application/use-cases/patient/profile/create-patient-profile.usecase.ts";
import { validateFile } from "../middlewares/validate-file.middleware.ts";

const router = Router();

// DB Repo's
const mongooseDoctorRepository = new DoctorRepository();
const mongooseUserRepository = new UserRepository();
const mongoosePatientRepository = new PatientRepository();
const mongooseAddressRepository = new AddressRepository();
// Services

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
const patientProfilesController = new PatientProfilesController(
  patientProfilesUseCase,
);

const updatePatientProfileController = new UpdatePatientProfileController(
  updatePatientProfileUseCase,
);

const updatePatientProfilePictureController =
  new UpdatePatientProfilePictureController(updatePatientProfilePictureUseCase);

const updatePatientAddressController = new UpdatePatientAddressController(
  updatePatientAddressUseCase,
);

const createPatientProfileController = new CreatePatientProfileController(
  createPatientProfileUseCase,
);

// Routes
router.get(
  PATIENT_ENDPOINTS["FETCH_PATIENT_PROFILES"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await patientProfilesController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE"],
  authenticateUser,
  authorizeUser,
  validate(updatePersonalDetailsSchema),
  async (req, res, next) => {
    await updatePatientProfileController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE_ADDRESS"],
  authenticateUser,
  authorizeUser,
  validate(updateAddressSchema),
  async (req, res, next) => {
    await updatePatientAddressController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE_PICTURE"],
  authenticateUser,
  authorizeUser,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await updatePatientProfilePictureController.handle(req, res, next);
  },
);

router.post(
  PATIENT_ENDPOINTS["CREATE_PATIENT_PROFILE"],
  authenticateUser,
  authorizeUser,
  validate(createPatientProfileSchema),
  async (req, res, next) => {
    await createPatientProfileController.handle(req, res, next);
  },
);

export default router;
