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

// Controllers
const patientProfilesController = new PatientProfilesController(
  patientProfilesUseCase,
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

export default router;
