import { Router } from "express";
import { PATIENT_ENDPOINTS } from "../endpoints/patient.endpoints.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { MongooseDoctorRepository } from "../../infrastructure/repositories/mongoose-doctor.repository.ts";
import { MongooseUserRepository } from "../../infrastructure/repositories/mongoose-user.repository.ts";
import { MongoosePatientRepository } from "../../infrastructure/repositories/mongoose-patient.repository.ts";
import { PatientProfilesUseCase } from "../../application/use-cases/patient/profile/patient-profiles.usecase.ts";
import { PatientProfilesController } from "../controllers/patient/patient-profiles.controller.ts";
import { MongooseAddressRepository } from "../../infrastructure/repositories/mongoose-address.repository.ts";
import { authMiddleware2 } from "../middlewares/auth.middleware2.ts";
import { profileupload } from "../middlewares/upload.middleware.ts";
import {
  createPatientProfileSchema,
  updatePersonalDetailsSchema,
  updatePersonalProfilePictureSchema,
} from "../schemas/patient/profile.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { UpdatePatientProfileUseCase } from "../../application/use-cases/patient/profile/update-patient-profile.usecase.ts";
import { UpdatePatientProfileController } from "../controllers/patient/update-patient-profile.controller.ts";
import { updateAddressSchema } from "../schemas/shared/address.schema.ts";
import { UpdatePatientProfilePictureController } from "../controllers/patient/update-patient-profile-picture.controller.ts";
import { UpdatePatientProfilePictureUseCase } from "../../application/use-cases/patient/profile/update-patient-profile-picture.usecase.ts";
import { UpdatePatientProfileAddressController } from "../controllers/patient/update-patient-profile-address.controller.ts";
import { UpdatePatientProfileAddressUseCase } from "../../application/use-cases/patient/profile/update-patient-profile-address.usecase.ts";
import { CreatePatientProfileController } from "../controllers/patient/create-patient-profile.controller.ts";
import { CreatePatientProfileUseCase } from "../../application/use-cases/patient/profile/create-patient-profile.usecase.ts";

const router = Router();

// DB Repo's
const mongooseDoctorRepository = new MongooseDoctorRepository();
const mongooseUserRepository = new MongooseUserRepository();
const mongoosePatientRepository = new MongoosePatientRepository();
const mongooseAddressRepository = new MongooseAddressRepository();
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
const updatePatientProfileAddressUseCase =
  new UpdatePatientProfileAddressUseCase(
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
const updatePatientProfileAddressController =
  new UpdatePatientProfileAddressController(updatePatientProfileAddressUseCase);
const createPatientProfileController = new CreatePatientProfileController(
  createPatientProfileUseCase,
);

// Routes
router.get(
  PATIENT_ENDPOINTS["FETCH_PATIENT_PROFILES"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await patientProfilesController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE"],
  authMiddleware,
  authMiddleware2,
  validate(updatePersonalDetailsSchema),
  async (req, res, next) => {
    await updatePatientProfileController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE_ADDRESS"],
  authMiddleware,
  authMiddleware2,
  validate(updateAddressSchema),
  async (req, res, next) => {
    await updatePatientProfileAddressController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE_PICTURE"],
  authMiddleware,
  authMiddleware2,
  profileupload,
  validate(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await updatePatientProfilePictureController.handle(req, res, next);
  },
);

router.post(
  PATIENT_ENDPOINTS["CREATE_PATIENT_PROFILE"],
  authMiddleware,
  authMiddleware2,
  validate(createPatientProfileSchema),
  async (req, res, next) => {
    await createPatientProfileController.handle(req, res, next);
  },
);

export default router;
