import { Types } from "mongoose";
import { Department } from "../../domain/entities/Department.ts";
import type { IDepartmentRepository } from "../../domain/repositories/i-department.repository.ts";
import {
  DepartmentModel,
  type IDepartment,
} from "../models/department.model.ts";
import { BaseRepository } from "./base/base.repository.ts";

export class DepartmentRepository
  extends BaseRepository<Department, IDepartment>
  implements IDepartmentRepository
{
  constructor() {
    super(DepartmentModel);
  }

  async findByName(name: string): Promise<Department | null> {
    const dept = await DepartmentModel.findOne({ name });
    if (!dept) return null;
    return this.toDomain(dept);
  }

  protected toDomain(doc: IDepartment): Department {
    return Department.create({
      id: doc._id.toString(),
      name: doc.name,
      status: doc.status,
      mode: doc.mode,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
  protected toPersistence(entity: Department): Partial<IDepartment> {
    return {
      _id: new Types.ObjectId(entity.id!),
      name: entity.name,
      status: entity.status,
      mode: entity.mode,
      createdAt: entity.createdAt ?? null,
      updatedAt: entity.updatedAt ?? null,
    };
  }
}
