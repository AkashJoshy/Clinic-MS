import type { Request, Response, NextFunction } from "express";
import type { IGetWalletUseCase } from "../../../application/interfaces/repositories/shared/i-get-wallet.usecase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { ICreateWalletTopupOrderUseCase } from "../../../application/interfaces/repositories/shared/i-create-wallet-topup-order.usecase.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { SafeUser } from "../../../application/dto/auth.dto.ts";
import type { IVerifyWalletTopupOrderUseCase } from "../../../application/interfaces/repositories/shared/i-verify-wallet-topup-order.usecase.ts";
import type { IGetWalletBalanceUseCase } from "../../../application/interfaces/repositories/shared/i-get-wallet-balance.usecase.ts";

export class WalletController {
  constructor(
    private readonly _getWalletUseCase: IGetWalletUseCase,
    private readonly _getWalletBalanceUseCase: IGetWalletBalanceUseCase,
    private readonly _createWalletTopupOrderUseCase: ICreateWalletTopupOrderUseCase,
    private readonly _verifyWalletTopupOrderUseCase: IVerifyWalletTopupOrderUseCase,
  ) {}

  async getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      let ownerId = req.params.ownerId;
      if (typeof ownerId !== "string" || !ownerId.trim()) {
        res.status(400).json({
          success: false,
          message: "Invalid owner ID",
        });
        return;
      }
      const result = await this._getWalletUseCase.execute(ownerId);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Wallet"),
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createTopupOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { amount } = req.body;

      const result = await this._createWalletTopupOrderUseCase.execute({
        ownerId: (req.user as User)?.id!,
        amount,
      });

      res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: "Wallet top-up order created successfully",
        silent: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyTopupOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user as SafeUser;

      const { orderDetails, status } = req.body;

      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        orderDetails;

      const result = await this._verifyWalletTopupOrderUseCase.execute({
        ownerId: user.id!,
        status,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
      });

      res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Top Up"),
        silent: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getWalletBalance(req: Request, res: Response, next: NextFunction) {
    try {
      let ownerId = req.params.ownerId;
      if (typeof ownerId !== "string" || !ownerId.trim()) {
        res.status(400).json({
          success: false,
          message: "Invalid owner ID",
        });
        return;
      }
      const result = await this._getWalletBalanceUseCase.execute(ownerId);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Wallet Balance"),
        data: result,
        silent: true
      });
    } catch (error) {
      next(error);
    }
  }
  
}
