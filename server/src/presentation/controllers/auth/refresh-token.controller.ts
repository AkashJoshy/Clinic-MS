import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IRefreshUseCase } from "../../../application/repositories/auth/i-refresh.usecase.ts";

export class RefreshTokenController {
  constructor(private _refreshToken: IRefreshUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const result = await this._refreshToken.execute(refreshToken);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
