import { WalletTransaction } from "../../../domain/entities/wallet-transaction.entity.ts";
import {
  walletPaymentMethod,
  walletStatus,
  walletTransactionSource,
} from "../../../domain/enums/user.enums.ts";
import { DatabaseError } from "../../../domain/errors/database.error.ts";
import { ForbiddenError } from "../../../domain/errors/forbidden.error.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import { ValidationError } from "../../../domain/errors/validation.error.ts";
import type { IUserRepository } from "../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../domain/repositories/i-wallet-transaction-repository.ts";
import type { IPaymentGatewayService } from "../../../domain/services/i-payment-gateway.service.ts";
import type {
  CreateWalletTopupOrderDto,
  TopupOrderResponseDto,
} from "../../dto/wallet.dto.ts";
import type { ICreateWalletTopupOrderUseCase } from "../../interfaces/repositories/shared/i-create-wallet-topup-order.usecase.ts";
import type { ICreateWalletTransactionService } from "../../interfaces/services/wallet/i-create-wallet-transaction.service.ts";

export class CreateWalletTopupOrderUseCase implements ICreateWalletTopupOrderUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _walletRepository: IWalletRepository,
    private _walletTransactionRepository: IWalletTransactionRepository,
    private _paymentGatewayService: IPaymentGatewayService,
    private _createWalletTransactionService: ICreateWalletTransactionService,
  ) {}

  async execute(
    data: CreateWalletTopupOrderDto,
  ): Promise<TopupOrderResponseDto> {
    const user = await this._userRepository.findById(data.ownerId);

    if (!user) {
      throw new NotFoundError("User");
    }

    if (data.amount <= 0) {
      throw new ValidationError(`Amount should be greater than 0`);
    }

    let wallet = await this._walletRepository.findByOwner(
      data.ownerId,
      user.role,
    );

    if (!wallet || !wallet.id) {
      throw new NotFoundError("Wallet");
    }

    if (wallet.isLocked() === "LOCKED") {
      throw new ForbiddenError("Wallet is currently locked");
    }

    if (wallet.isLocked() === "CLOSED") {
      throw new ForbiddenError("Wallet is currently closed");
    }

    const updatedAmount = data.amount * 100;
    const receipt = `${new Date().getTime()}_id_${data.ownerId}`;
    const purpose = "WALLET_TOP_UP";

    const { amount, currency, orderId, status } =
      await this._paymentGatewayService.createOrder({
        ownerId: data.ownerId,
        amount: updatedAmount,
        receipt,
        purpose,
      });

    const walletTransaction =
      await this._createWalletTransactionService.execute({
        transactionType: data.transactionType,
        orderId,
        ownerId: data.ownerId,
        walletId: wallet.id!,
        role: user.role,
        amount: data.amount,
        currency,
        paymentMethod: walletPaymentMethod.RAZORPAY,
        source: walletTransactionSource.WALLET_TOPUP,
        status: walletStatus.PENDING,
        description:
          "Wallet top-up initiated via Razorpay. Awaiting payment confirmation.",
      });

    if (!walletTransaction) {
      throw new DatabaseError("Failed to create wallet transaction.");
    }

    await this._walletTransactionRepository.save(walletTransaction);

    return {
      amount,
      currency,
      orderId,
      status,
    };
  }
}
