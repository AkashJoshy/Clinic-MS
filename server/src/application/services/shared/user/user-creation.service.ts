import User from "../../../../domain/entities/user.entity.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IHashService } from "../../../../domain/services/i-hash.service.ts";
import type {
  CreateUserServiceDto,
  UserResponseDto,
} from "../../../dto/auth.dto.ts";
import type { IUserCreationService } from "../../../interfaces/services/shared/user/i-user-creation.service.ts";
import type { IWalletCreationService } from "../../../interfaces/services/wallet/i-wallet-creation.service.ts";

export class UserCreationService implements IUserCreationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _hashService: IHashService,
    private readonly _walletCreationService: IWalletCreationService,
  ) {}

  async execute(data: CreateUserServiceDto): Promise<UserResponseDto> {
    const { user: userDto, message } = data;
    const exists = await this._userRepository.findByEmail(userDto.email);
    if (exists) throw new AlreadyExistsError(message);

    const hashed = await this._hashService.hash(userDto.password, "Password");
    if (!hashed) {
      throw new InternalServerError();
    }

    const user = await this._userRepository.save(
      User.create({
        ...userDto,
        password: hashed,
        isEmailVerified: false,
        isBlocked: false,
        isActive: false,
        isTwoFactorenabled: false,
        provider: "LOCAL",
      }),
    );

    if (!user || !user.id) {
      throw new NotFoundError("User");
    }

    await this._walletCreationService.execute({
      ownerId: user.id,
      ownerType: user.role,
    });

    return user;
  }
}
