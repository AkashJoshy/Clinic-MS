import type {
  VerifyTopupDto,
  VerifyTopupResponseDto,
} from "../../../dto/wallet.dto.ts";

export interface IVerifyWalletTopupOrderUseCase {
  execute(data: VerifyTopupDto): Promise<VerifyTopupResponseDto>;
}
