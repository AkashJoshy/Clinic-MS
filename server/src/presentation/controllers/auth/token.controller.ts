import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import type { IRefreshUseCase } from "../../../application/interfaces/repositories/auth/i-refresh.usecase.ts";

export class TokenController {
  constructor(private _refreshToken: IRefreshUseCase) {}

  async refreshToken(req: Request, res: Response, next: NextFunction) {
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
