import { ForbiddenError } from "../../../domain/errors/forbidden.error.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import { ValidationError } from "../../../domain/errors/validation.error.ts";
import type { IUserRepository } from "../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../domain/repositories/i-wallet-transaction-repository.ts";
import type { IPaymentGatewayService } from "../../../domain/services/i-payment-gateway.service.ts";
import type {
  VerifyTopupDto,
  VerifyTopupResponseDto,
} from "../../dto/wallet.dto.ts";
import type { IVerifyWalletTopupOrderUseCase } from "../../interfaces/repositories/shared/i-verify-wallet-topup-order.usecase.ts";
import { WalletMapper } from "../../mappers/wallet/wallet.mapper.ts";

export class VerifyWalletTopupOrderUseCase implements IVerifyWalletTopupOrderUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _walletRepository: IWalletRepository,
    private _walletTransactionRepository: IWalletTransactionRepository,
    private _paymentGatewayService: IPaymentGatewayService,
  ) {}

  async execute(data: VerifyTopupDto): Promise<VerifyTopupResponseDto> {
    const { ownerId, status, ...rest } = data;
    const user = await this._userRepository.findById(data.ownerId);

    if (!user) {
      throw new NotFoundError("User");
    }

    const walletTransaction =
      await this._walletTransactionRepository.findByReferenceId(
        data.razorpay_order_id,
      );

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

    if (!walletTransaction || !walletTransaction.id) {
      throw new NotFoundError("Wallet transaction");
    }

    if (walletTransaction.ownerId !== data.ownerId) {
      throw new NotFoundError("Wallet transaction");
    }

    if (walletTransaction.isPaid()) {
      throw new NotFoundError("This wallet top-up has already been completed");
    }

    const verifiedPaymentDetails =
      await this._paymentGatewayService.verifyPayment(rest);

    if (!verifiedPaymentDetails.verified) {
      throw new ValidationError(
        "Payment verification failed. The payment signature is invalid",
      );
    }

    if (status === "SUCCESS") {
      wallet.credit(walletTransaction.amount);
      walletTransaction.complete();
    } else if (status === "FAILED") {
      walletTransaction.fail();
    }

    const [walletDetails, transactionDetails] = await Promise.all([
      this._walletRepository.findByIdAndUpdate(wallet.id, {
        balance: wallet.balance,
      }),
      this._walletTransactionRepository.findByIdAndUpdate(
        walletTransaction.id,
        {
          status: walletTransaction.status,
          description: walletTransaction.description,
        },
      ),
    ]).catch((error: any) => {
      throw new error(error);
    });

    if (!transactionDetails) {
      throw new NotFoundError("Wallet Transaction");
    }
    if (!walletDetails) {
      throw new NotFoundError("Wallet");
    }

    if (status === "SUCCESS") {
      return WalletMapper.success(
        verifiedPaymentDetails.razorpayOrderId,
        wallet.balance,
        transactionDetails,
      );
    } else {
      return WalletMapper.failed(
        verifiedPaymentDetails.razorpayOrderId,
        wallet.balance,
        transactionDetails,
      );
    }
  }
}
