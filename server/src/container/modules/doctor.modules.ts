import { UpdateScheduleUseCase } from "../../application/use-cases/doctor/schedule/update-schedule.usecase.ts";
import { DoctorScheduleController } from "../../presentation/controllers/doctor/schedule.controller.ts";
import { GetDoctorDetailsContextService } from "../../application/services/doctor/get-doctor-details-context.service.ts";
import { UpdateAddressService } from "../../application/services/shared/address/update-address.service.ts";
import { UpdateClinicService } from "../../application/services/clinic/update-clinic.service.ts";
import { UpdateDoctorService } from "../../application/services/doctor/update-doctor.service.ts";
import { UserCreationService } from "../../application/services/shared/user/user-creation.service.ts";
import { VerifyDoctorReapplicationTokenService } from "../../application/services/doctor/verify-doctor-reapplication-token.service.ts";
import { WalletCreationService } from "../../application/services/wallet/wallet-creation.service.ts";
import { GetReapplicationDetailsUseCase } from "../../application/use-cases/doctor/reapplication/get-doctor-reapplication.use-case.ts";
import { DoctorProfileUseCase } from "../../application/use-cases/doctor/profile/doctor-profile.usecase.ts";
import { UpdateDoctorAddressUseCase } from "../../application/use-cases/doctor/profile/update-doctor-address.usecase.ts";
import { UpdateDoctorConsultationDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-consultation-details.usecase.ts";
import { UpdateDoctorProfessionalDetailsUseCase } from "../../application/use-cases/doctor/profile/update-doctor-professional-details.usecase.ts";
import { UpdateDoctorProfilePictureUseCase } from "../../application/use-cases/doctor/profile/update-doctor-profile-picture.usecase.ts";
import { GetDoctorWalletUseCase } from "../../application/use-cases/doctor/wallet-management/get-wallet.usecase.ts";
import { DoctorController } from "../../presentation/controllers/doctor/doctor.controller.ts";
import { ReapplicationController } from "../../presentation/controllers/doctor/reapplication.controller.ts";
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
  mongooseKycRepository,
  kycEncryptionService,
  mongooseDoctorSettingsRepository,
  mongooseDoctorSubscriptionHistoryRepository,
  createWalletTransactionService,
  razorpayService,
} from "../index.ts";
import { UpdateReapplicationDetailsUseCase } from "../../application/use-cases/doctor/reapplication/update-doctor-reapplication.use-case.ts";
import { GetSubscriptionOverview } from "../../application/use-cases/doctor/subscription/get-subscription-overview.usecase.ts";
import { SubscriptionController } from "../../presentation/controllers/doctor/subscription.controller.ts";
import { BuySubscriptionWithWallet } from "../../application/use-cases/doctor/subscription/buy-subscription-with-wallet.usecase.ts";
import { CreateSubscriptionRazorpayOrderUseCase } from "../../application/use-cases/doctor/subscription/create-subscription-razorpay-order.usecase.ts";
import { VerifySubscriptionRazorpayPaymentUseCase } from "../../application/use-cases/doctor/subscription/verify-subscription-razorpay-payment.usecase.ts";
import { CancelSubscriptionUseCase } from "../../application/use-cases/doctor/subscription/cancel-subscription.use-case.ts";
import { GetSubscriptionUpgradeOptionsUseCase } from "../../application/use-cases/doctor/subscription/get-subscription-upgrade-options.usecase.ts";
import { GetDoctorDashboardOverviewUseCase } from "../../application/use-cases/doctor/dashboard/get-doctor-dashboard-overview.use-case.ts";
import { DashboardController } from "../../presentation/controllers/doctor/dashboard.controller.ts";
import { GetDoctorCalendarUseCase } from "../../application/use-cases/doctor/dashboard/get-doctor-calendar.usecase.ts";
import { InitializeCalendarDateRangeUseCase } from "../../application/services/dashboard/doctor/initialize-calendar-date-range.service.ts";
import { DoctorKycController } from "../../presentation/controllers/doctor/kyc.controller.ts";
import { UpdateDoctorPanDetailsUseCase } from "../../application/use-cases/doctor/kyc/update-doctor-pan-details.usecase.ts";
import { UpdateDoctorBankDetailsUseCase } from "../../application/use-cases/doctor/kyc/update-doctor-bank-details.usecase.ts";
import { UpdateDoctorAadhaarDetailsUseCase } from "../../application/use-cases/doctor/kyc/update-doctor-aadhaar-details.usecase.ts";
import { GetDoctorAadhaarDetailsUseCase } from "../../application/use-cases/doctor/kyc/get-doctor-aadhaar-details.usecase.ts";
import { GetDoctorPanDetailsUseCase } from "../../application/use-cases/doctor/kyc/get-doctor-pan-details.usecase.ts";
import { GetDoctorBankDetailsUseCase } from "../../application/use-cases/doctor/kyc/get-doctor-bank-details.usecase.ts";
import { GetDoctorKycDetailsUseCase } from "../../application/use-cases/doctor/kyc/get-doctor-kyc-details.usecase.ts";
import { UpdateDoctorPersonalUseCase } from "../../application/use-cases/doctor/profile/update-doctor-personal.usecase.ts";
import { DoctorSettingsController } from "../../presentation/controllers/doctor/doctor-settings.controller.ts";
import { UpdateDoctorSettingsUseCase } from "../../application/use-cases/doctor/settings/update-doctor-settings.use-case.ts";
import { GetDoctorSettingsUseCase } from "../../application/use-cases/doctor/settings/get-doctor-settings.use-case.ts";

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

const initializeCalendarDateRangeUseCase =
  new InitializeCalendarDateRangeUseCase();

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
  mongooseClinicRepository,
  mongooseDoctorClinicRepository,
  mongooseAddressRepository,
);

const updateDoctorProfilePictureUseCase = new UpdateDoctorProfilePictureUseCase(
  mongooseUserRepository,
  mongooseDoctorRepository,
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
  mongooseDoctorSubscriptionHistoryRepository,
  subscriptionChangeCalculationService,
  createWalletTransactionService
);  

export const createSubscriptionRazorpayOrderUseCase =
  new CreateSubscriptionRazorpayOrderUseCase(
    mongooseUserRepository,
    mongooseDoctorRepository,
    mongooseSubscriptionPlanRepository,
    mongooseDoctorSubscriptionRepository,
    mongooseWalletRepository,
    mongooseWalletTransactionRepository,
    razorpayService,
    subscriptionChangeCalculationService,
    createWalletTransactionService,
  );

export const verifySubscriptionRazorpayPaymentUseCase =
  new VerifySubscriptionRazorpayPaymentUseCase(
    mongooseUserRepository,
    mongooseDoctorRepository,
    mongooseSubscriptionPlanRepository,
    mongooseDoctorSubscriptionRepository,
    mongooseWalletRepository,
    mongooseWalletTransactionRepository,
    mongooseDoctorSubscriptionHistoryRepository,
    razorpayService,
  );  

export const getSubscriptionUpgradeOptionsUseCase =
  new GetSubscriptionUpgradeOptionsUseCase(
    mongooseDoctorRepository,
    mongooseDoctorSubscriptionRepository,
    mongooseSubscriptionPlanRepository,
    subscriptionChangeCalculationService,
  );

export const cancelSubscriptionUseCase = new CancelSubscriptionUseCase(
  mongooseDoctorRepository,
  mongooseDoctorSubscriptionRepository,
  mongooseSubscriptionPlanRepository,
  mongooseWalletRepository,
  mongooseWalletTransactionRepository,
);

export const getDoctorDashboardOverviewUseCase =
  new GetDoctorDashboardOverviewUseCase(
    mongooseDoctorRepository,
    mongooseSlotRepository,
    mongooseClinicRepository,
    mongooseDoctorClinicRepository,
  );

export const getDoctorCalendarUseCase = new GetDoctorCalendarUseCase(
  mongooseSlotRepository,
  mongooseDoctorRepository,
  mongooseClinicRepository,
  mongooseDoctorClinicRepository,
  initializeCalendarDateRangeUseCase,
);

export const updateDoctorPanDetailsUseCase = new UpdateDoctorPanDetailsUseCase(
  mongooseDoctorRepository,
  mongooseKycRepository,
  kycEncryptionService,
);

export const updateDoctorBankDetailsUseCase =
  new UpdateDoctorBankDetailsUseCase(
    mongooseDoctorRepository,
    mongooseKycRepository,
    kycEncryptionService,
  );

export const updateDoctorAadhaarDetailsUseCase =
  new UpdateDoctorAadhaarDetailsUseCase(
    mongooseDoctorRepository,
    mongooseKycRepository,
    kycEncryptionService,
  );

export const getDoctorAadhaarDetailsUseCase =
  new GetDoctorAadhaarDetailsUseCase(
    mongooseDoctorRepository,
    mongooseKycRepository,
    kycEncryptionService,
  );

export const getDoctorKycDetailsUseCase = new GetDoctorKycDetailsUseCase(
  mongooseDoctorRepository,
  mongooseKycRepository,
  kycEncryptionService,
);

export const getDoctorPanDetailsUseCase = new GetDoctorPanDetailsUseCase(
  mongooseDoctorRepository,
  mongooseKycRepository,
  kycEncryptionService,
);

export const getDoctorBankDetailsUseCase = new GetDoctorBankDetailsUseCase(
  mongooseDoctorRepository,
  mongooseKycRepository,
  kycEncryptionService,
);

export const updateDoctorPersonalUseCase = new UpdateDoctorPersonalUseCase(
  mongooseUserRepository,
  mongooseDoctorRepository,
  mongooseDoctorSettingsRepository
);

export const updateDoctorSettingsUseCase = new UpdateDoctorSettingsUseCase(
  mongooseDoctorRepository,
  mongooseDoctorSettingsRepository
);

export const getDoctorSettingsUseCase = new GetDoctorSettingsUseCase(
  mongooseUserRepository,
  mongooseDoctorRepository,
  mongooseDoctorSettingsRepository
);

export const updateScheduleUseCase = new UpdateScheduleUseCase(
  mongooseDoctorClinicRepository,
  mongooseDoctorRepository,
  mongooseClinicRepository
);

// Controllers
export const doctorController = new DoctorController(
  doctorProfileUseCase,
  updateDoctorAddressUseCase,
  updateDoctorConsultationDetailsUseCase,
  updateDoctorProfessionalDetailsUseCase,
  updateDoctorProfilePictureUseCase,
  updateDoctorPersonalUseCase
);

export const doctorReapplicationController = new ReapplicationController(
  getReapplicationDetailsUseCase,
  updateReapplicationDetailsUseCase,
);

export const doctorSubscriptionController = new SubscriptionController(
  getSubscriptionOverviewUseCase,
  buySubscriptionWithWalletUseCase,
  cancelSubscriptionUseCase,
  getSubscriptionUpgradeOptionsUseCase,
  createSubscriptionRazorpayOrderUseCase,
  verifySubscriptionRazorpayPaymentUseCase,
);

export const doctorDashboardController = new DashboardController(
  getDoctorDashboardOverviewUseCase,
  getDoctorCalendarUseCase,
);

export const doctorKycController = new DoctorKycController(
  updateDoctorPanDetailsUseCase,
  updateDoctorBankDetailsUseCase,
  updateDoctorAadhaarDetailsUseCase,
  getDoctorPanDetailsUseCase,
  getDoctorBankDetailsUseCase,
  getDoctorAadhaarDetailsUseCase,
  getDoctorKycDetailsUseCase,
);

export const doctorSettingsController = new DoctorSettingsController(
  getDoctorSettingsUseCase,
  updateDoctorSettingsUseCase,
);

export const doctorScheduleController = new DoctorScheduleController(
  updateScheduleUseCase,
);

