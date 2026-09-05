import { DoctorDetailsService } from "../../application/services/doctor-details.service.ts";
import { PatientDetailsService } from "../../application/services/patient-details.service.ts";
import { AddDepartmentUseCase } from "../../application/use-cases/admin/department-management/add-department.usecase.ts";
import { EditDepartmentUseCase } from "../../application/use-cases/admin/department-management/edit-department.usecase.ts";
import { GetDepartmentUseCase } from "../../application/use-cases/admin/department-management/get-department.usecase.ts";
import { UpdateDepartmentStatusUseCase } from "../../application/use-cases/admin/department-management/update-department-status.usecase.ts";
import { ApproveDoctorUseCase } from "../../application/use-cases/admin/doctor-management/approve-doctor.usecase.ts";
import { GetAllDoctorsUseCase } from "../../application/use-cases/admin/doctor-management/get-all-doctors.usecase.ts";
import { GetDoctorUseCase } from "../../application/use-cases/admin/doctor-management/get-doctor.usecase.ts";
import { RejectDoctorUseCase } from "../../application/use-cases/admin/doctor-management/reject-doctor.usecase.ts";
import { GetAllPatientsUseCase } from "../../application/use-cases/admin/patient-management/get-all-patients.usecase.ts";
import { GetPatientUseCase } from "../../application/use-cases/admin/patient-management/get-patient.usecase.ts";
import { UpdateDoctorStatusUseCase } from "../../application/use-cases/admin/patient-management/update-doctor-status.usecase.ts";
import { UpdatePatientStatusUseCase } from "../../application/use-cases/admin/patient-management/update-patient-status.usecase.ts";
import { AddDepartmentController } from "../../presentation/controllers/admin/add-department.controller.ts";
import { ApproveDoctorController } from "../../presentation/controllers/admin/approve-doctor.controller.ts";
import { EditDepartmentController } from "../../presentation/controllers/admin/edit-department.controller.ts";
import { GetAllDoctorsController } from "../../presentation/controllers/admin/get-all-doctors.controller.ts";
import { GetAllPatientsController } from "../../presentation/controllers/admin/get-all-patients.controller.ts";
import { GetDepartmentController } from "../../presentation/controllers/admin/get-department.controller.ts";
import { GetDoctorController } from "../../presentation/controllers/admin/get-doctor.controller.ts";
import { GetPatientController } from "../../presentation/controllers/admin/get-patient.controller.ts";
import { RejectDoctorController } from "../../presentation/controllers/admin/reject-doctor.controller.ts";
import { UpdateDepartmentStatusController } from "../../presentation/controllers/admin/update-department-status.controller.ts";
import { UpdateDoctorStatusController } from "../../presentation/controllers/admin/update-doctor-status.controller.ts";
import { UpdatePatientStatusController } from "../../presentation/controllers/admin/update-patient-status.controller.ts";
import {
  mongooseAddressRepository,
  mongooseClinicRepository,
  mongooseDepartmentRepository,
  mongooseDoctorClinicRepository,
  mongooseDoctorRepository,
  mongoosePatientRepository,
  mongooseUserRepository,
  nodeMailService,
} from "../index.ts";

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
  nodeMailService,
);
const rejectDoctorUseCase = new RejectDoctorUseCase(
  mongooseDoctorRepository,
  mongooseUserRepository,
  mongooseDoctorClinicRepository,
  mongooseAddressRepository,
  nodeMailService,
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
export const getDepartmentController = new GetDepartmentController(
  getDepartmentUseCase,
);

export const addDepartmentController = new AddDepartmentController(
  addDepartmentUseCase,
);

export const editDepartmentController = new EditDepartmentController(
  editDepartmentUseCase,
);

export const updateDepartmentStatusController = new UpdateDepartmentStatusController(
  updateDepartmentStatusUseCase,
);

export const getAllDoctorsController = new GetAllDoctorsController(
  getAllDoctorsUseCase,
);

export const getDoctorController = new GetDoctorController(getDoctorUseCase);

export const getAllPatientsController = new GetAllPatientsController(
  getAllPatientsUseCase,
);

export const getPatientController = new GetPatientController(getPatientUseCase);

export const approveDoctorController = new ApproveDoctorController(
  approveDoctorUseCase,
);

export const rejectDoctorController = new RejectDoctorController(rejectDoctorUseCase);

export const updatePatientStatusController = new UpdatePatientStatusController(
  updatePatientStatusUseCase,
);

export const updateDoctorStatusController = new UpdateDoctorStatusController(
  updateDoctorStatusUseCase,
);
