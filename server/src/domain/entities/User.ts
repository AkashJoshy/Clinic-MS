import type {
  AuthProvider,
  CreateUserProps,
  Role,
} from "../types/user.types.ts";
import { Email } from "../value-objects/Email.ts";

class User {
  private constructor(
    public id: string | null,
    public fullName: string,
    public phone: string,
    public email: string,
    public password: string,
    public role: Role,
    public provider: AuthProvider,
    public isEmailVerified: boolean = false,
    public isBlocked: boolean = false,
    public isActive: boolean = true,
    public isTwoFactorenabled: boolean = false,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<CreateUserProps>): User {
    return new User(
      data.id ?? null,
      data.fullName ?? "",
      data.phone ?? "",
      Email.create(data.email!).getValue(),
      data.password ?? "",
      data.role!,
      data.provider ?? "LOCAL",
      data.isEmailVerified ?? false,
      data.isBlocked ?? false,
      data.isActive ?? true,
      data.isTwoFactorenabled ?? false,
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  block() {
    if (this.isBlocked) {
      throw new Error("User is alreday blocked");
    }

    this.isBlocked = true;
    this.isActive = false;
  }

  unblock() {
    if (!this.isBlocked) {
      throw new Error("User is alreday unblocked");
    }

    this.isBlocked = false;
    this.isActive = true;
  }
}

export default User;
