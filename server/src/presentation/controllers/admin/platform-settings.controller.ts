import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetPlatformSettingsUseCase } from "../../../application/interfaces/repositories/admin/platform-settings/i-get-platform-settings.use-case.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { IUpdatePlatformSettingsUseCase } from "../../../application/interfaces/repositories/admin/platform-settings/i-update-platform-settings.use-case.ts";

export class PlatformSettingsController {
  constructor(
    private readonly _getPlatformSettingsUseCase: IGetPlatformSettingsUseCase,
    private readonly _updatePlatformSettingsUseCase: IUpdatePlatformSettingsUseCase,
  ) {}

  async getPlatformSettings(req: Request, res: Response, next: NextFunction) {
    try {
      if ((req.user as User)?.role !== "ADMIN") {
        return res.status(ResponseStatusCode.OK).json({
          success: true,
          message: RESPONSE_MESSAGE.ACCOUNT_DENIED,
          silent: true,
        });
      }

      const platformSettings = await this._getPlatformSettingsUseCase.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace(
          "Resource",
          "Platform Settings",
        ),
        data: platformSettings,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePlatformSettings(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if ((req.user as User)?.role !== "ADMIN") {
        return res.status(ResponseStatusCode.OK).json({
          success: true,
          message: RESPONSE_MESSAGE.ACCOUNT_DENIED,
          silent: true,
        });
      }

      const platformSettings =
        await this._updatePlatformSettingsUseCase.execute(req.body);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Platform Settings",
        ),
        data: platformSettings,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
