import type User from "../../domain/entities/User.ts";
import type { AuthProvider, Role } from "../../domain/types/user.types.ts";

export interface CacheDTO {
  email: string;
  otp: string;
}

export interface RegisterUserDTO {
  id: string | null;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
}

export interface GoogleLoginDTO {
  name: string;
  email: string;
  isVerified: boolean;
  imageUrl: string;
  provider: AuthProvider;
}

export type SafeUser = Omit<User, "password" | "block" | "unblock">;

export type UserDto = User;

export type AccessPayloadDto = Pick<User, "id" | "role">;
export type RefreshPayloadDto = Pick<User, "id"> & { tokenId: string };

export type BaseUserDto = Pick<User, "id" | "role" | "isBlocked" | "isActive">;

export interface TokenPair {
  access: string,
  refresh: string
}

export interface LoginResponseDTO {
  user: SafeUser | null;
  tokenPair: TokenPair;
  role: string;
  message?: string;
}

export interface RefreshTokenResponseDto {
  user: BaseUserDto | null;
  accessToken: string,
  message?: string
}

export interface LogoutResponseDto {
  user: BaseUserDto | null;
}

type TokenPayload = {
  userId: string;
  tokenType: "access" | "refresh";
};

export type AccessTokenPayloadDto = {
  role: Role;
} & TokenPayload;

export type RefreshTokenPayloadDto = {
  tokenId: string;
} & TokenPayload;

export type LoginDTO = Omit<RegisterUserDTO, "id" | "fullName" | "phone">;

export type UpdateDto = Pick<SafeUser, "fullName" | "email" | "phone">;

export interface VerificationTokenDto {
  token: string;
}

export interface ResetPasswordDto extends VerificationTokenDto {
  password: string;
  role: Role;
}

export interface VerifyOtpDTO extends VerificationTokenDto {
  otp: string;
}

export interface ForgotRolePasswordDto {
  email: string;
  role: Role;
}
