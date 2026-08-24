import { Router } from "express";
import { DOCTOR_ENDPOINTS } from "../endpoints/doctor.endpoints.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import { DoctorRepository } from "../../infrastructure/repositories/doctor.repository.ts";
import { UserRepository } from "../../infrastructure/repositories/user.repository.ts";
import { AddressRepository } from "../../infrastructure/repositories/address.repository.ts";
import { DoctorClinicRepository } from "../../infrastructure/repositories/doctor-clinic.repository.ts";
import { ClinicRepository } from "../../infrastructure/repositories/clinic.repository.ts";
import { DoctorProfileController } from "../controllers/doctor/doctor-profile.controller.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { DoctorRegisterController } from "../controllers/doctor/doctor-register.controller.ts";
import {
  doctorUpload,
  profileupload,
} from "../middlewares/upload.middleware.ts";
import { DoctorRegisterUseCase } from "../../application/use-cases/doctor/profile/doctor-register.usecase.ts";
import { UserCreationService } from "../../application/services/user-creation.service.ts";
import { ArgonHashService } from "../../infrastructure/services/ArgonHashService.ts";
import { DepartmentRepository } from "../../infrastructure/repositories/department.repository.ts";
import { UpdateDoctorProfessionalDetailsController } from "../controllers/doctor/update-doctor-professional-details.controller.ts";
import { UpdateDoctorProfessionalDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-professional-details.useCase.ts";
import { UpdateDoctorConsultationDetailsController } from "../controllers/doctor/update-doctor-consultation-details.controller.ts";
import { UpdateDoctorConsultationDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-consultation-details.useCase.ts";
import {
  doctorRegistrationSchema,
  consultationDetailsSchema,
  professionalDetailsSchema,
} from "../schemas/doctor/doctor.schema.ts";
import { UpdateDoctorAddressController } from "../controllers/doctor/update-doctor-address.controller.ts";
import { UpdateDoctorAddressUseCase } from "../../application/use-cases/doctor/profile/update-doctor-address.usecase.ts";
import { UpdateDoctorProfilePictureController } from "../controllers/doctor/update-doctor-profile-picture.controller.ts";
import { UpdateDoctorProfilePictureUseCase } from "../../application/use-cases/doctor/profile/update-doctor-profile-picture.usecase.ts";
import { validateFile } from "../middlewares/validate-file.middleware.ts";
import { updatePersonalProfilePictureSchema } from "../schemas/shared/shared.schema.ts";

const router = Router();

// DB Repo's
const mongooseDoctorRepository = new DoctorRepository();
const mongooseDoctorClinicRepository = new DoctorClinicRepository();
const mongooseUserRepository = new UserRepository();
const mongooseClinicRepository = new ClinicRepository();
const mongooseAddressRepository = new AddressRepository();
const mongooseDepartmentRepository = new DepartmentRepository();

// Services
const argonHashService = new ArgonHashService();

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
const doctorProfileController = new DoctorProfileController(
  doctorProfileUseCase,
);

const doctorRegisterController = new DoctorRegisterController(
  doctorRegisterUseCase,
);

const updateDoctorProfessionalDetailsController =
  new UpdateDoctorProfessionalDetailsController(
    updateDoctorProfessionalDetailsUseCase,
  );

const updateDoctorConsultationDetailsController =
  new UpdateDoctorConsultationDetailsController(
    updateDoctorConsultationDetailsUseCase,
  );

const updateDoctorAddressController = new UpdateDoctorAddressController(
  updateDoctorAddressUseCase,
);

const updateDoctorProfilePictureController =
  new UpdateDoctorProfilePictureController(updateDoctorProfilePictureUseCase);

// Routes
router.get(
  DOCTOR_ENDPOINTS["profile"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorProfileController.handle(req, res, next);
  },
);

router.post(
  DOCTOR_ENDPOINTS["register"],
  doctorUpload,
  validate(doctorRegistrationSchema),
  async (req, res, next) => {
    await doctorRegisterController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["professionalDetails"],
  authenticateUser,
  authorizeUser,
  validate(professionalDetailsSchema),
  async (req, res, next) => {
    await updateDoctorProfessionalDetailsController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["consultationDetails"],
  authenticateUser,
  authorizeUser,
  validate(consultationDetailsSchema),
  async (req, res, next) => {
    await updateDoctorConsultationDetailsController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["address"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await updateDoctorAddressController.handle(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["profile_picture"],
  authenticateUser,
  authorizeUser,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await updateDoctorProfilePictureController.handle(req, res, next);
  },
);

export default router;
