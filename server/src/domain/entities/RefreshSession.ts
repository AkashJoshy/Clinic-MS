import type { CreateRefreshSessionProps } from "../types/user.types.ts";

class RefreshSession {
  private constructor(
    public id: string | null,
    public userId: string,
    public tokenId: string,
    public expiresAt: Date,
    public revoked: boolean = false,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<CreateRefreshSessionProps>): RefreshSession {
    return new RefreshSession(
      data.id ?? null,
      data.userId!,
      data.tokenId!,
      data.expiresAt!,
      data.revoked ?? false,
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  revoke() {
    if (this.revoked) {
      throw new Error("Refresh session is already revoked");
    }

    this.revoked = true;
  }

  isExpired(): boolean {
    return this.expiresAt.getTime() <= Date.now();
  }

  isValid(): boolean {
    return !this.revoked && !this.isExpired();
  }
}

export default RefreshSession;