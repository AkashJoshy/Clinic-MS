import type { NextFunction, Request, Response } from "express";
import type { IGetAllColorPaletteUseCase } from "../../../application/interfaces/repositories/admin/color-palette/i-get-all-color-palette.usecase.ts";
import type { IGetColorPaletteUseCase } from "../../../application/interfaces/repositories/admin/color-palette/i-get-color-palette.usecase.ts";
import type { IEditColorPaletteUseCase } from "../../../application/interfaces/repositories/admin/color-palette/i-edit-color-palette.usecase.ts";
import type { ICreateColorPaletteUseCase } from "../../../application/interfaces/repositories/admin/color-palette/i-create-color-palette.usecase.ts";
import type User from "../../../domain/entities/user.entity.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IToggleColorPaletteStatusUseCase } from "../../../application/interfaces/repositories/admin/color-palette/i-toggle-color-palette-status.usecase.ts";

export class ColorPaletteController {
  constructor(
    private readonly _createColorPaletteUseCase: ICreateColorPaletteUseCase,
    private readonly _getAllColorPaletteUseCase: IGetAllColorPaletteUseCase,
    private readonly _getOneColorPaletteUseCase: IGetColorPaletteUseCase,
    private readonly _editColorPaletteUseCase: IEditColorPaletteUseCase,
    private readonly _toggleColorPaletteStatusUseCase: IToggleColorPaletteStatusUseCase,
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const palettes = await this._getAllColorPaletteUseCase.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Color Palettes"),
        data: palettes,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      let paletteId = req.params.id;

      paletteId = Array.isArray(paletteId) ? paletteId[0] : paletteId;

      const palette = await this._getOneColorPaletteUseCase.execute(paletteId!);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Color Palette"),
        data: palette,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const palette = await this._createColorPaletteUseCase.execute(data);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.CREATED.replace("Resource", "Color Palette"),
        data: palette,
      });
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {

      let paletteId = req.params.paletteId;
      paletteId = Array.isArray(paletteId) ? paletteId[0] : paletteId;

      const data = {
        id: paletteId!,
        data: req.body,
      };

      const palette = await this._editColorPaletteUseCase.execute(data);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Color Palette"),
        data: palette,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try {
      let paletteId = req.params.paletteId;
      paletteId = Array.isArray(paletteId) ? paletteId[0] : paletteId;

      console.log(`Id: `, paletteId)

      const palette = await this._toggleColorPaletteStatusUseCase.execute(
        paletteId!,
      );

      console.log(`Palette: `)
      console.log(palette)

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Color Palette status",
        ),
        data: palette,
      });
    } catch (error) {
      next(error);
    }
  }
}
