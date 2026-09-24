import { GetDoctorDetailsContextService } from "../../application/services/get-doctor-details-context.service.ts";
import { UpdateAddressService } from "../../application/services/update-address.service.ts";
import { UpdateClinicService } from "../../application/services/update-clinic.service.ts";
import { UpdateDoctorService } from "../../application/services/update-doctor.service.ts";
import { UserCreationService } from "../../application/services/user-creation.service.ts";
import { VerifyDoctorReapplicationTokenService } from "../../application/services/verify-doctor-reapplication-token.service.ts";
import { GetReapplicationDetailsUseCase } from "../../application/use-cases/admin/doctor-management/get-doctor-reapplication.use-case.ts";
import { UpdateReapplicationDetailsUseCase } from "../../application/use-cases/admin/doctor-management/update-doctor-reapplication.use-case.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { DoctorRegisterUseCase } from "../../application/use-cases/doctor/profile/doctor-register.usecase.ts";
import { UpdateDoctorAddressUseCase } from "../../application/use-cases/doctor/profile/update-doctor-address.usecase.ts";
import { UpdateDoctorConsultationDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-consultation-details.useCase.ts";
import { UpdateDoctorProfessionalDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-professional-details.useCase.ts";
import { UpdateDoctorProfilePictureUseCase } from "../../application/use-cases/doctor/profile/update-doctor-profile-picture.usecase.ts";
import { DoctorProfileController } from "../../presentation/controllers/doctor/doctor-profile.controller.ts";
import { DoctorRegisterController } from "../../presentation/controllers/doctor/doctor-register.controller.ts";
import { GetDoctorReapplicationController } from "../../presentation/controllers/doctor/get-doctor-reapplication.controller.ts";
import { UpdateDoctorAddressController } from "../../presentation/controllers/doctor/update-doctor-address.controller.ts";
import { UpdateDoctorConsultationDetailsController } from "../../presentation/controllers/doctor/update-doctor-consultation-details.controller.ts";
import { UpdateDoctorProfessionalDetailsController } from "../../presentation/controllers/doctor/update-doctor-professional-details.controller.ts";
import { UpdateDoctorProfilePictureController } from "../../presentation/controllers/doctor/update-doctor-profile-picture.controller.ts";
import { UpdateDoctorReapplicationController } from "../../presentation/controllers/doctor/update-doctor-reapplication.controller.ts";
import {
  mongooseAddressRepository,
  mongooseClinicRepository,
  mongooseDepartmentRepository,
  mongooseDoctorClinicRepository,
  mongooseDoctorRepository,
  mongooseUserRepository,
  argonHashService,
  emailVerificationService,
  mongooseDoctorReapplicationRepository,
  jwtService,
  redisService,
} from "../index.ts";

// Service-Usecase
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonHashService,
);
const updateDoctorService = new UpdateDoctorService();
const updateClinicService = new UpdateClinicService();
const updateAddressService = new UpdateAddressService();
const verifyDoctorReapplicationService =
  new VerifyDoctorReapplicationTokenService(
    mongooseDoctorReapplicationRepository,
    jwtService,
    argonHashService,
  );
const getDoctorDetailsContextService = new GetDoctorDetailsContextService(
  mongooseDoctorRepository,
  mongooseUserRepository,
  mongooseClinicRepository,
  mongooseDoctorClinicRepository,
  mongooseAddressRepository,
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
  emailVerificationService,
);

const getReapplicationDetailsUseCase = new GetReapplicationDetailsUseCase(
  verifyDoctorReapplicationService,
  getDoctorDetailsContextService,
);

const updateReapplicationDetailsUseCase = new UpdateReapplicationDetailsUseCase(
  mongooseDoctorReapplicationRepository,
  mongooseDoctorRepository,
  mongooseUserRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  verifyDoctorReapplicationService,
  getDoctorDetailsContextService,
  updateDoctorService,
  updateClinicService,
  updateAddressService,
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
export const doctorProfileController = new DoctorProfileController(
  doctorProfileUseCase,
);

export const doctorRegisterController = new DoctorRegisterController(
  doctorRegisterUseCase,
);

export const getDoctorReapplicationController =
  new GetDoctorReapplicationController(getReapplicationDetailsUseCase);

export const updateDoctorReapplicationController =
  new UpdateDoctorReapplicationController(updateReapplicationDetailsUseCase);

export const updateDoctorProfessionalDetailsController =
  new UpdateDoctorProfessionalDetailsController(
    updateDoctorProfessionalDetailsUseCase,
  );

export const updateDoctorConsultationDetailsController =
  new UpdateDoctorConsultationDetailsController(
    updateDoctorConsultationDetailsUseCase,
  );

export const updateDoctorAddressController = new UpdateDoctorAddressController(
  updateDoctorAddressUseCase,
);

export const updateDoctorProfilePictureController =
  new UpdateDoctorProfilePictureController(updateDoctorProfilePictureUseCase);
