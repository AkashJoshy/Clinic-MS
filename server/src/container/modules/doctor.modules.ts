import { GenerateSlotsService } from "../../application/services/slot/generate-slots.service.ts";
import { GetDoctorDetailsContextService } from "../../application/services/doctor/get-doctor-details-context.service.ts";
import { UpdateAddressService } from "../../application/services/shared/address/update-address.service.ts";
import { UpdateClinicService } from "../../application/services/clinic/update-clinic.service.ts";
import { UpdateDoctorService } from "../../application/services/doctor/update-doctor.service.ts";
import { UserCreationService } from "../../application/services/shared/user/user-creation.service.ts";
import { VerifyDoctorReapplicationTokenService } from "../../application/services/doctor/verify-doctor-reapplication-token.service.ts";
import { WalletCreationService } from "../../application/services/wallet/wallet-creation.service.ts";
import { GetReapplicationDetailsUseCase } from "../../application/use-cases/doctor/reapplication/get-doctor-reapplication.use-case.ts";
import { ConfirmSlotsUseCase } from "../../application/use-cases/doctor/slot/confirm-slots.usecase.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { DoctorRegisterUseCase } from "../../application/use-cases/auth/register/doctor-register.usecase.ts";
import { GenerateSlotsUseCase } from "../../application/use-cases/doctor/slot/generate-slots.usecase.ts";
import { UpdateDoctorAddressUseCase } from "../../application/use-cases/doctor/profile/update-doctor-address.usecase.ts";
import { UpdateDoctorConsultationDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-consultation-details.usecase.ts";
import { UpdateDoctorProfessionalDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-professional-details.usecase.ts";
import { UpdateDoctorProfilePictureUseCase } from "../../application/use-cases/doctor/profile/update-doctor-profile-picture.usecase.ts";
import { GetDoctorWalletUseCase } from "../../application/use-cases/doctor/wallet-management/get-wallet.usecase.ts";
import { DoctorController } from "../../presentation/controllers/doctor/doctor.controller.ts";
import { ReapplicationController } from "../../presentation/controllers/doctor/reapplication.controller.ts";
import { SlotController } from "../../presentation/controllers/doctor/slot.controller.ts";
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
  doctorDetailsService,
  doctorExistsService,
  mongooseSlotRepository,
  mongooseWalletRepository,
  walletTransactionsDetailsService,
  mongooseDoctorSubscriptionRepository,
  mongooseSubscriptionPlanRepository,
  mongooseWalletTransactionRepository,
  subscriptionChangeCalculationService,
} from "../index.ts";
import { UpdateReapplicationDetailsUseCase } from "../../application/use-cases/doctor/reapplication/update-doctor-reapplication.use-case.ts";
import { GetSubscriptionOverview } from "../../application/use-cases/doctor/subscription/get-subscription-overview.usecase.ts";
import { SubscriptionController } from "../../presentation/controllers/doctor/subscription.controller.ts";
import { BuySubscriptionWithWallet } from "../../application/use-cases/doctor/subscription/buy-subscription-with-wallet.usecase.ts";
import { CancelSubscriptionUseCase } from "../../application/use-cases/doctor/subscription/cancel-subscription.use-case.ts";
import { GetSubscriptionUpgradeOptionsUseCase } from "../../application/use-cases/doctor/subscription/get-subscription-upgrade-options.usecase.ts";
import { GetDoctorDashboardOverviewUseCase } from "../../application/use-cases/doctor/dashboard/get-doctor-dashboard-overview.use-case.ts";
import { DashboardController } from "../../presentation/controllers/doctor/dashboard.controller.ts";
import { GetDoctorCalendarUseCase } from "../../application/use-cases/doctor/dashboard/get-doctor-calendar.usecase.ts";
import { InitializeCalendarDateRangeUseCase } from "../../application/services/dashboard/doctor/initialize-calendar-date-range.service.ts";

// Service-Usecase
const walletCreationService = new WalletCreationService(
  mongooseWalletRepository,
);
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonHashService,
  walletCreationService,
);
const updateDoctorService = new UpdateDoctorService();
const updateClinicService = new UpdateClinicService();
const updateAddressService = new UpdateAddressService();
const generateSlotsService = new GenerateSlotsService();
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

const initializeCalendarDateRangeUseCase = new InitializeCalendarDateRangeUseCase()

// Use-cases
const doctorProfileUseCase = new DoctorProfileUseCase(
  mongooseDoctorRepository,
  doctorDetailsService,
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

const generateSlotsUseCase = new GenerateSlotsUseCase(
  mongooseDoctorClinicRepository,
  generateSlotsService,
  doctorExistsService,
);
const confirmSlotsUseCase = new ConfirmSlotsUseCase(
  doctorExistsService,
  mongooseSlotRepository,
  mongooseDoctorSubscriptionRepository,
);

export const getDoctorWalletUseCase = new GetDoctorWalletUseCase(
  mongooseWalletRepository,
  mongooseUserRepository,
  mongooseDoctorRepository,
  walletTransactionsDetailsService,
);

export const getSubscriptionOverviewUseCase = new GetSubscriptionOverview(
  mongooseDoctorRepository,
  mongooseSubscriptionPlanRepository,
  mongooseDoctorSubscriptionRepository,
);

export const buySubscriptionWithWalletUseCase = new BuySubscriptionWithWallet(
  mongooseUserRepository,
  mongooseDoctorRepository,
  mongooseSubscriptionPlanRepository,
  mongooseDoctorSubscriptionRepository,
  mongooseWalletRepository,
  mongooseWalletTransactionRepository,
  subscriptionChangeCalculationService
);

export const getSubscriptionUpgradeOptionsUseCase =
  new GetSubscriptionUpgradeOptionsUseCase(
    mongooseDoctorRepository,
    mongooseDoctorSubscriptionRepository,
    mongooseSubscriptionPlanRepository,
    subscriptionChangeCalculationService
  );

export const cancelSubscriptionUseCase = new CancelSubscriptionUseCase(
  mongooseDoctorRepository,
  mongooseDoctorSubscriptionRepository,
  mongooseSubscriptionPlanRepository,
  mongooseWalletRepository,
  mongooseWalletTransactionRepository,
);

export const getDoctorDashboardOverviewUseCase = new GetDoctorDashboardOverviewUseCase(
  mongooseDoctorRepository,
  mongooseSlotRepository,
  mongooseClinicRepository,
  mongooseDoctorClinicRepository
);

export const getDoctorCalendarUseCase = new GetDoctorCalendarUseCase(
  mongooseSlotRepository,
  mongooseDoctorRepository,
  mongooseClinicRepository,
  mongooseDoctorClinicRepository,
  initializeCalendarDateRangeUseCase
);

// Controllers
export const doctorController = new DoctorController(
  doctorProfileUseCase,
  updateDoctorAddressUseCase,
  updateDoctorConsultationDetailsUseCase,
  updateDoctorProfessionalDetailsUseCase,
  updateDoctorProfilePictureUseCase,
);

export const doctorReapplicationController = new ReapplicationController(
  getReapplicationDetailsUseCase,
  updateReapplicationDetailsUseCase,
);

export const doctorSlotController = new SlotController(
  generateSlotsUseCase,
  confirmSlotsUseCase,
);

export const doctorSubscriptionController = new SubscriptionController(
  getSubscriptionOverviewUseCase,
  buySubscriptionWithWalletUseCase,
  cancelSubscriptionUseCase,
  getSubscriptionUpgradeOptionsUseCase,
);
export const doctorDashboardController = new DashboardController(
  getDoctorDashboardOverviewUseCase,
  getDoctorCalendarUseCase
);
