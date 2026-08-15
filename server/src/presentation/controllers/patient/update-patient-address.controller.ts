import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { UpdateAddressDto } from "../../../application/dto/shared.dto.ts";
import type { IUpdateAddressUseCase } from "../../../application/repositories/patient/IUpdateAddress.UseCase.ts";

export class UpdatePatientAddressController {
  constructor(private _updatePatient: IUpdateAddressUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.params.ownerId;
      const ownerId = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      if (!ownerId) {
        return res.status(ResponseStatusCode.BAD_REQUEST).json({
          success: false,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      const {
        addressLine,
        country,
        state,
        city,
        pincode,
      }: Omit<UpdateAddressDto, "ownerId"> = req.body;

      const result = await this._updatePatient.execute({
        ownerId,
        addressLine,
        country,
        state,
        city,
        pincode,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Address"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
