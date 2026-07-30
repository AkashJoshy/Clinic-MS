import type { EntityStatus, ServiceMode } from "./shared.types.ts";

export interface registerDepartment {
  id: string | null;
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
  createdAt: Date | null;
  updatedAt: Date | null;
}
