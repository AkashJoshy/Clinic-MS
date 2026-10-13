import User from "../../domain/entities/user.entity.ts";
import type { IUserRepository } from "../../domain/repositories/i-user.repository.ts";
import type { Role } from "../../domain/types/user.types.ts";
import UserModel from "../models/user/user.model.ts";
import type { IUserDocument } from "../models/user/user.types.ts";
import { BaseRepository } from "./base/base.repository.ts";

export class UserRepository
  extends BaseRepository<User, IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).select("+password");
    if (!userDoc) return null;
    return this.toDomain(userDoc);
  }

  protected toDomain(doc: IUserDocument): User {
    return User.create({
      id: doc._id.toString(),
      fullName: doc.fullName,
      phone: doc.phone,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      provider: doc.provider,
      isEmailVerified: doc.isEmailVerified,
      isBlocked: doc.isBlocked,
      isActive: doc.isActive,
      isTwoFactorenabled: doc.isTwoFactorenabled,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(user: User): Partial<IUserDocument> {
    return {
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role as Role,
      provider: user.provider,
      isEmailVerified: user.isEmailVerified,
      isBlocked: user.isBlocked,
      isActive: user.isActive,
      isTwoFactorenabled: user.isTwoFactorenabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
