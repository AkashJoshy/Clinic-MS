import type { Request, Response, NextFunction } from "express";
import type { IGetPlatformDataUseCase } from "../../../application/interfaces/repositories/shared/i-get-platform-data.usecase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";

export class PlatformDataController {
  constructor(
    private readonly _getPlatformDataUseCase: IGetPlatformDataUseCase,
  ) {}

  getPlatformData = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this._getPlatformDataUseCase.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Platform Data"),
        data,
        silent: true
      });
    } catch (error) {
      next(error);
    }
  };
}
