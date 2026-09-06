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

  block() {
    if (this.status === "INACTIVE") {
      throw new Error("Department is alreday blocked")
    }

    this.status = "INACTIVE"
  }

  unblock() {
    if (this.status === "ACTIVE") {
      throw new Error("Department is alreday unblocked")
    }

    this.status = "ACTIVE"
  }

}