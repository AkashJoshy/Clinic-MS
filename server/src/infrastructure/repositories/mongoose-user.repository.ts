import User from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { Role } from "../../domain/types/user.types.js";
import UserModel, { type UserDocument } from "../models/user.model.js";
import { MongooseBaseRepository } from "./base/mongoose-base.repository.js";

export class MongooseUserRepository
  extends MongooseBaseRepository<User, UserDocument>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).select("+password")
    if (!userDoc) return null;
    return this.toDomain(userDoc);
  }

  protected toDomain(doc: UserDocument): User {
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

  protected toPersistence(user: User): Partial<UserDocument> {
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
      updatedAt: user.updatedAt
    };
  }
}
