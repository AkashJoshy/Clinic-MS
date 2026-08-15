import { Router } from "express";
import { DOCTOR_ENDPOINTS } from "../endpoints/doctor.endpoints.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { authMiddleware2 } from "../middlewares/auth.middleware2.ts";
import { MongooseDoctorRepository } from "../../infrastructure/repositories/mongoose-doctor.repository.ts";
import { MongooseUserRepository } from "../../infrastructure/repositories/mongoose-user.repository.ts";
import { MongooseAddressRepository } from "../../infrastructure/repositories/mongoose-address.repository.ts";
import { MongooseDoctorClinicRepository } from "../../infrastructure/repositories/mongoose-doctor-clinic.repository.ts";
import { MongooseClinicRepository } from "../../infrastructure/repositories/mongoose-clinic.repository.ts";
import { DoctorProfileController } from "../controllers/doctor/doctor-profile.controller.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { DoctorRegisterController } from "../controllers/doctor/doctor-register.controller.ts";
import { doctorUpload, profileupload } from "../middlewares/upload.middleware.ts";
import { DoctorRegisterUseCase } from "../../application/use-cases/doctor/profile/doctor-register.usecase.ts";
import { UserCreationService } from "../../application/services/user-creation.service.ts";
import { ArgonPasswordService } from "../../infrastructure/services/ArgonPasswordService.ts";
import { MongooseDepartmentRepository } from "../../infrastructure/repositories/mongoose-department.repository.ts";
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
const mongooseDoctorRepository = new MongooseDoctorRepository();
const mongooseDoctorClinicRepository = new MongooseDoctorClinicRepository();
const mongooseUserRepository = new MongooseUserRepository();
const mongooseClinicRepository = new MongooseClinicRepository();
const mongooseAddressRepository = new MongooseAddressRepository();
const mongooseDepartmentRepository = new MongooseDepartmentRepository();

// Services
const argonPasswordService = new ArgonPasswordService();

// Service-Usecase
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonPasswordService,
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
  authMiddleware,
  authMiddleware2,
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
  authMiddleware,
  authMiddleware2,
  validate(professionalDetailsSchema),
  async (req, res, next) => {
    await updateDoctorProfessionalDetailsController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["consultationDetails"],
  authMiddleware,
  authMiddleware2,
  validate(consultationDetailsSchema),
  async (req, res, next) => {
    await updateDoctorConsultationDetailsController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["address"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await updateDoctorAddressController.handle(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["profile_picture"],
  authMiddleware,
  authMiddleware2,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await updateDoctorProfilePictureController.handle(req, res, next);
  },
);

export default router;
