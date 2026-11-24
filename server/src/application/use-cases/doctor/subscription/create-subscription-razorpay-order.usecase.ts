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
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../../domain/repositories/i-wallet-transaction-repository.ts";
import type { IPaymentGatewayService } from "../../../../domain/services/i-payment-gateway.service.ts";
import type {
  CreateSubscriptionRazorpayOrderDto,
  CreateSubscriptionRazorpayOrderResponseDto,
} from "../../../dto/doctor-subscription.dto.ts";
import type { ICreateSubscriptionRazorpayOrderUseCase } from "../../../interfaces/repositories/doctor/subscription/i-create-subscription-razorpay-order.usecase.ts";
import type { ISubscriptionChangeCalculationService } from "../../../interfaces/services/subscription/i-subscription-change-calculation.service.ts";
import type { ICreateWalletTransactionService } from "../../../interfaces/services/wallet/i-create-wallet-transaction.service.ts";

export class CreateSubscriptionRazorpayOrderUseCase
  implements ICreateSubscriptionRazorpayOrderUseCase
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _subscriptionPlansRepository: ISubscriptionPlanRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
    private readonly _paymentGatewayService: IPaymentGatewayService,
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

  async execute(
    data: CreateSubscriptionRazorpayOrderDto,
  ): Promise<CreateSubscriptionRazorpayOrderResponseDto> {
    const admin = await this._userRepository.findOneBy({ role: "ADMIN" });

    if (!admin || !admin.id) {
      throw new ResourceError(
        "Unable to process the subscription purchase at the moment. Please try again later.",
      );
    }

    const doctor = await this._doctorRepository.findById(data.doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const user = await this._userRepository.findById(doctor.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor user");
    }

    const subscriptionPlan = await this._subscriptionPlansRepository.findById(
      data.planId,
    );

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

    if (adminWallet.status === "CLOSED" || adminWallet.status === "LOCKED") {
      throw new LockedError(
        "The platform wallet is temporarily unavailable. Please try again later.",
      );
    }

    const currentPlan =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctor.id);

    let payableAmount: number = subscriptionPlan.price;

    if (currentPlan) {
      if (currentPlan.planId === subscriptionPlan.id) {
        throw new ValidationError("Doctor is already subscribed to this plan");
      }

      const calculation = this._subscriptionChangeCalculationService.execute({
        currentPrice: currentPlan?.price ?? 0,
        targetPrice: subscriptionPlan.price,
        billingCycle:
          currentPlan?.billingCycle ?? subscriptionPlan.billingCycle,
        currentPeriodStart: currentPlan?.currentPeriodStart ?? null,
      });

      if (currentPlan.price < subscriptionPlan.price) {
        payableAmount = calculation.payableAmount;
      } else {
        throw new ValidationError(
          "Plan downgrade or equal plan does not require online payment. Please use wallet balance.",
        );
      }
    }

    if (payableAmount <= 0) {
      throw new ValidationError("Payable amount must be greater than 0");
    }

    const amountInPaise = this.toPaise(payableAmount);
    const receipt = `sub_${Date.now()}_${doctor.id.slice(-6)}`;
    const purpose = "SUBSCRIPTION_PAYMENT";

    const { amount, currency, orderId, status } =
      await this._paymentGatewayService.createOrder({
        ownerId: user.id,
        amount: amountInPaise,
        receipt,
        purpose,
      });

    const adminWalletTransaction =
      await this._createWalletTransactionService.execute({
        transactionType: "CREDIT",
        orderId,
        ownerId: admin.id,
        walletId: adminWallet.id!,
        role: admin.role,
        amount: amountInPaise,
        currency,
        paymentMethod: walletPaymentMethod.RAZORPAY,
        source: walletTransactionSource.SUBSCRIPTION_PAYMENT,
        status: walletStatus.PENDING,
        description: `Subscription payment for ${subscriptionPlan.name} initiated via Razorpay`,
      });

    if (!adminWalletTransaction) {
      throw new DatabaseError("Failed to create wallet transaction.");
    }

    await this._walletTransactionRepository.save(adminWalletTransaction);

    return {
      amount,
      currency,
      orderId,
      status,
    };
  }
}
