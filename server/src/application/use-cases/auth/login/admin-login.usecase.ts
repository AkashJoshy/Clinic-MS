import type { LoginResponseDTO, LoginDTO } from "../../../dto/auth.dto.ts"
import type { ILoginUseCase } from "../../../repositories/auth/ILoginUseCase.ts";
import type { IUserExistenceService } from "../../../IService/IUserExistenceService.ts";
import type { ITokenGenerationService } from "../../../IService/ITokenGenerationService.ts";

export class AdminLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _tokenGenerationService: ITokenGenerationService,
  ) { }

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._userExistenceService.execute(data)
    const accessToken = await this._tokenGenerationService.generate(user);
    let role = user.role.toLowerCase()
    return {
      user,
      accessToken,
      role
    }
  }
}