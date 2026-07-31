import { Schema, Document, model } from "mongoose";
import type { EntityStatus, ServiceMode } from "../../domain/types/shared.types.ts";
import { ENTITY_STATUS } from "../../domain/constants/status.constants.ts";
import { SERVICE_MODE } from "../../domain/constants/shared.constants.ts";

export interface IDepartment extends Document {
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
  createdAt: Date | null;
  updatedAt: Date | null;
}


const DepartmentSchema: Schema<IDepartment> = new Schema(
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
      enum: SERVICE_MODE
    }
  },
  {
    timestamps: true,
  }
);


export const DepartmentModel =
  model<IDepartment>("Department", DepartmentSchema);