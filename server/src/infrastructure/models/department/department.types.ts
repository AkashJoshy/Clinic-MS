import type { Document } from "mongoose";
import type { EntityStatus, ServiceMode } from "../../../domain/types/shared.types.ts";

export interface IDepartment extends Document {
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
  createdAt: Date | null;
  updatedAt: Date | null;
}