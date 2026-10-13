import { Schema } from "mongoose";
import type { IDepartment } from "./department.types.ts";
import { ENTITY_STATUS } from "../../../domain/constants/status.constants.ts";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";

export const DepartmentSchema: Schema<IDepartment> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ENTITY_STATUS,
      default: "ACTIVE",
    },
    mode: {
      type: String,
      enum: SERVICE_MODE,
    },
  },
  {
    timestamps: true,
  },
);