import { z } from "zod";
import { departmentStatus, fullName } from "../base.schema.ts";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";

export const createDepartmentSchema = z.object({
  name: fullName,
  status: departmentStatus,
  mode: z.enum(SERVICE_MODE, {
    message: "Invalid department mode",
  }),
});

export const updateDepartmentSchema = z.object({
  status: departmentStatus,
});