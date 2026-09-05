import { Router } from "express";
import { COMMON_ENDPOINTS } from "../endpoints/common.endpoints.ts";
import { getAllDepartmentsController } from "../../container/modules/common.modules.ts";

const router = Router();

router.get(COMMON_ENDPOINTS["FETCH_DEPARTMENTS"], async (req, res, next) => {
  await getAllDepartmentsController.handle(req, res, next);
});

export default router;
