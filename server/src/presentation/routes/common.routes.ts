import { Router } from "express";
import { COMMON_ENDPOINTS } from "../endpoints/common.endpoints.ts";
import {
  departmentController,
  doctorWalletController,
  patientWalletController,
} from "../../container/modules/common.modules.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";

const router = Router();

router.get(COMMON_ENDPOINTS["DEPARTMENTS"]["FETCH_ALL"], async (req, res, next) => {
  await departmentController.getAll(req, res, next);
});

router.get(
  COMMON_ENDPOINTS["WALLET"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    try {
      const role = (req.user as { role?: string } | undefined)?.role;
      switch (role) {
        case "ADMIN":
          // await patientWalletController.getWallet(req, res, next);
          break;

        case "DOCTOR":
          await doctorWalletController.getWallet(req, res, next);
          break;

        case "PATIENT":
          await patientWalletController.getWallet(req, res, next);
          break;

        default:
          return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  COMMON_ENDPOINTS["WALLET"]["FETCH_ONE_BALANCE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    try {
      const role = (req.user as { role?: string } | undefined)?.role;
      switch (role) {
        case "ADMIN":
          // await patientWalletController.getWallet(req, res, next);
          break;

        case "DOCTOR":
          await doctorWalletController.getWalletBalance(req, res, next);
          break;

        case "PATIENT":
          await patientWalletController.getWalletBalance(req, res, next);
          break;

        default:
          return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  COMMON_ENDPOINTS["WALLET"]["TOP_UP"]["CREATE_ORDER"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    const role = (req.user as { role?: string } | undefined)?.role;
    switch (role) {
      case "ADMIN":
        // await patientWalletController.getWallet(req, res, next);
        break;

      case "DOCTOR":
        await doctorWalletController.createTopupOrder(req, res, next);
        break;

      case "PATIENT":
        await patientWalletController.createTopupOrder(req, res, next);
        break;

      default:
        return res.status(403).json({ message: "Forbidden" });
    }
  },
);

router.post(
  COMMON_ENDPOINTS["WALLET"]["TOP_UP"]["VERIFY_ORDER"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    const role = (req.user as { role?: string } | undefined)?.role;
    switch (role) {
      case "ADMIN":
        // await patientWalletController.getWallet(req, res, next);
        break;

      case "DOCTOR":
        await doctorWalletController.verifyTopupOrder(req, res, next);
        break;

      case "PATIENT":
        await patientWalletController.verifyTopupOrder(req, res, next);
        break;

      default:
        return res.status(403).json({ message: "Forbidden" });
    }
  },
);

export default router;
