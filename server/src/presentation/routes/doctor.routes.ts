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

const router = Router();

// DB Repo's
const mongooseDoctorRepository = new MongooseDoctorRepository();
const mongooseDoctorClinicRepository = new MongooseDoctorClinicRepository();
const mongooseUserRepository = new MongooseUserRepository();
const mongooseClinicRepository = new MongooseClinicRepository();
const mongooseAddressRepository = new MongooseAddressRepository();
// Services

// Service-Usecase

// Use-cases
const doctorProfileUseCase = new DoctorProfileUseCase(
   mongooseUserRepository,
   mongooseDoctorRepository,
   mongooseDoctorClinicRepository,
   mongooseClinicRepository,
   mongooseAddressRepository
)

// Controllers
const doctorProfileController = new DoctorProfileController(
  doctorProfileUseCase
);

// Routes
router.get(DOCTOR_ENDPOINTS["profile"], 
    authMiddleware, 
    authMiddleware2,
    async (req, res, next) => {
        await doctorProfileController.handle(req, res, next)
    }
);

export default router;
