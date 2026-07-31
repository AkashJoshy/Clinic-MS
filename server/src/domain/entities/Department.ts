import type { registerDepartment } from "../types/admin.types.ts";
import type { EntityStatus, ServiceMode } from "../types/shared.types.ts";

export class Department {
  constructor(
    public readonly id: string | null,
    public name: string,
    public status: EntityStatus = "ACTIVE",
    public mode: ServiceMode,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<registerDepartment>): Department {
    return new Department(
      data.id ?? null,
      data.name?.trim() ?? "",
      data.status,
      data.mode ?? "BOTH",
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }
}