import {
  walletPaymentMethod,
  walletStatus,
  walletTransactionSource,
} from "../../../../domain/enums/user.enums.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { LockedError } from "../../../../domain/errors/locked.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ResourceError } from "../../../../domain/errors/resource.error.ts";
import { ValidationError } from "../../../../domain/errors/validation.error.ts";
import type { IDoctorSubscriptionHistoryRepository } from "../../../../domain/repositories/i-doctor-subscription-history.repository.ts";
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../../domain/repositories/i-wallet-transaction-repository.ts";
import type { IPaymentGatewayService } from "../../../../domain/services/i-payment-gateway.service.ts";
import type {
  VerifySubscriptionRazorpayPaymentDto,
  VerifySubscriptionRazorpayPaymentResponseDto,
} from "../../../dto/doctor-subscription.dto.ts";
import type { IVerifySubscriptionRazorpayPaymentUseCase } from "../../../interfaces/repositories/doctor/subscription/i-verify-subscription-razorpay-payment.usecase.ts";
import { DoctorSubscriptionHistoryMapper } from "../../../mappers/doctor/subscription-history.mapper.ts";
import { DoctorSubscriptionMapper } from "../../../mappers/doctor/subscription.mapper.ts";

export class VerifySubscriptionRazorpayPaymentUseCase
  implements IVerifySubscriptionRazorpayPaymentUseCase
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _subscriptionPlansRepository: ISubscriptionPlanRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
    private readonly _doctorSubscriptionHistoryRepository: IDoctorSubscriptionHistoryRepository,
    private readonly _paymentGatewayService: IPaymentGatewayService,
  ) {}

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
    data: VerifySubscriptionRazorpayPaymentDto,
  ): Promise<VerifySubscriptionRazorpayPaymentResponseDto> {
    const { doctorId, planId, status, orderDetails } = data;

    const admin = await this._userRepository.findOneBy({ role: "ADMIN" });

    if (!admin || !admin.id) {
      throw new ResourceError(
        "Unable to process the subscription purchase at the moment. Please try again later.",
      );
    }

    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const subscriptionPlan =
      await this._subscriptionPlansRepository.findById(planId);

    if (!subscriptionPlan || !subscriptionPlan.id) {
      throw new NotFoundError("Subscription Plan");
    }

    const adminWallet = await this._walletRepository.findByOwner(
      admin.id,
      "ADMIN",
    );

    if (!adminWallet || !adminWallet.id) {
      throw new ResourceError(
        "Platform wallet is currently unavailable. Please try again later.",
      );
    }

    const walletTransaction =
      await this._walletTransactionRepository.findByReferenceId(
        orderDetails.razorpay_order_id,
      );

    if (!walletTransaction || !walletTransaction.id) {
      throw new NotFoundError("Subscription wallet transaction");
    }

    if (walletTransaction.isPaid()) {
      throw new ValidationError(
        "This subscription payment has already been completed",
      );
    }

    if (status === "FAILED") {
      walletTransaction.fail();
      await this._walletTransactionRepository.findByIdAndUpdate(
        walletTransaction.id,
        {
          status: walletTransaction.status,
          description: "Subscription payment failed via Razorpay",
        },
      );
      throw new ValidationError("Subscription payment failed");
    }

    const verifiedPaymentDetails =
      await this._paymentGatewayService.verifyPayment(orderDetails);

    if (!verifiedPaymentDetails.verified) {
      throw new ValidationError(
        "Payment verification failed. The payment signature is invalid",
      );
    }

    adminWallet.credit(walletTransaction.amount);
    walletTransaction.complete();

    await Promise.all([
      this._walletRepository.findByIdAndUpdate(adminWallet.id, {
        balance: adminWallet.balance,
      }),
      this._walletTransactionRepository.findByIdAndUpdate(
        walletTransaction.id,
        {
          status: walletTransaction.status,
          description: `Subscription payment received for ${subscriptionPlan.name} via Razorpay`,
        },
      ),
    ]);

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

    const newDoctorSubscription =
      await this._doctorSubscriptionRepository.save(
        DoctorSubscriptionMapper.toActiveDoctorSubscription({
          doctorId: doctor.id,
          startDate,
          endDate: currentPeriodEnd,
          paymentMethod: "RAZORPAY",
          subscriptionPlan,
        }),
      );

    await this._doctorSubscriptionHistoryRepository.save(
      DoctorSubscriptionHistoryMapper.toCreatePurchased({
        doctorId: doctor.id,
        subscriptionPlan,
        previousSubscription: currentPlan,
        newSubscription: newDoctorSubscription,
        transactionId: orderDetails.razorpay_payment_id,
      }),
    );

    return {
      currentPlan: newDoctorSubscription,
      planName: subscriptionPlan.name,
    };
  }
}
