import { GetPatientWalletUseCase } from "../../application/use-cases/patient/wallet-management/get-wallet.usecase.ts";
import { CreateWalletTopupOrderUseCase } from "../../application/use-cases/shared/create-wallet-topup-order.usecase.ts";
import { ExpirePendingWalletTransactionsUseCase } from "../../application/use-cases/shared/expire-pending-wallet-transactions.usecase.ts";
import { GetAllDepartmentsUseCase } from "../../application/use-cases/shared/get-all-departments.usecase.ts";
import { VerifyWalletTopupOrderUseCase } from "../../application/use-cases/shared/verify-wallet-topup-order.usecase.ts";
import { DepartmentController } from "../../presentation/controllers/shared/department.controller.ts";
import { WalletController } from "../../presentation/controllers/shared/wallet.controller.ts";
import { getDoctorWalletBalanceUseCase, getDoctorWalletUseCase, getPatientWalletUseCase, mongooseDepartmentRepository, mongoosePatientRepository, mongooseUserRepository, mongooseWalletRepository, mongooseWalletTransactionRepository, razorpayService, walletTransactionsDetailsService } from "../index.ts";

// Use-cases
const getAllDepartmentsUseCase = new GetAllDepartmentsUseCase(
  mongooseDepartmentRepository,
);

const createWalletTopupOrderUseCase = new CreateWalletTopupOrderUseCase(
  mongooseUserRepository,
  mongooseWalletRepository,
  mongooseWalletTransactionRepository,
  razorpayService,
)

const verifyWalletTopupOrderUseCase = new VerifyWalletTopupOrderUseCase(
  mongooseUserRepository,
  mongooseWalletRepository,
  mongooseWalletTransactionRepository,
  razorpayService,
)

export const expirePendingWalletTransactionsUseCase = new ExpirePendingWalletTransactionsUseCase(
  mongooseWalletTransactionRepository
)


// Controllers
export const departmentController = new DepartmentController(
  getAllDepartmentsUseCase,
);

export const patientWalletController = new WalletController(
  getPatientWalletUseCase,
  getDoctorWalletBalanceUseCase,
  createWalletTopupOrderUseCase,
  verifyWalletTopupOrderUseCase,
)

export const doctorWalletController = new WalletController(
  getDoctorWalletUseCase,
  getDoctorWalletBalanceUseCase,
  createWalletTopupOrderUseCase,
  verifyWalletTopupOrderUseCase,
)



