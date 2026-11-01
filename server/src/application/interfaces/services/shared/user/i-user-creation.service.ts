import type {
  CreateUserServiceDto,
  UserResponseDto,
} from "../../../../dto/auth.dto.ts";

export interface IUserCreationService {
  execute(data: CreateUserServiceDto): Promise<UserResponseDto>;
}
