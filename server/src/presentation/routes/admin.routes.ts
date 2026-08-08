import { Router } from "express";
import { ADMIN_ENDPOINTS } from "../endpoints/admin.endpoints.js";
import { NodeMailerService } from "../../infrastructure/services/mail/NodeMailerService.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { authMiddleware2 } from "../middlewares/auth.middleware2.ts";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../schemas/admin/department.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { GetDepartmentController } from "../controllers/admin/get-department.controller.ts";
import { GetDepartmentUseCase } from "../../application/use-cases/admin/department-management/get-department.usecase.ts";
import { MongooseDepartmentRepository } from "../../infrastructure/repositories/mongoose-department.repository.ts";
import { AddDepartmentController } from "../controllers/admin/add-department.controller.ts";
import { AddDepartmentUseCase } from "../../application/use-cases/admin/department-management/add-department.usecase.ts";
import { EditDepartmentController } from "../controllers/admin/edit-department.controller.ts";
import { UpdateDepartmentStatusController } from "../controllers/admin/update-department-status.controller.ts";
import { EditDepartmentUseCase } from "../../application/use-cases/admin/department-management/edit-department.usecase.ts";
import { UpdateDepartmentStatusUseCase } from "../../application/use-cases/admin/department-management/update-department-status.usecase.ts";
import { GetAllDoctorsController } from "../controllers/admin/get-all-doctors.controller.ts";
import { MongooseAddressRepository } from "../../infrastructure/repositories/mongoose-address.repository.ts";
import { MongooseDoctorRepository } from "../../infrastructure/repositories/mongoose-doctor.repository.ts";
import { MongooseDoctorClinicRepository } from "../../infrastructure/repositories/mongoose-doctor-clinic.repository.ts";
import { MongooseClinicRepository } from "../../infrastructure/repositories/mongoose-clinic.repository.ts";
import { MongooseUserRepository } from "../../infrastructure/repositories/mongoose-user.repository.ts";
import { DoctorDetailsService } from "../../application/services/doctor-details.service.ts";
import { GetAllDoctorsUseCase } from "../../application/use-cases/admin/doctor-management/get-all-doctors.usecase.ts";
import { ApproveDoctorController } from "../controllers/admin/approve-doctor.controller.ts";
import { ApproveDoctorUseCase } from "../../application/use-cases/admin/doctor-management/approve-doctor.usecase.ts";
import { RejectDoctorController } from "../controllers/admin/reject-doctor.controller.ts";
import { RejectDoctorUseCase } from "../../application/use-cases/admin/doctor-management/reject-doctor.usecase.ts";
import { GetAllPatientsController } from "../controllers/admin/get-all-patients.controller.ts";
import { GetAllPatientsUseCase } from "../../application/use-cases/admin/patient-management/get-all-patients.usecase.ts";
import { MongoosePatientRepository } from "../../infrastructure/repositories/mongoose-patient.repository.ts";
import { PatientDetailsService } from "../../application/services/patient-details.service.ts";
import { UpdatePatientStatusController } from "../controllers/admin/update-patient-status.controller.ts";
import { UpdatePatientStatusUseCase } from "../../application/use-cases/admin/patient-management/update-patient-status.usecase.ts";
import { GetPatientController } from "../controllers/admin/get-patient.controller.ts";
import { GetPatientUseCase } from "../../application/use-cases/admin/patient-management/get-patient.usecase.ts";
import { GetDoctorController } from "../controllers/admin/get-doctor.controller.ts";
import { GetDoctorUseCase } from "../../application/use-cases/admin/doctor-management/get-doctor.usecase.ts";
import { UpdateDoctorStatusController } from "../controllers/admin/update-doctor-status.controller.ts";
import { UpdateDoctorStatusUseCase } from "../../application/use-cases/admin/patient-management/update-doctor-status.usecase.ts";
import { updateUserSchema } from "../schemas/shared/user.schema.ts";

const router = Router();

// DB Repo's
const mongooseUserRepository = new MongooseUserRepository();
const mongoosePatientRepository = new MongoosePatientRepository();
const mongooseClinicRepository = new MongooseClinicRepository();
const mongooseDoctorRepository = new MongooseDoctorRepository();
const mongooseDoctorClinicRepository = new MongooseDoctorClinicRepository();
const mongooseAddressRepository = new MongooseAddressRepository();
const mongooseDepartmentRepository = new MongooseDepartmentRepository();

// Services
const nodeMailerService = new NodeMailerService();

// Service-Usecase
const doctorDetailsService = new DoctorDetailsService(
  mongooseUserRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  mongooseDepartmentRepository,
);
const patientDetailsService = new PatientDetailsService(
  mongooseUserRepository,
  mongooseAddressRepository,
);

// Use-cases
const getDepartmentUseCase = new GetDepartmentUseCase(
  mongooseDepartmentRepository,
);
const addDepartmentUseCase = new AddDepartmentUseCase(
  mongooseDepartmentRepository,
);
const editDepartmentUseCase = new EditDepartmentUseCase(
  mongooseDepartmentRepository,
);
const updateDepartmentStatusUseCase = new UpdateDepartmentStatusUseCase(
  mongooseDepartmentRepository,
);
const getAllDoctorsUseCase = new GetAllDoctorsUseCase(
  mongooseDoctorRepository,
  doctorDetailsService,
);
const getDoctorUseCase = new GetDoctorUseCase(
  mongooseDoctorRepository,
  mongooseUserRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  mongooseDepartmentRepository
);
const getAllPatientsUseCase = new GetAllPatientsUseCase(
  mongoosePatientRepository,
  patientDetailsService,
);
const getPatientUseCase = new GetPatientUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
  mongooseUserRepository,
);
const approveDoctorUseCase = new ApproveDoctorUseCase(
  mongooseDoctorRepository,
  mongooseDoctorClinicRepository,
  mongooseUserRepository,
  nodeMailerService,
);
const rejectDoctorUseCase = new RejectDoctorUseCase(
  mongooseDoctorRepository,
  mongooseUserRepository,
  mongooseDoctorClinicRepository,
  mongooseAddressRepository,
  nodeMailerService,
);
const updatePatientStatusUseCase = new UpdatePatientStatusUseCase(
  mongoosePatientRepository,
  mongooseUserRepository,
);
const updateDoctorStatusUseCase = new UpdateDoctorStatusUseCase(
  mongooseDoctorRepository,
  mongooseUserRepository,
);

// Controllers
const getDepartmentController = new GetDepartmentController(
  getDepartmentUseCase,
);
const addDepartmentController = new AddDepartmentController(
  addDepartmentUseCase,
);
const editDepartmentController = new EditDepartmentController(
  editDepartmentUseCase,
);
const updateDepartmentStatusController = new UpdateDepartmentStatusController(
  updateDepartmentStatusUseCase,
);
const getAllDoctorsController = new GetAllDoctorsController(
  getAllDoctorsUseCase,
);
const getDoctorController = new GetDoctorController(
  getDoctorUseCase,
);
const getAllPatientsController = new GetAllPatientsController(
  getAllPatientsUseCase,
);
const getPatientController = new GetPatientController(getPatientUseCase);
const approveDoctorController = new ApproveDoctorController(
  approveDoctorUseCase,
);
const rejectDoctorController = new RejectDoctorController(rejectDoctorUseCase);
const updatePatientStatusController = new UpdatePatientStatusController(
  updatePatientStatusUseCase,
);
const updateDoctorStatusController = new UpdateDoctorStatusController(
  updateDoctorStatusUseCase,
);

// Routes
router.get(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await getDepartmentController.handle(req, res, next);
  },
);

router.post(
  ADMIN_ENDPOINTS["ADD_DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await addDepartmentController.handle(req, res, next);
  },
);

router.put(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await editDepartmentController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  validate(updateDepartmentSchema),
  async (req, res, next) => {
    await updateDepartmentStatusController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_DOCTORS"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await getAllDoctorsController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_DOCTOR"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await getDoctorController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_PATIENTS"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await getAllPatientsController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_PATIENT"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await getPatientController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["APPROVE_DOCTOR"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await approveDoctorController.handle(req, res, next);
  },
);

router.delete(
  ADMIN_ENDPOINTS["REJECT_DOCTOR"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await rejectDoctorController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["UPDATE_PATIENT"],
  authMiddleware,
  authMiddleware2,
  validate(updateUserSchema),
  async (req, res, next) => {
    await updatePatientStatusController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["UPDATE_DOCTOR"],
  authMiddleware,
  authMiddleware2,
  validate(updateUserSchema),
  async (req, res, next) => {
    await updateDoctorStatusController.handle(req, res, next);
  },
);

export default router;
