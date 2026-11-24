import { DoctorSubscription } from "../../../../domain/entities/doctor-subscription.entity.ts";
import {
  walletPaymentMethod,
  walletStatus,
  walletTransactionSource,
} from "../../../../domain/enums/user.enums.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { InsufficientBalanceError } from "../../../../domain/errors/insufficient-balance.error.ts";
import { LockedError } from "../../../../domain/errors/locked.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ResourceError } from "../../../../domain/errors/resource.error.ts";

import type { IDoctorSubscriptionHistoryRepository } from "../../../../domain/repositories/i-doctor-subscription-history.repository.ts";
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../../domain/repositories/i-wallet-transaction-repository.ts";

import type { WalletTransactionType } from "../../../../domain/types/wallet-transaction.types.ts";

import type {
  BuySubscriptionWithWalletDto,
  BuySubscriptionWithWalletResponseDto,
} from "../../../dto/doctor-subscription.dto.ts";

import type { IBuySubscriptionWithWalletUseCase } from "../../../interfaces/repositories/doctor/subscription/i-buy-subscription-with-wallet.usecase.ts";
import type { ISubscriptionChangeCalculationService } from "../../../interfaces/services/subscription/i-subscription-change-calculation.service.ts";
import type { ICreateWalletTransactionService } from "../../../interfaces/services/wallet/i-create-wallet-transaction.service.ts";

import { DoctorSubscriptionHistoryMapper } from "../../../mappers/doctor/subscription-history.mapper.ts";
import { DoctorSubscriptionMapper } from "../../../mappers/doctor/subscription.mapper.ts";

export class BuySubscriptionWithWallet implements IBuySubscriptionWithWalletUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _subscriptionPlansRepository: ISubscriptionPlanRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
    private readonly _doctorSubscriptionHistoryRepository: IDoctorSubscriptionHistoryRepository,
    private readonly _subscriptionChangeCalculationService: ISubscriptionChangeCalculationService,
    private readonly _createWalletTransactionService: ICreateWalletTransactionService,
  ) {}

  private toPaise(amountInRupees: number): number {
    if (!Number.isFinite(amountInRupees) || amountInRupees < 0) {
      throw new ResourceError("Invalid subscription adjustment amount.");
    }

    const amountInPaise = Math.round(amountInRupees * 100);

    if (!Number.isSafeInteger(amountInPaise)) {
      throw new ResourceError("Subscription adjustment amount is too large.");
    }

    return amountInPaise;
  }

  private addCalendarMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);

    const lastDayOfMonth = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0,
    ).getDate();

    result.setDate(Math.min(originalDay, lastDayOfMonth));

    return result;
  }

  async execute(
    data: BuySubscriptionWithWalletDto,
  ): Promise<BuySubscriptionWithWalletResponseDto> {
    const admin = await this._userRepository.findOneBy({ role: "ADMIN" });

    if (!admin?.id) {
      throw new ResourceError(
        "Unable to process the subscription purchase at the moment. Please try again later.",
      );
    }

    const doctor = await this._doctorRepository.findById(data.doctorId!);

    if (!doctor?.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const user = await this._userRepository.findById(doctor.userId);

    if (!user?.id) {
      throw new NotFoundError("Doctor");
    }

    const subscriptionPlan = await this._subscriptionPlansRepository.findById(
      data.planId!,
    );

    if (!subscriptionPlan?.id) {
      throw new NotFoundError("Subscription Plan");
    }

    const doctorWallet = await this._walletRepository.findByOwner(
      doctor.userId,
      "DOCTOR",
    );

    if (!doctorWallet?.id) {
      throw new NotFoundError("Doctor wallet");
    }

    const adminWallet = await this._walletRepository.findByOwner(
      admin.id,
      "ADMIN",
    );

    if (!adminWallet?.id) {
      throw new ResourceError(
        "Unable to process the subscription purchase at the moment. Please try again later.",
      );
    }

    // Wallet status validation
    if (doctorWallet.status === "CLOSED") {
      throw new LockedError("Your wallet is permanently closed.");
    }

    if (doctorWallet.status === "LOCKED") {
      throw new LockedError(
        "Your wallet is temporarily locked. Please contact support for assistance.",
      );
    }

    if (adminWallet.status === "CLOSED") {
      throw new LockedError(
        "The platform wallet is permanently closed. Please try again later.",
      );
    }

    if (adminWallet.status === "LOCKED") {
      throw new LockedError(
        "The platform wallet is temporarily unavailable. Please try again later.",
      );
    }

    // Subscription period calculation
    const startDate = new Date();

    let currentPeriodEnd: Date | null = null;

    switch (subscriptionPlan.billingCycle) {
      case "MONTHLY":
        currentPeriodEnd = this.addCalendarMonths(startDate, 1);
        break;

      case "QUARTERLY":
        currentPeriodEnd = this.addCalendarMonths(startDate, 3);
        break;

      case "YEARLY":
        currentPeriodEnd = this.addCalendarMonths(startDate, 12);
        break;

      case "LIFETIME":
        currentPeriodEnd = null;
        break;
    }

    const currentPlan =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctor.id);

    let adjustmentAmountInPaise = this.toPaise(subscriptionPlan.price);

    let doctorWalletType: WalletTransactionType | null = null;
    let adminWalletType: WalletTransactionType | null = null;

    if (currentPlan) {
      const calculation = this._subscriptionChangeCalculationService.execute({
        currentPrice: currentPlan.price,
        targetPrice: subscriptionPlan.price,
        billingCycle: currentPlan.billingCycle,
        currentPeriodStart: currentPlan.currentPeriodStart ?? null,
      });

      if (currentPlan.price < subscriptionPlan.price) {
        adjustmentAmountInPaise = this.toPaise(calculation.payableAmount);

        if (doctorWallet.balance < adjustmentAmountInPaise) {
          throw new InsufficientBalanceError();
        }

        doctorWallet.debit(adjustmentAmountInPaise);
        adminWallet.credit(adjustmentAmountInPaise);

        doctorWalletType = "DEBIT";
        adminWalletType = "CREDIT";
      } else if (currentPlan.price > subscriptionPlan.price) {
        adjustmentAmountInPaise = this.toPaise(
          calculation.unusedSubscriptionCredit,
        );

        if (adminWallet.balance < adjustmentAmountInPaise) {
          throw new ResourceError(
            "Unable to process the subscription purchase at the moment. Please try again later.",
          );
        }

        doctorWallet.credit(adjustmentAmountInPaise);
        adminWallet.debit(adjustmentAmountInPaise);

        doctorWalletType = "CREDIT";
        adminWalletType = "DEBIT";
      } else {
        adjustmentAmountInPaise = 0;
      }
    } else {
      if (doctorWallet.balance < adjustmentAmountInPaise) {
        throw new InsufficientBalanceError();
      }

      doctorWallet.debit(adjustmentAmountInPaise);
      adminWallet.credit(adjustmentAmountInPaise);

      doctorWalletType = "DEBIT";
      adminWalletType = "CREDIT";
    }

    if (adjustmentAmountInPaise > 0 && doctorWalletType && adminWalletType) {
      const doctorWalletTransaction =
        await this._createWalletTransactionService.execute({
          transactionType: doctorWalletType,
          orderId: null,
          ownerId: user.id,
          walletId: doctorWallet.id,
          role: user.role,
          amount: adjustmentAmountInPaise,
          currency: "INR",
          paymentMethod: walletPaymentMethod.WALLET,
          source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
          status: walletStatus.COMPLETED,
          description:
            doctorWalletType === "CREDIT"
              ? "Wallet credited due to doctor subscription adjustment."
              : "Wallet debited for doctor subscription payment.",
        });

      if (!doctorWalletTransaction) {
        throw new DatabaseError("Failed to create wallet transaction.");
      }

      const adminWalletTransaction =
        await this._createWalletTransactionService.execute({
          transactionType: adminWalletType,
          orderId: null,
          ownerId: admin.id,
          walletId: adminWallet.id,
          role: admin.role,
          amount: adjustmentAmountInPaise,
          currency: "INR",
          paymentMethod: walletPaymentMethod.WALLET,
          source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
          status: walletStatus.COMPLETED,
          description:
            adminWalletType === "CREDIT"
              ? "Payment received for doctor subscription."
              : "Refund issued for doctor subscription downgrade.",
        });

      if (!adminWalletTransaction) {
        throw new DatabaseError("Failed to create wallet transaction.");
      }

      await Promise.all([
        this._walletRepository.findByIdAndUpdate(doctorWallet.id, {
          balance: doctorWallet.balance,
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
      DoctorSubscriptionMapper.toActiveDoctorSubscription({
        doctorId: doctor.id,
        startDate,
        endDate: currentPeriodEnd!,
        paymentMethod: data.paymentMethod,
        subscriptionPlan,
      }),
    );

    await this._doctorSubscriptionHistoryRepository.save(
      DoctorSubscriptionHistoryMapper.toCreatePurchased({
        doctorId: doctor.id,
        subscriptionPlan,
        previousSubscription: currentPlan,
        newSubscription: newDoctorSubscription,
      }),
    );

    return {
      currentPlan: newDoctorSubscription,
      planName: subscriptionPlan.name,
    };
  }
}
