import { GetAllDoctorsUsecase } from "../../application/use-cases/patient/doctors/get-all-doctors.usecase.ts";
import { CreatePatientProfileUseCase } from "../../application/use-cases/patient/profile/create-patient-profile.usecase.ts";
import { PatientProfilesUseCase } from "../../application/use-cases/patient/profile/patient-profiles.usecase.ts";
import { UpdatePatientAddressUseCase } from "../../application/use-cases/patient/profile/update-patient-address.usecase.ts";
import { UpdatePatientEmergencyContactUseCase } from "../../application/use-cases/patient/profile/update-patient-emergency-contact.usecase.ts";
import { UpdatePatientProfilePictureUseCase } from "../../application/use-cases/patient/profile/update-patient-profile-picture.usecase.ts";
import { UpdatePatientProfileUseCase } from "../../application/use-cases/patient/profile/update-patient-profile.usecase.ts";
import { GetPatientWalletUseCase } from "../../application/use-cases/patient/wallet-management/get-wallet.usecase.ts";
import { WalletController } from "../../presentation/controllers/shared/wallet.controller.ts";
import { DoctorController } from "../../presentation/controllers/patient/doctor.controller.ts";
import { PatientController } from "../../presentation/controllers/patient/patient.controller.ts";
import {
  mongooseAddressRepository,
  mongooseUserRepository,
  mongoosePatientRepository,
  mongooseDoctorRepository,
  doctorDetailsService,
  mongooseWalletRepository,
  walletTransactionsDetailsService,
} from "../index.ts";
import { GetDoctorWalletBalanceUseCase } from "../../application/use-cases/doctor/wallet-management/get-wallet-balance.usecase.ts";

// Service-Usecase

// Use-cases
const patientProfilesUseCase = new PatientProfilesUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
);

const updatePatientProfileUseCase = new UpdatePatientProfileUseCase(
  mongooseUserRepository,
  mongoosePatientRepository,
);

const updatePatientProfilePictureUseCase =
  new UpdatePatientProfilePictureUseCase(
    mongooseUserRepository,
    mongoosePatientRepository,
  );

const updatePatientAddressUseCase = new UpdatePatientAddressUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
);
const updatePatientEmergencyContactUseCase =
  new UpdatePatientEmergencyContactUseCase(mongoosePatientRepository);

const createPatientProfileUseCase = new CreatePatientProfileUseCase(
  mongoosePatientRepository,
  mongooseAddressRepository,
  mongooseUserRepository,
);
const getAllDoctorsUseCase = new GetAllDoctorsUsecase(
  mongooseDoctorRepository,
  doctorDetailsService,
);

export const getPatientWalletUseCase = new GetPatientWalletUseCase(
  mongooseWalletRepository,
  mongooseUserRepository,
  mongoosePatientRepository,
  walletTransactionsDetailsService,
);

export const getDoctorWalletBalanceUseCase = new GetDoctorWalletBalanceUseCase(
  mongooseWalletRepository,
  mongooseUserRepository,
  mongooseDoctorRepository,
)

// Controllers
export const patientController = new PatientController(
  patientProfilesUseCase,
  createPatientProfileUseCase,
  updatePatientProfileUseCase,
  updatePatientAddressUseCase,
  updatePatientEmergencyContactUseCase,
  updatePatientProfilePictureUseCase,
);

export const patientDoctorController = new DoctorController(
  getAllDoctorsUseCase,
);
