import { Router } from "express";
import { ADMIN_ENDPOINTS } from "../endpoints/admin.endpoints.js";
import { NodeMailerService } from "../../infrastructure/services/mail/NodeMailerService.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../schemas/admin/admin.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { GetDepartmentController } from "../controllers/admin/get-department.controller.ts";
import { GetDepartmentUseCase } from "../../application/use-cases/admin/department-management/get-department.usecase.ts";
import { DepartmentRepository } from "../../infrastructure/repositories/department.repository.ts";
import { AddDepartmentController } from "../controllers/admin/add-department.controller.ts";
import { AddDepartmentUseCase } from "../../application/use-cases/admin/department-management/add-department.usecase.ts";
import { EditDepartmentController } from "../controllers/admin/edit-department.controller.ts";
import { UpdateDepartmentStatusController } from "../controllers/admin/update-department-status.controller.ts";
import { EditDepartmentUseCase } from "../../application/use-cases/admin/department-management/edit-department.usecase.ts";
import { UpdateDepartmentStatusUseCase } from "../../application/use-cases/admin/department-management/update-department-status.usecase.ts";
import { GetAllDoctorsController } from "../controllers/admin/get-all-doctors.controller.ts";
import { AddressRepository } from "../../infrastructure/repositories/address.repository.ts";
import { DoctorRepository } from "../../infrastructure/repositories/doctor.repository.ts";
import { DoctorClinicRepository } from "../../infrastructure/repositories/doctor-clinic.repository.ts";
import { ClinicRepository } from "../../infrastructure/repositories/clinic.repository.ts";
import { UserRepository } from "../../infrastructure/repositories/user.repository.ts";
import { DoctorDetailsService } from "../../application/services/doctor-details.service.ts";
import { GetAllDoctorsUseCase } from "../../application/use-cases/admin/doctor-management/get-all-doctors.usecase.ts";
import { ApproveDoctorController } from "../controllers/admin/approve-doctor.controller.ts";
import { ApproveDoctorUseCase } from "../../application/use-cases/admin/doctor-management/approve-doctor.usecase.ts";
import { RejectDoctorController } from "../controllers/admin/reject-doctor.controller.ts";
import { RejectDoctorUseCase } from "../../application/use-cases/admin/doctor-management/reject-doctor.usecase.ts";
import { GetAllPatientsController } from "../controllers/admin/get-all-patients.controller.ts";
import { GetAllPatientsUseCase } from "../../application/use-cases/admin/patient-management/get-all-patients.usecase.ts";
import { PatientRepository } from "../../infrastructure/repositories/patient.repository.ts";
import { PatientDetailsService } from "../../application/services/patient-details.service.ts";
import { UpdatePatientStatusController } from "../controllers/admin/update-patient-status.controller.ts";
import { UpdatePatientStatusUseCase } from "../../application/use-cases/admin/patient-management/update-patient-status.usecase.ts";
import { GetPatientController } from "../controllers/admin/get-patient.controller.ts";
import { GetPatientUseCase } from "../../application/use-cases/admin/patient-management/get-patient.usecase.ts";
import { GetDoctorController } from "../controllers/admin/get-doctor.controller.ts";
import { GetDoctorUseCase } from "../../application/use-cases/admin/doctor-management/get-doctor.usecase.ts";
import { UpdateDoctorStatusController } from "../controllers/admin/update-doctor-status.controller.ts";
import { UpdateDoctorStatusUseCase } from "../../application/use-cases/admin/patient-management/update-doctor-status.usecase.ts";
import { updateUserSchema } from "../schemas/shared/shared.schema.ts";

const router = Router();

// DB Repo's
const mongooseUserRepository = new UserRepository();
const mongoosePatientRepository = new PatientRepository();
const mongooseClinicRepository = new ClinicRepository();
const mongooseDoctorRepository = new DoctorRepository();
const mongooseDoctorClinicRepository = new DoctorClinicRepository();
const mongooseAddressRepository = new AddressRepository();
const mongooseDepartmentRepository = new DepartmentRepository();

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
  mongooseDepartmentRepository,
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
const getDoctorController = new GetDoctorController(getDoctorUseCase);
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
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getDepartmentController.handle(req, res, next);
  },
);

router.post(
  ADMIN_ENDPOINTS["ADD_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await addDepartmentController.handle(req, res, next);
  },
);

router.put(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await editDepartmentController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  validate(updateDepartmentSchema),
  async (req, res, next) => {
    await updateDepartmentStatusController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_DOCTORS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getAllDoctorsController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_DOCTOR"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getDoctorController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_PATIENTS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getAllPatientsController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_PATIENT"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getPatientController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["APPROVE_DOCTOR"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await approveDoctorController.handle(req, res, next);
  },
);

router.delete(
  ADMIN_ENDPOINTS["REJECT_DOCTOR"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await rejectDoctorController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["UPDATE_PATIENT"],
  authenticateUser,
  authorizeUser,
  validate(updateUserSchema),
  async (req, res, next) => {
    await updatePatientStatusController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["UPDATE_DOCTOR"],
  authenticateUser,
  authorizeUser,
  validate(updateUserSchema),
  async (req, res, next) => {
    await updateDoctorStatusController.handle(req, res, next);
  },
);

export default router;
