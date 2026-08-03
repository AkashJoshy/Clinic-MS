import { Router } from "express";
import { DOCTOR_ENDPOINTS } from "../endpoints/doctor.endpoints.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { authMiddleware2 } from "../middlewares/auth.middleware2.ts";
import { MongooseDoctorRepository } from "../../infrastructure/repositories/mongoose-doctor.repository.ts";
import { MongooseUserRepository } from "../../infrastructure/repositories/mongoose-user.repository.ts";
import { MongoosePatientRepository } from "../../infrastructure/repositories/mongoose-patient.repository.ts";
import { MongooseAddressRepository } from "../../infrastructure/repositories/mongoose-address.repository.ts";
import { MongooseDoctorClinicRepository } from "../../infrastructure/repositories/mongoose-doctor-clinic.repository.ts";
import { MongooseClinicRepository } from "../../infrastructure/repositories/mongoose-clinic.repository.ts";
import { DoctorProfileController } from "../controllers/doctor/doctor-profile.controller.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { doctorRegistrationSchema } from "../schemas/doctor/doctor-register.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { DoctorRegisterController } from "../controllers/doctor/doctor-register.controller.ts";
import { doctorUpload } from "../middlewares/upload.middleware.ts";
import { DoctorRegisterUseCase } from "../../application/use-cases/doctor/profile/doctor-register.usecase.ts";
import { UserCreationService } from "../../application/services/user-creation.service.ts";
import { ArgonPasswordService } from "../../infrastructure/services/ArgonPasswordService.ts";
import { MongooseDepartmentRepository } from "../../infrastructure/repositories/mongoose-department.repository.ts";

const router = Router();

// DB Repo's
const mongooseDoctorRepository = new MongooseDoctorRepository();
const mongooseDoctorClinicRepository = new MongooseDoctorClinicRepository();
const mongooseUserRepository = new MongooseUserRepository();
const mongooseClinicRepository = new MongooseClinicRepository();
const mongooseAddressRepository = new MongooseAddressRepository();
const mongooseDepartmentRepository = new MongooseDepartmentRepository();

// Services
const argonPasswordService = new ArgonPasswordService()

// Service-Usecase
const userCreationService = new UserCreationService(
    mongooseUserRepository,
    argonPasswordService
)


// Use-cases
const doctorProfileUseCase = new DoctorProfileUseCase(
   mongooseUserRepository,
   mongooseDoctorRepository,
   mongooseDoctorClinicRepository,
   mongooseClinicRepository,
   mongooseAddressRepository,
   mongooseDepartmentRepository
)
const doctorRegisterUseCase = new DoctorRegisterUseCase(
   mongooseDoctorRepository,
   mongooseDoctorClinicRepository,
   mongooseClinicRepository,
   mongooseAddressRepository,
   userCreationService
)

// Controllers
const doctorProfileController = new DoctorProfileController(
  doctorProfileUseCase
);
const doctorRegisterController = new DoctorRegisterController(
  doctorRegisterUseCase
);

// Routes
router.get(DOCTOR_ENDPOINTS["profile"], 
    authMiddleware, 
    authMiddleware2,
    async (req, res, next) => {
        await doctorProfileController.handle(req, res, next)
    }
);
router.post(DOCTOR_ENDPOINTS["register"],
    doctorUpload,
    validate(doctorRegistrationSchema),
    async (req, res, next) => {
        await doctorRegisterController.handle(req, res, next)
    }
)

export default router;
