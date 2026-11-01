import { PatientDetailsService } from "../../application/services/patient/patient-details.service.ts";
import { AddDepartmentUseCase } from "../../application/use-cases/admin/department-management/add-department.usecase.ts";
import { EditDepartmentUseCase } from "../../application/use-cases/admin/department-management/edit-department.usecase.ts";
import { GetDepartmentUseCase } from "../../application/use-cases/admin/department-management/get-department.usecase.ts";
import { UpdateDepartmentStatusUseCase } from "../../application/use-cases/admin/department-management/update-department-status.usecase.ts";
import { ApproveDoctorUseCase } from "../../application/use-cases/admin/doctor-management/approve-doctor.usecase.ts";
import { GetAllDoctorsUseCase } from "../../application/use-cases/admin/doctor-management/get-all-doctors.usecase.ts";
import { GetDoctorUseCase } from "../../application/use-cases/admin/doctor-management/get-doctor.usecase.ts";
import { RejectDoctorUseCase } from "../../application/use-cases/admin/doctor-management/reject-doctor.usecase.ts";
import { VerifyDoctorDocumentUseCase } from "../../application/use-cases/admin/doctor-management/verify-doctor-document.usecase.ts";
import { VerifyClinicDocumentUseCase } from "../../application/use-cases/admin/doctor-management/verify-clinic-document.usecase.ts";
import { GetAllPatientsUseCase } from "../../application/use-cases/admin/patient-management/get-all-patients.usecase.ts";
import { GetPatientUseCase } from "../../application/use-cases/admin/patient-management/get-patient.usecase.ts";
import { UpdateDoctorStatusUseCase } from "../../application/use-cases/admin/doctor-management/update-doctor-status.usecase.ts";
import { UpdatePatientStatusUseCase } from "../../application/use-cases/admin/patient-management/update-patient-status.usecase.ts";
import {
  argonHashService,
  doctorDetailsService,
  jwtService,
  mongooseAddressRepository,
  mongooseClinicRepository,
  mongooseDepartmentRepository,
  mongooseDoctorClinicRepository,
  mongooseDoctorReapplicationRepository,
  mongooseDoctorRepository,
  mongoosePatientRepository,
  mongooseSubscriptionPlanRepository,
  mongooseUserRepository,
  nodeMailService,
} from "../index.ts";
import { ActionTokenGenerationService } from "../../application/services/shared/token/action-token.service.ts";
import { CreateSubscriptionPlanUseCase } from "../../application/use-cases/admin/subscription-management/create-subscription-plan.usecase.ts";
import { GetAllSubscriptionPlansUseCase } from "../../application/use-cases/admin/subscription-management/get-all-subscription-plans.usecase.ts";
import { EditSubscriptionPlanUseCase } from "../../application/use-cases/admin/subscription-management/edit-subscription-plan.usecase.ts";
import { DepartmentController } from "../../presentation/controllers/admin/department.controller.ts";
import { DoctorController } from "../../presentation/controllers/admin/doctor.controller.ts";
import { PatientController } from "../../presentation/controllers/admin/patient.controller.ts";
import { SubscriptionPlanController } from "../../presentation/controllers/admin/subscription-plan.controller.ts";
import { UpdateSubscriptionPlanStatusUseCase } from "../../application/use-cases/admin/subscription-management/update-subscription-plan-status.usecase.ts";

// Service-Usecase

const patientDetailsService = new PatientDetailsService(
  mongooseUserRepository,
  mongooseAddressRepository,
);

const actionTokenGenerationService = new ActionTokenGenerationService(
  jwtService,
  mongooseDoctorReapplicationRepository,
  argonHashService,
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
  doctorDetailsService,
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
  mongooseClinicRepository,
  mongooseDoctorClinicRepository,
  mongooseUserRepository,
  nodeMailService,
);
const rejectDoctorUseCase = new RejectDoctorUseCase(
  mongooseDoctorRepository,
  mongooseUserRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  mongooseDoctorReapplicationRepository,
  nodeMailService,
  actionTokenGenerationService,
);
const updatePatientStatusUseCase = new UpdatePatientStatusUseCase(
  mongoosePatientRepository,
  mongooseUserRepository,
);
const updateDoctorStatusUseCase = new UpdateDoctorStatusUseCase(
  mongooseDoctorRepository,
  mongooseUserRepository,
);
const verifyDoctorDocumentUseCase = new VerifyDoctorDocumentUseCase(
  mongooseDoctorRepository,
);
const verifyClinicDocumentUseCase = new VerifyClinicDocumentUseCase(
  mongooseClinicRepository,
);
const createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(
  mongooseSubscriptionPlanRepository,
);
const getAllSubscriptionPlansUseCase = new GetAllSubscriptionPlansUseCase(
  mongooseSubscriptionPlanRepository,
);
const editSubscriptionPlanUseCase = new EditSubscriptionPlanUseCase(
  mongooseSubscriptionPlanRepository,
);
const updateSubscriptionPlanStatusUseCase = new UpdateSubscriptionPlanStatusUseCase(
  mongooseSubscriptionPlanRepository,
);
// const searchDoctorsUsecase = new SearchDoctorsUsecase(
//   mongooseUserRepository,
//   mongooseDoctorRepository,
// );

// Controllers
export const adminDepartmentController = new DepartmentController(
  addDepartmentUseCase,
  editDepartmentUseCase,
  getDepartmentUseCase,
  updateDepartmentStatusUseCase,
);

export const adminDoctorController = new DoctorController(
  getDoctorUseCase,
  getAllDoctorsUseCase,
  updateDoctorStatusUseCase,
  approveDoctorUseCase,
  rejectDoctorUseCase,
  verifyClinicDocumentUseCase,
  verifyDoctorDocumentUseCase,
);

export const adminPatientController = new PatientController(
  getPatientUseCase,
  getAllPatientsUseCase,
  updatePatientStatusUseCase,
);

export const adminSubscriptionPlanController = new SubscriptionPlanController(
  createSubscriptionPlanUseCase,
  editSubscriptionPlanUseCase,
  getAllSubscriptionPlansUseCase,
  updateSubscriptionPlanStatusUseCase
);
