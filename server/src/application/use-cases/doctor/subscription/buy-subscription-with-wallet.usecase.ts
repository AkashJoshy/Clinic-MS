import { doctorReapplicationController } from "../../../../container/index.ts";
import { DoctorSubscription } from "../../../../domain/entities/doctor-subscription.entity.ts";
import {
  walletPaymentMethod,
  walletStatus,
  walletTransactionSource,
  walletType,
} from "../../../../domain/enums/user.enums.ts";
import { InsufficientBalanceError } from "../../../../domain/errors/insufficient-balance.error.ts";
import { LockedError } from "../../../../domain/errors/locked.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ResourceError } from "../../../../domain/errors/resource.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../../domain/repositories/i-wallet-transaction-repository.ts";
import type { WalletTransactionType } from "../../../../domain/types/wallet-transaction.types.ts";
import { role } from "../../../../presentation/schemas/base.schema.ts";
import type {
  BuySubscriptionWithWalletDto,
  BuySubscriptionWithWalletResponseDto,
} from "../../../dto/doctor-subscription.dto.ts";
import type { IBuySubscriptionWithWalletUseCase } from "../../../interfaces/repositories/doctor/subscription/i-buy-subscription-with-wallet.usecase.ts";
import type { ISubscriptionChangeCalculationService } from "../../../interfaces/services/subscription/i-subscription-change-calculation.service.ts";
import { WalletMapper } from "../../../mappers/wallet/wallet.mapper.ts";

export class BuySubscriptionWithWallet implements IBuySubscriptionWithWalletUseCase {
  private readonly DAYS_PER_MONTH = 30;
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _subscriptionPlansRepository: ISubscriptionPlanRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
    private readonly _subscriptionChangeCalculationService: ISubscriptionChangeCalculationService,
  ) {}

  async execute(
    data: BuySubscriptionWithWalletDto,
  ): Promise<BuySubscriptionWithWalletResponseDto> {
    const admin = await this._userRepository.findOneBy({ role: "ADMIN" });

    if (!admin || !admin.id) {
      throw new ResourceError(
        "Unable to process the subscription purchase at the moment. Please try again later.",
      );
    }

    const doctor = await this._doctorRepository.findById(data.doctorId!);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const subscriptionPlan = await this._subscriptionPlansRepository.findById(
      data.planId!,
    );

    if (!subscriptionPlan || !subscriptionPlan.id) {
      throw new NotFoundError("Subscription Plan");
    }

    const wallet = await this._walletRepository.findByOwner(
      doctor.userId,
      "DOCTOR",
    );

    const adminWallet = await this._walletRepository.findByOwner(
      admin.id,
      "ADMIN",
    );

    if (!wallet || !wallet.id) {
      throw new NotFoundError("Wallet");
    }

    if (!adminWallet || !adminWallet.id) {
      throw new ResourceError(
        "Unable to process the subscription purchase at the moment. Please try again later.",
      );
    }

    if (wallet.status === "CLOSED") {
      throw new LockedError("This wallet is permanently closed.");
    }

    if (wallet.status === "LOCKED") {
      throw new LockedError(
        "This wallet is temporarily locked. Please contact support for assistance.",
      );
    }

    const startDate = new Date();
    const endDate = new Date(startDate);

    switch (subscriptionPlan.billingCycle) {
      case "MONTHLY":
        endDate.setMonth(endDate.getDate() + this.DAYS_PER_MONTH);
        break;

      case "QUARTERLY":
        endDate.setMonth(endDate.getDate() + this.DAYS_PER_MONTH * 3);
        break;

      case "YEARLY":
        endDate.setFullYear(endDate.getDate() + this.DAYS_PER_MONTH * 12);
        break;

      case "LIFETIME":
        break;
    }

    const currentPeriodEnd =
      subscriptionPlan.billingCycle === "LIFETIME" ? null : endDate;

    const currentPlan =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctor.id);

    let adjustmentAmount: number = subscriptionPlan.price;
    let doctorWalletType: WalletTransactionType | null = null;
    let adminWalletType: WalletTransactionType | null = null;

    if (currentPlan) {
      const calculation = this._subscriptionChangeCalculationService.execute({
        currentPrice: currentPlan?.price ?? 0,
        targetPrice: subscriptionPlan.price,
        billingCycle:
          currentPlan?.billingCycle ?? subscriptionPlan.billingCycle,
        currentPeriodStart: currentPlan?.currentPeriodStart ?? null,
      });

      if (currentPlan.price < subscriptionPlan.price) {
        if (wallet.balance < calculation.payableAmount) {
          throw new InsufficientBalanceError();
        }
        adjustmentAmount = calculation.payableAmount;

        wallet.debit(adjustmentAmount);
        doctorWalletType = "DEBIT";
        adminWallet.credit(adjustmentAmount);
        adminWalletType = "CREDIT";
      } else if (currentPlan.price > subscriptionPlan.price) {
        adjustmentAmount = calculation.unusedSubscriptionCredit;

        if (adminWallet.balance < adjustmentAmount) {
          throw new ResourceError(
            "Unable to process the subscription purchase at the moment. Please try again later.",
          );
        }

        wallet.credit(adjustmentAmount);
        doctorWalletType = "CREDIT";
        adminWallet.debit(adjustmentAmount);
        adminWalletType = "DEBIT";
      } else {
        adjustmentAmount = 0;
      }
    } else {
      if (wallet.balance < subscriptionPlan.price) {
        throw new InsufficientBalanceError();
      }

      wallet.debit(adjustmentAmount);
      doctorWalletType = "DEBIT";
      adminWallet.credit(adjustmentAmount);
      adminWalletType = "CREDIT";
    }

    if (adjustmentAmount >= 0 && doctorWalletType && adminWalletType) {
      const doctorWalletTransaction = WalletMapper.updateTransactionStatus(
        doctorWalletType === "CREDIT"
          ? WalletMapper.toCreditTransactionEntity({
              orderId: null,
              amount: adjustmentAmount,
              currency: "INR",
              ownerId: doctor.userId,
              role: "DOCTOR",
              walletId: wallet.id,
              paymentMethod: walletPaymentMethod.WALLET,
              source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
              description: "Subscription plan adjustment",
            })
          : WalletMapper.toDebitTransactionEntity({
              orderId: null,
              amount: adjustmentAmount,
              currency: "INR",
              ownerId: doctor.userId,
              role: "DOCTOR",
              walletId: wallet.id,
              paymentMethod: walletPaymentMethod.WALLET,
              source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
              description: "Subscription plan adjustment",
            }),
        walletStatus.COMPLETED,
      );

      const adminWalletTransaction = WalletMapper.updateTransactionStatus(
        adminWalletType === "CREDIT"
          ? WalletMapper.toCreditTransactionEntity({
              orderId: null,
              amount: adjustmentAmount,
              currency: "INR",
              ownerId: admin.id,
              role: "ADMIN",
              walletId: adminWallet.id,
              paymentMethod: walletPaymentMethod.WALLET,
              source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
              description: "Doctor subscription payment received",
            })
          : WalletMapper.toDebitTransactionEntity({
              orderId: null,
              amount: adjustmentAmount,
              currency: "INR",
              ownerId: admin.id,
              role: "ADMIN",
              walletId: adminWallet.id,
              paymentMethod: walletPaymentMethod.WALLET,
              source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
              description: "Doctor subscription refund",
            }),
        walletStatus.COMPLETED,
      );

      await Promise.all([
        this._walletRepository.findByIdAndUpdate(wallet.id, {
          balance: wallet.balance,
        }),
        this._walletRepository.findByIdAndUpdate(adminWallet.id, {
          balance: adminWallet.balance,
        }),
        this._walletTransactionRepository.save(doctorWalletTransaction),
        this._walletTransactionRepository.save(adminWalletTransaction),
      ]);
    }

    if (currentPlan) {
      currentPlan.replace();
      await this._doctorSubscriptionRepository.findByIdAndUpdate(
        currentPlan.id!,
        {
          status: currentPlan.status,
          autoRenew: currentPlan.autoRenew,
        },
      );
    }

    const newDoctorSubscription = await this._doctorSubscriptionRepository.save(
      DoctorSubscription.createActive({
        doctorId: doctor.id,
        planId: subscriptionPlan.id,
        billingCycle: subscriptionPlan.billingCycle,
        price: subscriptionPlan.price,
        currency: subscriptionPlan.currency ?? "INR",
        features: subscriptionPlan.features,
        startedAt: startDate!,
        currentPeriodStart: startDate!,
        currentPeriodEnd,
        autoRenew: false,
        paymentMethod: data.paymentMethod,
        cancelledAt: null,
      }),
    );

    return {
      currentPlan: newDoctorSubscription,
      planName: subscriptionPlan.name,
    };
  }
}
